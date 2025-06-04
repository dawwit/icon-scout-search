<script setup lang="ts">
import type { Asset, SearchResults } from '~/types/search'

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

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/280x200/f0f0f0/999999?text=No+Image'
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

    <!-- Results Grid - Original IconScout Style -->
    <div v-else-if="searchResults.assets.length > 0" class="relative lg:max-w-full lg:mr-2.5">
      <!-- Asset Grid -->
      <div class="flex flex-wrap gap-3 justify-start">
        <!-- Row 1 -->
        <div
          v-for="asset in searchResults.assets.slice(0, 5)"
          :key="asset.id"
          class="bg-[#FAFAFC] rounded-lg overflow-hidden w-[280px] flex flex-col justify-center items-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
          @click="onAssetClick?.(asset)"
        >
          <img
            :src="asset.imageUrl"
            :alt="asset.title"
            class="max-w-full max-h-[162px] object-contain"
            @error="handleImageError"
          />
        </div>
      </div>

      <!-- Row 2 -->
      <div class="flex flex-wrap gap-3 justify-start mt-3" v-if="searchResults.assets.length > 5">
        <div
          v-for="asset in searchResults.assets.slice(5, 10)"
          :key="asset.id"
          class="bg-[#FAFAFC] rounded-lg overflow-hidden w-[280px] flex flex-col justify-center items-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
          @click="onAssetClick?.(asset)"
        >
          <img
            :src="asset.imageUrl"
            :alt="asset.title"
            class="max-w-full max-h-[162px] object-contain"
            @error="handleImageError"
          />
        </div>
      </div>

      <!-- Row 3 -->
      <div class="flex flex-wrap gap-3 justify-start mt-3" v-if="searchResults.assets.length > 10">
        <div
          v-for="asset in searchResults.assets.slice(10, 15)"
          :key="asset.id"
          class="bg-[#FAFAFC] rounded-lg overflow-hidden w-[280px] flex flex-col justify-center items-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
          @click="onAssetClick?.(asset)"
        >
          <img
            :src="asset.imageUrl"
            :alt="asset.title"
            class="max-w-full max-h-[162px] object-contain"
            @error="handleImageError"
          />
        </div>
      </div>

      <!-- Load More Section -->
      <div class="text-center mt-12 mb-8">
        <div class="text-2xl font-bold text-[#2E334C] mb-4">
          View all Limit 3D Illustrations
        </div>
        <button
          class="bg-[#0092E4] text-white px-12 py-3 rounded-xl font-semibold hover:bg-[#007BC7] transition-colors text-lg"
          @click="onLoadMore?.()"
        >
          Get Started - It's Free
        </button>
        <div class="mt-3">
          <span class="text-[#2E334C]">Already have an account? </span>
          <button class="text-[#0092E4] font-semibold hover:text-[#007BC7] transition-colors underline">
            Log In
          </button>
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
