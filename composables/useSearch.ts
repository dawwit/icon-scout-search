import type { Asset, SearchFilters, SearchResults, Filter } from '~/types/search'
import { FilterType } from '~/types/search'

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

// Transform API response to internal format
const transformAsset = (apiAsset: IconScoutAsset): Asset | null => {
  // Check if apiAsset has required properties
  if (!apiAsset || !apiAsset.id || !apiAsset.name || !apiAsset.urls) {
    console.warn('Invalid asset data:', apiAsset)
    return null
  }

  // Choose the best available image URL (prefer larger sizes)
  const imageUrl = apiAsset.urls.png_256 || 
                   apiAsset.urls.png_128 || 
                   apiAsset.urls.png_64 || 
                   apiAsset.urls.svg || 
                   ''

  return {
    id: apiAsset.id.toString(),
    title: apiAsset.name,
    description: '', // Not provided in this API response
    imageUrl,
    isPremium: apiAsset.price > 0,
    tags: [], // Not provided in this API response
    category: {
      id: apiAsset.category?.id || apiAsset.asset,
      name: apiAsset.category?.name || apiAsset.asset.charAt(0).toUpperCase() + apiAsset.asset.slice(1),
      slug: apiAsset.category?.slug || apiAsset.asset
    },
    type: {
      id: apiAsset.asset,
      name: apiAsset.asset.charAt(0).toUpperCase() + apiAsset.asset.slice(1),
      slug: apiAsset.asset
    },
    createdAt: apiAsset.created_at ? new Date(apiAsset.created_at) : new Date(),
    author: apiAsset.author?.name || 'Unknown',
    downloadCount: apiAsset.download_count || 0
  }
}

