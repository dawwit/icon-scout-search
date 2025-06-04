import type { Asset, SearchResults } from '~/types/search'
import { FilterType } from '~/types/search'
import type { SelectedFilters } from '~/constants/filterOptions'

// API Configuration
const API_BASE_URL = 'https://api.iconscout.com/v3'

// API Response Types
interface IconScoutAsset {
  id: number
  uuid: string
  name: string
  slug: string
  asset: string
  price: number
  urls: {
    png_64?: string
    png_128?: string
    png_256?: string
    png_512?: string
    svg?: string
    thumb?: string
  }
  color_codes?: Array<{
    color_id: number
    decimal_color: number
  }>
  category?: {
    id: string
    name: string
    slug: string
  }
  author?: {
    name: string
    url: string
  }
  created_at?: string
  download_count?: number
}

interface IconScoutSearchResponse {
  response: { 
    items: {
      current_page: number
      data: IconScoutAsset[]
      total: number
      per_page: number
      from: number
      to: number
    }
  }
  meta: {
    total_time: number
  }
}

// Server download response type
interface DownloadResponse {
  success: boolean
  download_url: string
  expires_at: string
  asset_uuid: string
  format: string
}

// Transform API response to internal format
const transformAsset = (apiAsset: IconScoutAsset): Asset | null => {
  // Check if apiAsset has required properties
  if (!apiAsset || !apiAsset.id || !apiAsset.name) {
    return null
  }

  // Ensure we have a valid image URL or provide a default
  let imageUrl = ''
  if (apiAsset.urls) {
    imageUrl = apiAsset.urls.png_256 || 
               apiAsset.urls.png_128 || 
               apiAsset.urls.png_64 || 
               apiAsset.urls.svg || 
               apiAsset.urls.thumb ||
               ''
  }
  
  const format = imageUrl.includes('.mp4') ? 'video' : 'image'

  // If no image URL, provide a data URI fallback to prevent external requests
  if (!imageUrl) {
    imageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjBGMEYwIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'
  }

  try {
    return {
      id: apiAsset.id.toString(),
      uuid: apiAsset.uuid,
      title: apiAsset.name || 'Untitled',
      description: '', // Not provided in this API response
      imageUrl,
      isPremium: apiAsset.price > 0,
      tags: [], // Not provided in this API response
      category: {
        id: apiAsset.category?.id || apiAsset.asset || 'unknown',
        name: apiAsset.category?.name || (apiAsset.asset ? apiAsset.asset.charAt(0).toUpperCase() + apiAsset.asset.slice(1) : 'Unknown'),
        slug: apiAsset.category?.slug || apiAsset.asset || 'unknown'
      },
      type: {
        id: apiAsset.asset || 'unknown',
        name: apiAsset.asset ? apiAsset.asset.charAt(0).toUpperCase() + apiAsset.asset.slice(1) : 'Unknown',
        slug: apiAsset.asset || 'unknown'
      },
      createdAt: apiAsset.created_at ? new Date(apiAsset.created_at) : new Date(),
      author: apiAsset.author?.name || 'Unknown',
      downloadCount: apiAsset.download_count || 0,
      format
    }
  } catch {
    return null
  }
}

