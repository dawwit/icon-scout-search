<script setup lang="ts">
import type { Asset, SearchResults } from '~/types/search'
import AssetCard from './AssetCard.vue'

interface Props {
  searchResults: SearchResults
  isLoading: boolean
  currentCategory: string
  onAssetClick?: (asset: Asset) => void
  onTagClick?: (tag: string) => void
  onLoadMore?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  onAssetClick: () => {},
  onTagClick: () => {},
  onLoadMore: () => {}
})

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
watch(() => props.searchResults.assets, (newAssets) => {
  if (newAssets.length > 0) {
    displayedAssets.value = newAssets.slice(0, assetsPerLoad)
    loadCount.value = 1
  } else {
    displayedAssets.value = []
    loadCount.value = 0
  }
}, { immediate: true })

const canLoadMore = computed(() => {
  return loadCount.value < maxLoads && 
         displayedAssets.value.length < props.searchResults.assets.length
})

const shouldShowLoginPrompt = computed(() => {
  return loadCount.value >= maxLoads || 
         (displayedAssets.value.length >= props.searchResults.assets.length && loadCount.value > 0)
})

const handleLoadMore = async () => {
  if (!canLoadMore.value || isLazyLoading.value) return
  
  isLazyLoading.value = true
  
  // Simulate loading delay for better UX
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const startIndex = displayedAssets.value.length
  const endIndex = Math.min(startIndex + assetsPerLoad, props.searchResults.assets.length)
  const newAssets = props.searchResults.assets.slice(startIndex, endIndex)
  
  displayedAssets.value.push(...newAssets)
  loadCount.value++
  isLazyLoading.value = false
}

const handleAssetClick = (asset: Asset) => {
  props.onAssetClick(asset)
}
</script>

<template>
  <main class="mt-16 w-full lg:max-w-full lg:mt-10">
    <!-- Tags Section -->
    <div
      class="flex w-full items-stretch gap-2.5 font-averta text-sm text-[#636C7E] font-normal text-center leading-none flex-wrap lg:max-w-full mb-6"
    >
      <button
        v-for="tag in popularTags"
        :key="tag"
        class="rounded border border-[#E4E9F2] border-solid px-3 py-2 bg-white hover:bg-gray-50 hover:border-[#3D92DE] transition-colors"
        @click="onTagClick?.(tag)"
      >
        {{ tag }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0092E4]"></div>
      <span class="ml-3 text-[#636C7E]">Loading assets...</span>
    </div>

    <!-- Results Grid -->
    <div v-else-if="displayedAssets.length > 0" class="relative lg:max-w-full lg:mr-2.5">
      <!-- Asset Grid - Responsive Grid Layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
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
          class="bg-[#0092E4] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#007BC7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          @click="handleLoadMore"
        >
          <div v-if="isLazyLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          {{ isLazyLoading ? 'Loading...' : 'Load More Assets' }}
        </button>
    
      </div>

      <!-- Login Prompt Section -->
      <div v-if="shouldShowLoginPrompt" class="text-center mt-12 mb-8 p-8 bg-gradient-to-r from-[#0092E4]/5 to-[#3D92DE]/5 rounded-xl border border-[#E4E9F2]">
        <div class="max-w-2xl mx-auto">
          <Icon name="heroicons:sparkles" class="w-12 h-12 text-[#0092E4] mx-auto mb-4" />
          <h2 class="text-2xl font-bold text-[#2E334C] mb-4">
            Unlock Unlimited Access
          </h2>
          <p class="text-[#636C7E] mb-6 text-lg">
            Get unlimited downloads, premium assets, and exclusive design resources with a free account.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              class="bg-[#0092E4] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#007BC7] transition-colors text-lg min-w-[200px]"
              @click="onLoadMore?.()"
            >
              Get Started - It's Free
            </button>
            <button class="text-[#0092E4] font-semibold hover:text-[#007BC7] transition-colors underline">
              Already have an account? Log In
            </button>
          </div>
          <div class="mt-6 flex justify-center items-center gap-6 text-sm text-[#636C7E]">
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
    <div v-else class="flex flex-col items-center justify-center py-16">
      <Icon name="heroicons:magnifying-glass" class="w-16 h-16 text-[#9CA3AF] mb-4" />
      <h3 class="text-xl font-semibold text-[#2E334C] mb-2">No results found</h3>
      <p class="text-[#636C7E] text-center max-w-md">
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
</style>
