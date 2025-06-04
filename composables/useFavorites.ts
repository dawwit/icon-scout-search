import type { Asset } from '~/types/search'

const FAVORITES_STORAGE_KEY = 'iconscout_favorites'

export const useFavorites = () => {
  // Use VueUse reactive localStorage
  const favoriteUuids = useLocalStorage<string[]>(FAVORITES_STORAGE_KEY, [])

  // Check if an asset is favorited
  const isFavorite = (assetUuid: string): boolean => {
    return favoriteUuids.value.includes(assetUuid)
  }

  // Toggle favorite status
  const toggleFavorite = (asset: Asset) => {
    if (isFavorite(asset.uuid)) {
      favoriteUuids.value = favoriteUuids.value.filter(uuid => uuid !== asset.uuid)
    } else {
      favoriteUuids.value = [...favoriteUuids.value, asset.uuid]
    }
  }

  // Get favorites count
  const favoritesCount = computed(() => favoriteUuids.value.length)

  return {
    favoriteUuids: readonly(favoriteUuids),
    favoritesCount,
    isFavorite,
    toggleFavorite
  }
} 