export const useSearch = () => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const router = useRouter()
  
  // API Client Functions
  const createApiHeaders = () => {
    const headers: Record<string, string> = {
      'Client-ID': config.public.iconscoutClientId || '',
      'Content-Type': 'application/json'
    }
    
    return headers
  }

  const searchAssets = async (params: {
    query?: string
    asset?: string
    category?: string
    style?: string
    price?: string
    page?: number
    per_page?: number
    sort?: string
  }): Promise<IconScoutSearchResponse> => {
    const searchParams = new URLSearchParams()
    
    // Add parameters to search
    if (params.query) searchParams.append('query', params.query)
    if (params.asset) searchParams.append('asset', params.asset)
    if (params.category) searchParams.append('category', params.category)
    if (params.style) searchParams.append('style', params.style)
    if (params.price && params.price !== 'all') searchParams.append('price', params.price)
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.per_page) searchParams.append('per_page', params.per_page.toString())
    if (params.sort) searchParams.append('sort', params.sort)

    const url = `${API_BASE_URL}/search?${searchParams.toString()}`
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: createApiHeaders()
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch {
      // Return empty results on error
      return {
        response: {
          items: {
            current_page: 1,
            data: [],
            total: 0,
            per_page: 20,
            from: 0,
            to: 0
          }
        },
        meta: {
          total_time: 0
        }
      }
    }
  }

  // Initialize search query from URL or default
  const searchQuery = ref((route.query.q as string) || '')
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchResults = ref<SearchResults>({
    assets: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
    hasMore: false
  })

  // Update URL when search query changes
  const updateUrl = (query: string) => {
    const newQuery = { ...route.query }
    
    if (query.trim()) {
      newQuery.q = query.trim()
    } else {
      delete newQuery.q
    }
    
    // Only update if the query actually changed
    if (newQuery.q !== route.query.q) {
      router.push({ query: newQuery })
    }
  }

  // Watch for route query changes and sync search query
  watch(() => route.query.q, (newQuery) => {
    const queryString = (newQuery as string) || ''
    if (queryString !== searchQuery.value && !isUpdatingFilters.value) {
      searchQuery.value = queryString
      nextTick(() => performSearch(1))
    }
  })

  // Simplified selected filters - just values
  const selectedFilters = ref<SelectedFilters>({
    [FilterType.ASSET]: 'all',
    [FilterType.PRICE]: 'all',
    [FilterType.VIEW]: 'individual',
    [FilterType.SORT]: 'popular'
  })

  // Add a flag to prevent loops during filter updates
  const isUpdatingFilters = ref(false)

  const updateFilter = (filterType: FilterType, value: string) => {
    if (isUpdatingFilters.value) return
    
    isUpdatingFilters.value = true
    selectedFilters.value[filterType] = value
    
    // Reset the page to 1 when filters change
    nextTick(() => {
      performSearch(1)
      isUpdatingFilters.value = false
    })
  }

  const toggleFilterGroup = (_groupId: string) => {
    // This is now just for UI state, can be handled in the component
  }

  const performSearch = async (page = 1) => {
    // Prevent multiple simultaneous searches
    if (isLoading.value) {
      return
    }
    
    if (!config.public.iconscoutClientId) {
      error.value = 'API credentials not configured. Please set ICONSCOUT_CLIENT_ID environment variable. See README.md for setup instructions.'
      searchResults.value = {
        assets: [],
        total: 0,
        currentPage: 1,
        totalPages: 0,
        hasMore: false
      }
      return
    }

    isLoading.value = true
    error.value = null
    
    try {
      // Build search parameters using selected filters
      const assetType = selectedFilters.value[FilterType.ASSET]
      const priceFilter = selectedFilters.value[FilterType.PRICE]
      const sortFilter = selectedFilters.value[FilterType.SORT]

      const searchParams = {
        query: searchQuery.value.trim() || undefined,
        asset: assetType === 'all' ? undefined : assetType,
        price: priceFilter === 'all' ? undefined : priceFilter,
        sort: sortFilter || 'popular',
        page,
        per_page: 20
      }

      const response = await searchAssets(searchParams)
      
      // Check if response has the expected structure
      if (!response || !response.response || !response.response.items || !response.response.items.data) {
        searchResults.value = {
          assets: [],
          total: 0,
          currentPage: 1,
          totalPages: 0,
          hasMore: false
        }
        return
      }
      
      // Transform API response to internal format
      const transformedAssets = response.response.items.data
        .map(transformAsset)
        .filter((asset): asset is Asset => asset !== null)
      
      // Calculate total pages and hasMore from the new response structure
      const totalPages = Math.ceil(response.response.items.total / response.response.items.per_page)
      const hasMore = response.response.items.current_page < totalPages
      
      searchResults.value = {
        assets: transformedAssets,
        total: response.response.items.total,
        currentPage: response.response.items.current_page,
        totalPages,
        hasMore
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred while searching'
    } finally {
      isLoading.value = false
    }
  }

  const handleSearch = (query: string) => {
    if (isUpdatingFilters.value || isLoading.value) return
    
    searchQuery.value = query
    updateUrl(query)
    nextTick(() => performSearch(1))
  }

  const loadMore = () => {
    if (searchResults.value.hasMore && !isLoading.value && !isUpdatingFilters.value) {
      performSearch(searchResults.value.currentPage + 1)
    }
  }

  const handleDownload = async (asset: Asset) => {
    try {
      // Determine the format from the asset's image URL
      const extension = asset.imageUrl.split('.').pop()
      if (!extension) {
        throw new Error('Unable to determine asset format')
      }

      // Call our server route instead of making direct API calls
      const response = await $fetch<DownloadResponse>(`/api/download/${asset.uuid}`, {
        method: 'POST',
        body: {
          format: extension
        }
      })

      if (!response.success) {
        throw new Error('Download request failed')
      }
      
      // Open download URL in new tab
      window.open(response.download_url, '_blank')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Download failed'
    }
  }

  // Initialize with default search
  let hasInitialized = false
  onMounted(() => {
    if (!hasInitialized) {
      hasInitialized = true
      nextTick(() => performSearch(1))
    }
  })

  return {
    searchQuery: readonly(searchQuery),
    isLoading: readonly(isLoading),
    error: readonly(error),
    searchResults,
    selectedFilters: readonly(selectedFilters),
    updateFilter,
    toggleFilterGroup,
    handleSearch,
    loadMore,
    handleDownload,
    performSearch
  }
} 