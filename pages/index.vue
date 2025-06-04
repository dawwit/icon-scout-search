<template>
  <div class="bg-white overflow-hidden">
    <!-- Header -->
    <SearchHeader />

    <!-- Error Message -->
    <div v-if="searchStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded m-4">
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline"> {{ searchStore.error }}</span>
    </div>

    <!-- Main Content Area -->
    <div
      class="bg-[#FAFAFC] flex mt-1.5 w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-6 pb-px flex-col overflow-hidden items-start font-averta text-sm lg:max-w-full"
    >
      <!-- Page Title and Description -->
      <div class="text-black text-2xl sm:text-3xl md:text-[35px] font-bold">
        {{ searchStore.searchResults.total }} {{ currentCategory }}
      </div>
      <div class="text-[#5A607D] font-normal mt-1 text-sm sm:text-base">
        {{ searchStore.searchResults.total }} assets exclusively selected by our designer community.
      </div>
    </div>

    <!-- Main Layout Container -->
    <div class="w-full bg-[#FAFAFC] pb-10">
      <!-- Mobile Filters - Inline on mobile -->
      <div class="lg:hidden w-full px-4 sm:px-6 md:px-8">
        <SearchFilters />
      </div>

      <!-- Desktop Layout -->
      <div class="hidden lg:flex w-full">
        <!-- Desktop Sidebar -->
        <div class="w-[262px] flex-shrink-0 mr-5">
          <SearchFilters />
        </div>

        <!-- Desktop Main Content -->
        <div class="flex-1 min-w-0">
          <!-- Category Tabs -->
          <div
            class="flex mt-10 items-stretch gap-6 text-[#2F72BC] font-semibold overflow-x-auto pb-2 scrollbar-hide"
          >
            <button
              v-for="option in FILTER_OPTIONS.asset.options"
              :key="option.value"
              :class="[
                'cursor-pointer hover:text-black transition-colors whitespace-nowrap text-base flex-shrink-0',
                searchStore.selectedFilters[FilterType.ASSET] === option.value ? 'text-black border-b-2 border-black' : ''
              ]"
              @click="searchStore.updateFilter(FilterType.ASSET, option.value)"
            >
              {{ option.name }}
            </button>
          </div>
          <SearchResults 
            :on-asset-click="handleAssetClick"
            :on-tag-click="handleTagClick"
          />
        </div>
      </div>

      <!-- Mobile Content -->
      <div class="lg:hidden w-full px-4 sm:px-6 md:px-8">
        <!-- Category Tabs -->
        <div
          class="flex mt-6 items-stretch gap-3 sm:gap-4 text-[#2F72BC] font-semibold overflow-x-auto pb-2 scrollbar-hide"
        >
          <button
            v-for="option in FILTER_OPTIONS.asset.options"
            :key="option.value"
            :class="[
              'cursor-pointer hover:text-black transition-colors whitespace-nowrap text-sm sm:text-base flex-shrink-0',
              searchStore.selectedFilters[FilterType.ASSET] === option.value ? 'text-black border-b-2 border-black' : ''
            ]"
            @click="searchStore.updateFilter(FilterType.ASSET, option.value)"
          >
            {{ option.name }}
          </button>
        </div>
        <SearchResults 
          :on-asset-click="handleAssetClick"
          :on-tag-click="handleTagClick"
        />
      </div>
    </div>

    <!-- Footer -->
    <SearchFooter />
  </div>
</template>

<script setup lang="ts">
import type { Asset } from '~/types/search'
import { FilterType } from '~/types/search'
import { FILTER_OPTIONS } from '~/constants/filterOptions'

// Use the Pinia store
const searchStore = useSearchStore()

const currentCategory = computed(() => {
  const selectedAssetType = searchStore.selectedFilters[FilterType.ASSET]
  
  const assetOption = FILTER_OPTIONS.asset.options.find(
    option => option.value === selectedAssetType
  )
  
  return assetOption?.name || 'Design Assets'
})

// SEO Meta
useHead({
  title: computed(() => `${searchStore.searchQuery} ${currentCategory.value} | IconScout `),
  meta: [
    {
      name: "description",
      content: computed(() => 
        `${searchStore.searchResults.total} ${currentCategory.value?.toLowerCase() || 'design assets'} exclusively selected by our designer community. Search and discover premium design assets.`
      ),
    },
    {
      property: "og:title",
      content: computed(() => `${searchStore.searchResults.total} ${currentCategory.value} - IconScout Search`),
    },
    {
      property: "og:description",
      content: computed(() => 
        `${searchStore.searchResults.total} ${currentCategory.value.toLowerCase()} exclusively selected by our designer community. Search and discover premium design assets.`
      ),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
})

// Simplified event handlers
const handleAssetClick = (_asset: Asset) => {
  // Asset click logic can be added here if needed
}

const handleTagClick = (tag: string) => {
  searchStore.handleSearch(tag)
}
</script>

<style scoped>
.font-averta {
  font-family:
    "Averta Std",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
}

.font-karla {
  font-family:
    "Karla",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
}

.line-height-normal {
  line-height: normal;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
