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
    </div>

    <!-- Main Layout Container -->
    <div class="flex w-full bg-[#FAFAFC] pb-10">
      <!-- Sidebar -->
      <div class="w-[262px] flex-shrink-0 mr-5">
        <SearchFilters 
          :selected-filters="selectedFilters"
          :on-filter-change="updateFilter"
          :on-toggle-filter-group="toggleFilterGroup"
        />
      </div>

      <!-- Main Content -->
      <div class="flex-1 min-w-0">
        <!-- Category Tabs -->
        <div
          class="flex mt-10 items-stretch gap-6 text-[#2F72BC] font-semibold flex-wrap"
        >
          <button
            v-for="option in FILTER_OPTIONS.assets.options"
            :key="option.value"
            :class="['cursor-pointer hover:text-black transition-colors', selectedFilters[FilterType.ASSET] === option.value ? 'text-black border-b-2 border-black' : '']"
            @click="updateFilter(FilterType.ASSET, option.value)"
          >
            {{ option.name }}
          </button>
        </div>
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
import { FilterType } from '~/types/search'
import { FILTER_OPTIONS } from '~/constants/filterOptions'

// Use the search composable
const {
  searchQuery,
  selectedFilters,
  isLoading,
  error,
  searchResults,
  updateFilter,
  toggleFilterGroup,
  handleSearch,
  loadMore
} = useSearch()

const currentCategory = computed(() => {
  return FILTER_OPTIONS[selectedFilters.value[FilterType.ASSET] || 'assets']?.name || 'Design Assets'
})

// SEO Meta
useHead({
  title: computed(() => `${searchQuery.value} ${currentCategory.value} | IconScout `),
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
const handleAssetClick = (_asset: Asset) => {
  // You can add download functionality here if needed
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
