<script setup lang="ts">
import type { FilterType } from '~/types/search'
import { FILTER_OPTIONS } from '~/constants/filterOptions'

// Use the Pinia store
const searchStore = useSearchStore()

// Track if entire filters section is collapsed
const filtersCollapsed = ref(true)

// Track which filter groups are expanded (local UI state)
const expandedGroups = ref<Record<string, boolean>>({
  asset: false,
  price: false,
  sortBy: false
})

const toggleFilter = (filterType: FilterType, value: string) => {
  searchStore.updateFilter(filterType, value)
}

const toggleFilterGroup = (groupId: string) => {
  expandedGroups.value[groupId] = !expandedGroups.value[groupId]
}

const toggleFiltersSection = () => {
  filtersCollapsed.value = !filtersCollapsed.value
}

// Count active filters
const activeFiltersCount = computed(() => {
  return Object.values(searchStore.selectedFilters).filter(value => value && value !== 'all').length
})
</script>

<template>
  <aside class="bg-white w-full">
    <!-- Collapsible Filter Header -->
    <div class="border-b border-[#EBEDF5] w-full">
      <button
        @click="toggleFiltersSection"
        class="flex items-center justify-between w-full px-4 sm:px-6 lg:px-5 py-4 hover:bg-gray-50 transition-colors touch-manipulation"
      >
        <div class="flex items-center gap-3">
          <Icon name="heroicons:funnel" class="w-5 h-5 text-[#636C7E]" />
          <div class="text-[#2E334C] font-averta text-base font-semibold">
            Filters
          </div>
          <div v-if="activeFiltersCount > 0" class="bg-[#0092E4] text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[20px] text-center">
            {{ activeFiltersCount }}
          </div>
        </div>
        <Icon 
          :name="filtersCollapsed ? 'heroicons:chevron-down' : 'heroicons:chevron-up'" 
          class="w-5 h-5 text-[#636C7E] transition-transform"
        />
      </button>
    </div>

    <!-- Collapsible Filters Content -->
    <Transition name="filters-collapse">
      <div v-if="!filtersCollapsed" class="overflow-hidden">
        <!-- Iconscout Exclusive Toggle -->
        <div class="px-4 sm:px-6 lg:px-5 py-4 border-b border-[#EBEDF5]">
          <div class="flex items-center justify-between">
            <div class="text-[#1C2033] font-averta text-sm font-semibold">
              Iconscout Exclusive
            </div>
            <button
              class="relative inline-flex h-5 w-9 lg:h-6 lg:w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                class="inline-block h-3 w-3 lg:h-4 lg:w-4 transform rounded-full bg-white transition-transform translate-x-1"
              />
            </button>
          </div>
        </div>

        <!-- Vertical Filter Groups -->
        <div class="space-y-0">
          <div 
            v-for="(group, groupKey) in FILTER_OPTIONS" 
            :key="groupKey"
            class="border-b border-[#EBEDF5] last:border-b-0"
          >
            <div class="px-4 sm:px-6 lg:px-5 py-3">
              <button
                class="flex items-center justify-between w-full font-averta text-sm text-[#1C2033] font-semibold hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors touch-manipulation"
                @click="toggleFilterGroup(groupKey)"
              >
                <span class="text-[#1C2033]">{{ group.name }}</span>
                <Icon 
                  :name="expandedGroups[groupKey] ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
                  class="w-4 h-4 text-[#636C7E] transition-transform"
                />
              </button>
              
              <Transition name="slide-down">
                <div v-if="expandedGroups[groupKey]" class="mt-3 space-y-2">
                  <div 
                    v-for="option in group.options"
                    :key="option.value"
                    class="flex items-center gap-3 py-1"
                  >
                    <button
                      class="bg-white flex items-center justify-center w-5 h-5 hover:bg-gray-50 transition-colors touch-manipulation"
                      @click="toggleFilter(option.type, option.value)"
                    >
                      <div
                        :class="[
                          'border border-solid rounded-full flex flex-shrink-0 h-3 w-3 transition-colors',
                          searchStore.selectedFilters[option.type] === option.value
                            ? 'border-[#3D92DE] bg-[#3D92DE]' 
                            : 'border-[#8F95B2]'
                        ]"
                      />
                    </button>
                    <button
                      class="text-[#2E334C] font-averta text-sm font-normal hover:text-[#0092E4] transition-colors text-left flex-1 py-1 touch-manipulation"
                      @click="toggleFilter(option.type, option.value)"
                    >
                      {{ option.name }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Clear Filters Button -->
        <div v-if="activeFiltersCount > 0" class="px-4 sm:px-6 lg:px-5 py-4 border-t border-[#EBEDF5]">
          <button
            @click="searchStore.clearFilters"
            class="text-[#0092E4] font-averta text-sm font-semibold hover:text-[#007BC7] transition-colors touch-manipulation"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </Transition>
  </aside>
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

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 300px;
  opacity: 1;
  transform: translateY(0);
}

.filters-collapse-enter-active,
.filters-collapse-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}

.filters-collapse-enter-from,
.filters-collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.filters-collapse-enter-to,
.filters-collapse-leave-from {
  max-height: 800px;
  opacity: 1;
}

.touch-manipulation {
  touch-action: manipulation;
}
</style>
