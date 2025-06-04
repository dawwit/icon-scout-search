export interface SearchFilter {
  id: string;
  label: string;
  selected: boolean;
}

export interface SearchCategory {
  id: string;
  name: string;
  active: boolean;
}

export interface SearchAsset {
  id: string;
  src: string;
  title?: string;
  aspectRatio: string;
  padding?: string;
}

export interface NavigationItem {
  label: string;
  hasDropdown?: boolean;
  href?: string;
}

export interface Asset {
  id: string
  title: string
  description?: string
  imageUrl: string
  isPremium: boolean
  tags: string[]
  category: AssetCategory
  type: AssetType
  createdAt: Date
  author: string
  downloadCount: number
  format: 'image' | 'video'
}

export interface AssetCategory {
  id: string
  name: string
  slug: string
}

export interface AssetType {
  id: string
  name: string
  slug: string
}

export interface Filter {
  id: string
  name: string
  value: string
  type: FilterType
  selected: boolean
}

export interface FilterGroup {
  id: string
  name: string
  type: FilterType
  filters: Filter[]
  expanded: boolean
}

export interface SearchFilters {
  assets: FilterGroup
  price: FilterGroup
  view: FilterGroup
  sortBy: FilterGroup
}

export interface SearchQuery {
  query: string
  filters: Filter[]
  category: string
  sortBy: string
  page: number
  limit: number
}

export interface SearchResults {
  assets: Asset[]
  total: number
  currentPage: number
  totalPages: number
  hasMore: boolean
}

export enum FilterType {
  ASSET = 'asset',
  PRICE = 'price',
  VIEW = 'view',
  SORT = 'sort',
  CATEGORY = 'category'
}

export enum SortOption {
  POPULAR = 'popular',
  LATEST = 'latest',
  FEATURED = 'featured'
}

export enum ViewOption {
  PACK = 'pack',
  INDIVIDUAL = 'individual'
}

export enum PriceOption {
  FREE = 'free',
  PREMIUM = 'premium',
  ALL = 'all'
}
