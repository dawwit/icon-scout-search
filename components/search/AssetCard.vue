<script setup lang="ts">
import type { Asset } from '~/types/search'

interface Props {
  asset: Asset
}

const props = defineProps<Props>()

defineEmits<{
  click: [asset: Asset]
}>()

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/280x280/f0f0f0/999999?text=No+Image'
}

const downloadAsset = () => {
  // Implement download logic
  console.log('Download asset:', props.asset.id)
}

const addToFavorites = () => {
  // Implement favorites logic
  console.log('Add to favorites:', props.asset.id)
}

const formatDownloadCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}
</script>

<template>
  <div
    class="group relative bg-[#FAFAFC] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    @click="$emit('click', asset)"
  >
    <!-- Premium Badge -->
    <div
      v-if="asset.isPremium"
      class="absolute top-3 right-3 z-10 bg-[#FFB800] text-white text-xs font-semibold px-2 py-1 rounded-full"
    >
      Premium
    </div>

    <!-- Image Container -->
    <div class="aspect-square relative overflow-hidden">
      <img
        :src="asset.imageUrl"
        :alt="asset.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        @error="handleImageError"
      />
      
      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
          <button
            class="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            @click.stop="downloadAsset"
            :title="asset.isPremium ? 'Download Premium Asset' : 'Download Free Asset'"
          >
            <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 text-[#636C7E]" />
          </button>
          <button
            class="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            @click.stop="addToFavorites"
            title="Add to Favorites"
          >
            <Icon name="heroicons:heart" class="w-5 h-5 text-[#636C7E]" />
          </button>
        </div>
      </div>
    </div>

    <!-- Asset Info -->
    <div class="p-4">
      <h3 class="font-averta text-sm font-medium text-[#2E334C] mb-1 line-clamp-2">
        {{ asset.title }}
      </h3>
      <p v-if="asset.description" class="text-xs text-[#636C7E] mb-2 line-clamp-1">
        {{ asset.description }}
      </p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="tag in asset.tags.slice(0, 3)"
          :key="tag"
          class="text-xs bg-[#E4E9F2] text-[#636C7E] px-2 py-1 rounded-full"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Asset Meta -->
      <div class="flex items-center justify-between text-xs text-[#636C7E]">
        <div class="flex items-center gap-1">
          <Icon name="heroicons:user" class="w-3 h-3" />
          <span>{{ asset.author }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="heroicons:arrow-down-tray" class="w-3 h-3" />
          <span>{{ formatDownloadCount(asset.downloadCount) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-averta {
  font-family:
    "Averta Std",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 