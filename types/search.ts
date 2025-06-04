export interface Asset {
  id: string
  uuid: string
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