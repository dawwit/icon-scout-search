import { z } from 'zod'

// Request body validation schema
const downloadRequestSchema = z.object({
  format: z.string().min(1, 'Format is required')
})

// IconScout API response type
interface IconScoutDownloadResponse {
  download_url: string
  expires_at: string
}

export default defineEventHandler(async (event) => {
  try {
    // Get asset UUID from route params
    const uuid = getRouterParam(event, 'uuid')
    if (!uuid) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Asset UUID is required'
      })
    }

    // Validate request body
    const body = await readBody(event)
    const validationResult = downloadRequestSchema.safeParse(body)
    
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request body',
        data: validationResult.error.errors
      })
    }

    const { format } = validationResult.data

    // Get runtime config
    const config = useRuntimeConfig()
    
    if (!config.iconscoutClientSecret || !config.public.iconscoutClientId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'API credentials not configured. Please set ICONSCOUT_CLIENT_ID and ICONSCOUT_CLIENT_SECRET environment variables.'
      })
    }

    // Prepare API request
    const apiUrl = `https://api.iconscout.com/v3/items/${uuid}/api-download`
    const headers = {
      'Client-ID': config.public.iconscoutClientId,
      'Client-Secret': config.iconscoutClientSecret,
      'Content-Type': 'application/json'
    }

    // Make request to IconScout API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ format })
    })

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid API credentials'
        })
      } else if (response.status === 404) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Asset not found'
        })
      } else if (response.status === 429) {
        throw createError({
          statusCode: 429,
          statusMessage: 'Rate limit exceeded. Please try again later.'
        })
      } else {
        throw createError({
          statusCode: response.status,
          statusMessage: `Download failed: ${response.statusText}`
        })
      }
    }

    const downloadData: IconScoutDownloadResponse = await response.json()

    // Return download information
    return {
      success: true,
      download_url: downloadData.download_url,
      expires_at: downloadData.expires_at,
      asset_uuid: uuid,
      format
    }

  } catch (error) {
    // If it's already a createError, just throw it
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    
    // Handle other errors
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Internal server error'
    })
  }
}) 