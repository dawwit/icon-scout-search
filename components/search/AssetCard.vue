<script setup lang="ts">
import type { Asset } from '~/types/search'
import { ref } from 'vue'

interface Props {
  asset: Asset
}

const props = defineProps<Props>()

defineEmits<{
  click: [asset: Asset]
}>()

const { handleDownload } = useSearch()

// Track if we've already shown a fallback to prevent loops
const hasFallback = ref(false)

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement | HTMLVideoElement
  
  // Only set fallback once to prevent endless loops
  if (!hasFallback.value) {
    hasFallback.value = true
    if (target.tagName === 'IMG') {
      (target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjBGMEYwIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'
    }
  }
}

const downloadAsset = () => {
  handleDownload(props.asset)
}

const addToFavorites = () => {
  // Implement favorites logic
  console.log('Add to favorites:', props.asset.id)
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
      class="absolute top-3 left-3 z-20 bg-[#FFB800] text-white text-xs font-semibold px-2 py-1 rounded-full"
    >
      Premium
    </div>

    <!-- Image Container -->
    <div class="aspect-square relative overflow-hidden bg-gray-100">
      <video
        v-if="asset.format === 'video'"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        @error="handleImageError"
      >
        <source :src="asset.imageUrl" type="video/mp4">
        Your browser does not support the video tag.
      </video>
       
      <img
        v-else
        :src="asset.imageUrl"
        :alt="asset.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        @error="handleImageError"
      />
      
      <!-- Hover Overlay -->
      <div class="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/30 transition-all duration-300 w-full h-full">
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3 z-20 relative w-full h-full">
          <button
            class="bg-white/90 backdrop-blur-sm cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 absolute bottom-3 right-3"
            @click.stop="downloadAsset"
            :title="asset.isPremium ? 'Download Premium Asset' : 'Download Free Asset'"
          >
            <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 text-[#636C7E]" />
          </button>
          <button
            class="bg-white/90 backdrop-blur-sm cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 absolute top-3 right-3"
            @click.stop="addToFavorites"
            title="Add to Favorites"
          >
            <Icon name="heroicons:heart" class="w-5 h-5 text-[#636C7E]" />
          </button>
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