export const useSearch = () => {
  const config = useRuntimeConfig()
  
  // API Client Functions
  const createApiHeaders = (includeSecret = false) => {
    const headers: Record<string, string> = {
      'Client-ID': config.public.iconscoutClientId || '',
      'Content-Type': 'application/json'
    }
    
    if (includeSecret) {
      headers['Client-Secret'] = config.iconscoutClientSecret || ''
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
    
    console.log('Making API request to:', url)
    console.log('Headers:', createApiHeaders())
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: createApiHeaders()
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const data = await response.json()
      console.log('Raw API response:', data)
      return data
    } catch (error) {
      console.error('Search API error:', error)
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

  const downloadAsset = async (itemUuid: string, format: string): Promise<{ download_url: string; expires_at: string }> => {
    const url = `${API_BASE_URL}/items/${itemUuid}/api-download`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: createApiHeaders(true),
      body: JSON.stringify({ format })
    })

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  const searchQuery = ref('')
  const selectedFilters = ref<Filter[]>([])
  const currentCategory = ref('3D Illustrations')
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchResults = ref<SearchResults>({
    assets: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
    hasMore: false
  })

  const filters = ref<SearchFilters>({
    assets: {
      id: 'assets',
      name: 'Asset',
      type: FilterType.ASSET,
      expanded: true,
      filters: [
        { id: 'all-assets', name: 'All asset', value: 'all', type: FilterType.ASSET, selected: false },
        { id: '3d-illustrations', name: '3D Illustrations', value: '3d', type: FilterType.ASSET, selected: true },
        { id: 'lottie-animations', name: 'Lottie Animations', value: 'lottie', type: FilterType.ASSET, selected: false },
        { id: 'illustrations', name: 'Illustrations', value: 'illustration', type: FilterType.ASSET, selected: false },
        { id: 'icons', name: 'Icons', value: 'icon', type: FilterType.ASSET, selected: false }
      ]
    },
    price: {
      id: 'price',
      name: 'Price',
      type: FilterType.PRICE,
      expanded: true,
      filters: [
        { id: 'free', name: 'Free', value: 'free', type: FilterType.PRICE, selected: false },
        { id: 'premium', name: 'Premium', value: 'premium', type: FilterType.PRICE, selected: false },
        { id: 'all-price', name: 'All', value: 'all', type: FilterType.PRICE, selected: true }
      ]
    },
    view: {
      id: 'view',
      name: 'View',
      type: FilterType.VIEW,
      expanded: true,
      filters: [
        { id: 'pack', name: 'Pack', value: 'pack', type: FilterType.VIEW, selected: false },
        { id: 'individual', name: 'Individual', value: 'individual', type: FilterType.VIEW, selected: true }
      ]
    },
    sortBy: {
      id: 'sort-by',
      name: 'Sort by',
      type: FilterType.SORT,
      expanded: true,
      filters: [
        { id: 'popular', name: 'Popular', value: 'popular', type: FilterType.SORT, selected: true },
        { id: 'latest', name: 'Latest', value: 'latest', type: FilterType.SORT, selected: false },
        { id: 'featured', name: 'Featured', value: 'featured', type: FilterType.SORT, selected: false },
        { id: 'relevant', name: 'Relevant', value: 'relevant', type: FilterType.SORT, selected: false }
      ]
    },
    categories: {
      id: 'categories',
      name: 'Categories',
      type: FilterType.CATEGORY,
      expanded: false,
      filters: []
    }
  })

  const toggleFilter = (filterId: string, filterType: FilterType) => {
    const filterGroup = filters.value[filterType as keyof SearchFilters]
    if (filterGroup) {
      // For radio-type filters (only one can be selected)
      filterGroup.filters.forEach(filter => {
        filter.selected = filter.id === filterId
      })
      
      // Update selected filters
      selectedFilters.value = selectedFilters.value.filter(f => f.type !== filterType)
      const selectedFilter = filterGroup.filters.find(f => f.id === filterId)
      if (selectedFilter?.selected) {
        selectedFilters.value.push(selectedFilter)
      }

      // Trigger search when filters change
      performSearch()
    }
  }

  const toggleFilterGroup = (groupId: string) => {
    const group = Object.values(filters.value).find(g => g.id === groupId)
    if (group) {
      group.expanded = !group.expanded
    }
  }

  const getSelectedFilterValue = (filterType: FilterType): string | undefined => {
    return selectedFilters.value.find(f => f.type === filterType)?.value
  }

  const performSearch = async (page = 1) => {
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
      // Build search parameters
      const assetType = getSelectedFilterValue(FilterType.ASSET)
      const priceFilter = getSelectedFilterValue(FilterType.PRICE)
      const sortFilter = getSelectedFilterValue(FilterType.SORT)

      const searchParams = {
        query: searchQuery.value.trim() || undefined,
        asset: assetType === 'all' ? undefined : assetType,
        price: priceFilter === 'all' ? undefined : priceFilter,
        sort: sortFilter || 'popular',
        page,
        per_page: 20
      }

      const response = await searchAssets(searchParams)
      
      // Debug log to see the actual response structure
      console.log('API Response:', response)
      
      // Check if response has the expected structure
      if (!response || !response.response || !response.response.items || !response.response.items.data) {
        console.error('Unexpected API response structure:', response)
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
      console.error('Search error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const handleSearch = (query: string) => {
    searchQuery.value = query
    performSearch()
  }

  const setCategory = (category: string) => {
    currentCategory.value = category
    
    // Map category to asset type filter
    const categoryMapping: Record<string, string> = {
      'All Assets': 'all',
      '3D Illustrations': '3d',
      'Lottie Animations': 'lottie',
      'Illustrations': 'illustration',
      'Icons': 'icon'
    }
    
    const assetType = categoryMapping[category] || 'all'
    toggleFilter(Object.keys(categoryMapping).find(key => categoryMapping[key] === assetType) ? 
      `${assetType}-${assetType === 'all' ? 'assets' : assetType === '3d' ? 'illustrations' : assetType}` : 
      'all-assets', FilterType.ASSET)
  }

  const loadMore = () => {
    if (searchResults.value.hasMore && !isLoading.value) {
      performSearch(searchResults.value.currentPage + 1)
    }
  }

  const handleDownload = async (asset: Asset, format: string) => {
    try {
      if (!config.iconscoutClientSecret) {
        throw new Error('API secret not configured for downloads')
      }
      
      const downloadResponse = await downloadAsset(asset.id, format)
      
      // Open download URL in new tab
      window.open(downloadResponse.download_url, '_blank')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Download failed'
      console.error('Download error:', err)
    }
  }

  // Initialize with default search
  onMounted(() => {
    performSearch()
  })

  return {
    searchQuery: readonly(searchQuery),
    selectedFilters: readonly(selectedFilters),
    currentCategory: readonly(currentCategory),
    isLoading: readonly(isLoading),
    error: readonly(error),
    searchResults,
    filters,
    toggleFilter,
    toggleFilterGroup,
    handleSearch,
    setCategory,
    loadMore,
    handleDownload,
    performSearch
  }
} 