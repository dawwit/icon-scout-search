export interface Asset {
  id: string
  uuid: string
  title: string
  imageUrl: string
  isPremium: boolean
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
  SORT = 'sort'
} 