<script setup lang="ts">
import type { Asset } from '~/types/search'
import AssetCard from './AssetCard.vue'

interface Props {
  onAssetClick?: (asset: Asset) => void
  onTagClick?: (tag: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onAssetClick: () => {},
  onTagClick: () => {}
})

// Use search store directly
const searchStore = useSearchStore()

const popularTags = [
  'Conversation Design Assets',
  'Data design assets',
  'Crypto assets',
  'Business illustrations',
  'Technology icons',
  'Finance graphics',
  'Web design elements',
  'Mobile app icons'
]

// Lazy loading state
const displayedAssets = ref<Asset[]>([])
const loadCount = ref(0)
const isLazyLoading = ref(false)
const maxLoads = 2
const assetsPerLoad = 15

// Initialize displayed assets
watch(() => searchStore.searchResults.assets, (newAssets) => {
  if (newAssets && newAssets.length > 0) {
    displayedAssets.value = newAssets.slice(0, assetsPerLoad)
    loadCount.value = 1
  } else {
    displayedAssets.value = []
    loadCount.value = 0
  }
}, { immediate: true })

const canLoadMore = computed(() => {
  return loadCount.value < maxLoads && 
         displayedAssets.value.length < (searchStore.searchResults.assets?.length ?? 0)
})

const shouldShowLoginPrompt = computed(() => {
  return loadCount.value >= maxLoads || 
         (displayedAssets.value.length >= (searchStore.searchResults.assets?.length ?? 0) && loadCount.value > 0)
})

const handleLoadMore = async () => {
  if (!canLoadMore.value || isLazyLoading.value) return
  
  isLazyLoading.value = true
  
  // Simulate loading delay for better UX
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const startIndex = displayedAssets.value.length
  const endIndex = Math.min(startIndex + assetsPerLoad, searchStore.searchResults.assets?.length ?? 0)
  const newAssets = (searchStore.searchResults.assets ?? []).slice(startIndex, endIndex)
  
  displayedAssets.value.push(...newAssets)
  loadCount.value++
  isLazyLoading.value = false
}

const handleAssetClick = (asset: Asset) => {
  props.onAssetClick?.(asset)
}

const handleTagClick = (tag: string) => {
  props.onTagClick?.(tag)
}

const handleGetStarted = () => {
  // This could trigger a modal or redirect to registration
  searchStore.loadMore()
}
</script>

<template>
  <main class="mt-5 w-full lg:max-w-full lg:mt-5">
    <!-- Tags Section -->
    <div
      class="flex w-full items-stretch gap-2 sm:gap-2.5 font-averta text-xs sm:text-sm text-[#636C7E] font-normal text-center leading-none flex-wrap lg:max-w-full mb-6"
    >
      <button
        v-for="tag in popularTags"
        :key="tag"
        class="rounded border border-[#E4E9F2] border-solid px-2 sm:px-3 py-2 bg-white hover:bg-gray-50 hover:border-[#3D92DE] transition-colors touch-manipulation"
        @click="handleTagClick(tag)"
      >
        {{ tag }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="searchStore.isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0092E4]"/>
      <span class="ml-3 text-[#636C7E]">Loading assets...</span>
    </div>

    <!-- Results Grid -->
    <div v-else-if="displayedAssets.length > 0" class="relative lg:max-w-full lg:mr-2.5">
      <!-- Asset Grid - Responsive Grid Layout -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-8">
        <AssetCard
          v-for="asset in displayedAssets"
          :key="asset.id"
          :asset="asset"
          @click="handleAssetClick"
        />
      </div>

      <!-- Lazy Loading Button -->
      <div v-if="canLoadMore" class="text-center mb-8">
        <button
          :disabled="isLazyLoading"
          class="bg-[#0092E4] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#007BC7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto text-sm sm:text-base touch-manipulation"
          @click="handleLoadMore"
        >
          <div v-if="isLazyLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"/>
          {{ isLazyLoading ? 'Loading...' : 'Load More Assets' }}
        </button>
    
      </div>

      <!-- Login Prompt Section -->
      <div v-if="shouldShowLoginPrompt" class="text-center mt-8 sm:mt-12 mb-8 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-[#0092E4]/5 to-[#3D92DE]/5 rounded-xl border border-[#E4E9F2] mx-2 sm:mx-0">
        <div class="max-w-2xl mx-auto">
          <Icon name="heroicons:sparkles" class="w-10 h-10 sm:w-12 sm:h-12 text-[#0092E4] mx-auto mb-3 sm:mb-4" />
          <h2 class="text-xl sm:text-2xl font-bold text-[#2E334C] mb-3 sm:mb-4">
            Unlock Unlimited Access
          </h2>
          <p class="text-[#636C7E] mb-4 sm:mb-6 text-base sm:text-lg">
            Get unlimited downloads, premium assets, and exclusive design resources with a free account.
          </p>
          <div class="flex flex-col gap-3 sm:gap-4 justify-center items-center">
            <button
              class="bg-[#0092E4] text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-[#007BC7] transition-colors text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] touch-manipulation"
              @click="handleGetStarted"
            >
              Get Started - It's Free
            </button>
            <button class="text-[#0092E4] font-semibold hover:text-[#007BC7] transition-colors underline text-sm sm:text-base">
              Already have an account? Log In
            </button>
          </div>
          <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#636C7E]">
            <div class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-500" />
              <span>Free forever</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4 text-green-500" />
              <span>Premium assets included</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
      <Icon name="heroicons:magnifying-glass" class="w-12 h-12 sm:w-16 sm:h-16 text-[#9CA3AF] mb-3 sm:mb-4" />
      <h3 class="text-lg sm:text-xl font-semibold text-[#2E334C] mb-2 text-center">No results found</h3>
      <p class="text-[#636C7E] text-center max-w-md text-sm sm:text-base">
        Try adjusting your search terms or filters to find what you're looking for.
      </p>
    </div>
  </main>
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

.touch-manipulation {
  touch-action: manipulation;
}
</style>
