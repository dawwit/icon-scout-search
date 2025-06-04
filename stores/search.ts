import { defineStore } from 'pinia'
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
}

interface IconScoutSearchResponse {
  response: { 
    items: {
      current_page: number
      data: IconScoutAsset[]
      total: number
      per_page: number
    }
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
  if (!apiAsset?.id || !apiAsset?.name) {
    return null
  }

  // Get best available image URL
  const imageUrl = apiAsset.urls?.png_256 || 
                   apiAsset.urls?.png_128 || 
                   apiAsset.urls?.png_64 || 
                   apiAsset.urls?.svg || 
                   apiAsset.urls?.thumb ||
                   'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjBGMEYwIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'

  const format = imageUrl.includes('.mp4') ? 'video' : 'image'

  return {
    id: apiAsset.id.toString(),
    uuid: apiAsset.uuid,
    title: apiAsset.name,
    imageUrl,
    isPremium: apiAsset.price > 0,
    format
  }
}

export const useSearchStore = defineStore('search', () => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const router = useRouter()
  
  // State
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

  const selectedFilters = ref<SelectedFilters>({
    [FilterType.ASSET]: 'all',
    [FilterType.PRICE]: 'all',
    [FilterType.SORT]: 'popular'
  })

  // API function
  const searchAssets = async (params: {
    query?: string
    asset?: string
    price?: string
    sort?: string
    page?: number
    per_page?: number
  }): Promise<IconScoutSearchResponse> => {
    const searchParams = new URLSearchParams()
    
    if (params.query) searchParams.append('query', params.query)
    if (params.asset) searchParams.append('asset', params.asset)
    if (params.price && params.price !== 'all') searchParams.append('price', params.price)
    if (params.sort) searchParams.append('sort', params.sort)
    if (params.page) searchParams.append('page', params.page.toString())
    if (params.per_page) searchParams.append('per_page', params.per_page.toString())

    const url = `${API_BASE_URL}/search?${searchParams.toString()}`
    
    const headers = {
      'Client-ID': config.public.iconscoutClientId || '',
      'Content-Type': 'application/json'
    }

    try {
      const response = await fetch(url, { headers })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      return await response.json()
    } catch {
      // Return empty results on error
      return {
        response: {
          items: {
            current_page: 1,
            data: [],
            total: 0,
            per_page: 20
          }
        }
      }
    }
  }

  // Core search function
  const performSearch = async (page = 1) => {
    if (isLoading.value) return

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
      
      if (!response?.response?.items?.data) {
        searchResults.value = {
          assets: [],
          total: 0,
          currentPage: 1,
          totalPages: 0,
          hasMore: false
        }
        return
      }
      
      const transformedAssets = response.response.items.data
        .map(transformAsset)
        .filter((asset): asset is Asset => asset !== null)
      
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

  // Update URL when search query changes
  const updateUrl = (query: string) => {
    const newQuery = { ...route.query }
    
    if (query.trim()) {
      newQuery.q = query.trim()
    } else {
      delete newQuery.q
    }
    
    if (newQuery.q !== route.query.q) {
      router.push({ query: newQuery })
    }
  }

  // Actions
  const handleSearch = (query: string) => {
    searchQuery.value = query
    updateUrl(query)
    nextTick(() => performSearch(1))
  }

  const updateFilter = (filterType: FilterType, value: string) => {
    selectedFilters.value[filterType] = value
    nextTick(() => performSearch(1))
  }

  const loadMore = () => {
    if (searchResults.value.hasMore && !isLoading.value) {
      performSearch(searchResults.value.currentPage + 1)
    }
  }

  const handleDownload = async (asset: Asset) => {
    try {
      const extension = asset.imageUrl.split('.').pop()
      if (!extension) {
        throw new Error('Unable to determine asset format')
      }

      const response = await $fetch<DownloadResponse>(`/api/download/${asset.uuid}`, {
        method: 'POST',
        body: { format: extension }
      })

      if (!response.success) {
        throw new Error('Download request failed')
      }
      
      window.open(response.download_url, '_blank')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Download failed'
    }
  }

  // Watch for route query changes
  watch(() => route.query.q, (newQuery) => {
    const queryString = (newQuery as string) || ''
    if (queryString !== searchQuery.value) {
      searchQuery.value = queryString
      nextTick(() => performSearch(1))
    }
  })

  // Initialize search on mount
  onMounted(() => {
    nextTick(() => performSearch(1))
  })

  return {
    // State
    searchQuery: readonly(searchQuery),
    isLoading: readonly(isLoading),
    error: readonly(error),
    searchResults,
    selectedFilters,
    
    // Actions
    updateFilter,
    handleSearch,
    loadMore,
    handleDownload,
    performSearch
  }
}) 