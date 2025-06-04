import { FilterType } from '~/types/search'

export interface FilterOption {
  name: string
  value: string
  type: FilterType
}

export interface FilterGroupOption {
  name: string
  type: FilterType
  options: FilterOption[]
}

export const FILTER_OPTIONS: Record<string, FilterGroupOption> = {
  assets: {
    name: 'Asset',
    type: FilterType.ASSET,
    options: [
      { name: 'All asset', value: 'all', type: FilterType.ASSET },
      { name: '3D Illustrations', value: '3d', type: FilterType.ASSET },
      { name: 'Lottie Animations', value: 'lottie', type: FilterType.ASSET },
      { name: 'Illustrations', value: 'illustration', type: FilterType.ASSET },
      { name: 'Icons', value: 'icon', type: FilterType.ASSET }
    ]
  },
  price: {
    name: 'Price',
    type: FilterType.PRICE,
    options: [
      { name: 'Free', value: 'free', type: FilterType.PRICE },
      { name: 'Premium', value: 'premium', type: FilterType.PRICE },
      { name: 'All', value: 'all', type: FilterType.PRICE }
    ]
  },
  sortBy: {
    name: 'Sort by',
    type: FilterType.SORT,
    options: [
      { name: 'Popular', value: 'popular', type: FilterType.SORT },
      { name: 'Latest', value: 'latest', type: FilterType.SORT },
      { name: 'Featured', value: 'featured', type: FilterType.SORT },
      { name: 'Relevant', value: 'relevant', type: FilterType.SORT }
    ]
  }
} as const

// Type for selected filters - just values
export type SelectedFilters = {
  [FilterType.ASSET]?: string
  [FilterType.PRICE]?: string
  [FilterType.SORT]?: string
} 