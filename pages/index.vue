<template>
  <div class="bg-white overflow-hidden">
    <!-- Header -->
    <SearchHeader :on-search="handleSearch" :search-query="searchQuery" />

    <!-- Error Message -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded m-4">
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline"> {{ error }}</span>
    </div>

    <!-- Main Content Area -->
    <div
      class="bg-[#FAFAFC] flex mt-1.5 w-full px-10 lg:px-5 pt-6 pb-px flex-col overflow-hidden items-start font-averta text-sm lg:max-w-full"
    >
      <!-- Page Title and Description -->
      <div class="text-black text-[35px] font-bold">
        {{ searchResults.total }} {{ currentCategory }}
      </div>
      <div class="text-[#5A607D] font-normal mt-1">
        {{ searchResults.total }} assets exclusively selected by our designer community.
      </div>

      <!-- Category Tabs -->
      <div
        class="flex mt-10 ml-[262px] items-stretch gap-6 text-[#2F72BC] font-semibold flex-wrap"
      >
        <button
          :class="['flex-grow hover:text-black transition-colors', currentCategory === 'All Assets' ? 'text-black border-b-2 border-black' : '']"
          @click="setCategory('All Assets')"
        >
          All Assets
        </button>
        <button
          :class="['text-black', currentCategory === '3D Illustrations' ? 'border-b-2 border-black' : '']"
          @click="setCategory('3D Illustrations')"
        >
          3D Illustrations
        </button>
        <button
          :class="['flex-auto hover:text-black transition-colors', currentCategory === 'Lottie Animations' ? 'text-black border-b-2 border-black' : '']"
          @click="setCategory('Lottie Animations')"
        >
          Lottie Animations
        </button>
        <button
          :class="['hover:text-black transition-colors', currentCategory === 'Illustrations' ? 'text-black border-b-2 border-black' : '']"
          @click="setCategory('Illustrations')"
        >
          Illustrations
        </button>
        <button
          :class="['hover:text-black transition-colors', currentCategory === 'Icons' ? 'text-black border-b-2 border-black' : '']"
          @click="setCategory('Icons')"
        >
          Icons
        </button>
      </div>
      <div
        class="border-black border-2 border-solid mt-2 ml-[349px] w-[99px] flex-shrink-0 h-0.5 lg:ml-2.5"
        v-show="currentCategory === '3D Illustrations'"
      ></div>
    </div>

    <!-- Main Layout Container -->
    <div class="flex w-full px-5 bg-[#FAFAFC] pb-10">
      <!-- Sidebar -->
      <div class="w-[262px] flex-shrink-0 mr-5">
        <SearchFilters 
          :filters="filters"
          :on-toggle-filter="toggleFilter"
          :on-toggle-filter-group="toggleFilterGroup"
        />
      </div>

      <!-- Main Content -->
      <div class="flex-1 min-w-0">
        <SearchResults 
          :search-results="searchResults"
          :is-loading="isLoading"
          :current-category="currentCategory"
          :on-asset-click="handleAssetClick"
          :on-tag-click="handleTagClick"
          :on-load-more="loadMore"
        />
      </div>
    </div>

    <!-- Footer -->
    <SearchFooter />
  </div>
</template>

<script setup lang="ts">
import type { Asset } from '~/types/search'

// Use the search composable
const {
  searchQuery,
  currentCategory,
  isLoading,
  error,
  searchResults,
  filters,
  toggleFilter,
  toggleFilterGroup,
  handleSearch,
  setCategory,
  loadMore
} = useSearch()

// SEO Meta
useHead({
  title: computed(() => `${searchResults.value.total} ${currentCategory.value} - IconScout Search`),
  meta: [
    {
      name: "description",
      content: computed(() => 
        `${searchResults.value.total} ${currentCategory.value.toLowerCase()} exclusively selected by our designer community. Search and discover premium design assets.`
      ),
    },
    {
      property: "og:title",
      content: computed(() => `${searchResults.value.total} ${currentCategory.value} - IconScout Search`),
    },
    {
      property: "og:description",
      content: computed(() => 
        `${searchResults.value.total} ${currentCategory.value.toLowerCase()} exclusively selected by our designer community. Search and discover premium design assets.`
      ),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
})

// Event handlers
const handleAssetClick = (asset: Asset) => {
  console.log('Asset clicked:', asset)
  // You can add download functionality here
  // handleDownload(asset, 'svg')
}

const handleTagClick = (tag: string) => {
  handleSearch(tag)
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
</style>
