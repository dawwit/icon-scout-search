import type { Asset, SearchFilters, SearchResults, Filter } from '~/types/search'
import { FilterType } from '~/types/search'

// Mock data for development
const mockAssets: Asset[] = [
  {
    id: '1',
    title: 'Bitcoin Mining 3D',
    description: 'Bitcoin token this year illustration',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=280&h=280&fit=crop&crop=center',
    isPremium: false,
    tags: ['bitcoin', 'crypto', 'mining', '3d'],
    category: { id: '1', name: '3D Illustrations', slug: '3d-illustrations' },
    type: { id: '1', name: 'Illustration', slug: 'illustration' },
    createdAt: new Date('2024-01-15'),
    author: 'Designer Name',
    downloadCount: 1234
  },
  {
    id: '2',
    title: 'Cryptocurrency Wallet',
    description: 'Digital wallet for crypto assets',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=280&h=280&fit=crop&crop=center',
    isPremium: true,
    tags: ['wallet', 'crypto', 'digital', 'finance'],
    category: { id: '1', name: '3D Illustrations', slug: '3d-illustrations' },
    type: { id: '1', name: 'Illustration', slug: 'illustration' },
    createdAt: new Date('2024-01-14'),
    author: 'Designer Name',
    downloadCount: 856
  },
  {
    id: '3',
    title: 'Ethereum Heart Symbol',
    description: 'Ethereum cryptocurrency symbol',
    imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=280&h=280&fit=crop&crop=center',
    isPremium: true,
    tags: ['ethereum', 'crypto', 'heart', 'symbol'],
    category: { id: '1', name: '3D Illustrations', slug: '3d-illustrations' },
    type: { id: '1', name: 'Illustration', slug: 'illustration' },
    createdAt: new Date('2024-01-13'),
    author: 'Designer Name',
    downloadCount: 642
  },
  {
    id: '4',
    title: 'Person with Chart',
    description: 'Business person analyzing charts',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=280&h=280&fit=crop&crop=center',
    isPremium: false,
    tags: ['business', 'chart', 'person', 'analytics'],
    category: { id: '1', name: '3D Illustrations', slug: '3d-illustrations' },
    type: { id: '1', name: 'Illustration', slug: 'illustration' },
    createdAt: new Date('2024-01-12'),
    author: 'Designer Name',
    downloadCount: 923
  },
  {
    id: '5',
    title: 'Computer Setup',
    description: 'Modern computer workspace setup',
    imageUrl: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=280&h=280&fit=crop&crop=center',
    isPremium: false,
    tags: ['computer', 'workspace', 'office', 'modern'],
    category: { id: '1', name: '3D Illustrations', slug: '3d-illustrations' },
    type: { id: '1', name: 'Illustration', slug: 'illustration' },
    createdAt: new Date('2024-01-11'),
    author: 'Designer Name',
    downloadCount: 1567
  },
  {
    id: '6',
    title: 'Digital Payment Card',
    description: '3D credit card with secure payment',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=280&h=280&fit=crop&crop=center',
    isPremium: true,
    tags: ['payment', 'card', 'digital', 'security'],
    category: { id: '1', name: '3D Illustrations', slug: '3d-illustrations' },
    type: { id: '1', name: 'Illustration', slug: 'illustration' },
    createdAt: new Date('2024-01-10'),
    author: 'Designer Name',
    downloadCount: 2341
  },
  {
    id: '7',
    title: 'Abstract Geometric Forms',
    description: 'Modern 3D geometric shapes and forms',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=280&h=280&fit=crop&crop=center',
    isPremium: false,
    tags: ['abstract', 'geometric', 'modern', '3d'],
    category: { id: '1', name: '3D Illustrations', slug: '3d-illustrations' },
    type: { id: '1', name: 'Illustration', slug: 'illustration' },
    createdAt: new Date('2024-01-09'),
    author: 'Designer Name',
    downloadCount: 1876
  },
  {
    id: '8',
    title: 'Digital Cloud Storage',
    description: 'Cloud computing and data storage concept',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=280&h=280&fit=crop&crop=center',
    isPremium: true,
    tags: ['cloud', 'storage', 'data', 'technology'],
    category: { id: '1', name: '3D Illustrations', slug: '3d-illustrations' },
    type: { id: '1', name: 'Illustration', slug: 'illustration' },
    createdAt: new Date('2024-01-08'),
    author: 'Designer Name',
    downloadCount: 3214
  }
]

export const useSearch = () => {
  const searchQuery = ref('')
  const selectedFilters = ref<Filter[]>([])
  const currentCategory = ref('3D Illustrations')
  const isLoading = ref(false)
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
        { id: '3d-illustrations', name: '3D Illustrations', value: '3d-illustrations', type: FilterType.ASSET, selected: true },
        { id: 'lottie-animations', name: 'Lottie Animations', value: 'lottie-animations', type: FilterType.ASSET, selected: false },
        { id: 'illustrations', name: 'Illustrations', value: 'illustrations', type: FilterType.ASSET, selected: false },
        { id: 'icons', name: 'Icons', value: 'icons', type: FilterType.ASSET, selected: false }
      ]
    },
    price: {
      id: 'price',
      name: 'Price',
      type: FilterType.PRICE,
      expanded: true,
      filters: [
        { id: 'free', name: 'Free', value: 'free', type: FilterType.PRICE, selected: false },
        { id: 'premium', name: 'Premium', value: 'premium', type: FilterType.PRICE, selected: true },
        { id: 'all-price', name: 'All', value: 'all', type: FilterType.PRICE, selected: false }
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
        { id: 'featured', name: 'Featured', value: 'featured', type: FilterType.SORT, selected: false }
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
    }
  }

  const toggleFilterGroup = (groupId: string) => {
    const group = Object.values(filters.value).find(g => g.id === groupId)
    if (group) {
      group.expanded = !group.expanded
    }
  }

  const performSearch = async () => {
    isLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Filter mock data based on selected filters
      let filteredAssets = [...mockAssets]
      
      // Apply filters
      const priceFilter = selectedFilters.value.find(f => f.type === FilterType.PRICE)
      if (priceFilter?.value === 'free') {
        filteredAssets = filteredAssets.filter(asset => !asset.isPremium)
      } else if (priceFilter?.value === 'premium') {
        filteredAssets = filteredAssets.filter(asset => asset.isPremium)
      }
      
      // Apply search query
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filteredAssets = filteredAssets.filter(asset =>
          asset.title.toLowerCase().includes(query) ||
          asset.description?.toLowerCase().includes(query) ||
          asset.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      searchResults.value = {
        assets: filteredAssets,
        total: filteredAssets.length,
        currentPage: 1,
        totalPages: Math.ceil(filteredAssets.length / 20),
        hasMore: filteredAssets.length > 20
      }
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
    performSearch()
  }

  // Initialize with data
  onMounted(() => {
    performSearch()
  })

  return {
    searchQuery: readonly(searchQuery),
    selectedFilters: readonly(selectedFilters),
    currentCategory: readonly(currentCategory),
    isLoading: readonly(isLoading),
    searchResults,
    filters,
    toggleFilter,
    toggleFilterGroup,
    handleSearch,
    setCategory,
    performSearch
  }
} 