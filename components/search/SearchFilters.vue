<script setup lang="ts">
import type { FilterType } from '~/types/search'
import { FILTER_OPTIONS, type SelectedFilters } from '~/constants/filterOptions'

interface Props {
  selectedFilters: SelectedFilters
  onFilterChange?: (filterType: FilterType, value: string) => void
  onToggleFilterGroup?: (groupId: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onFilterChange: () => {},
  onToggleFilterGroup: () => {}
})

// Track which filter groups are expanded
const expandedGroups = ref<Record<string, boolean>>({
  assets: true,
  price: true,
  view: true,
  sortBy: true
})

const toggleFilter = (filterType: FilterType, value: string) => {
  props.onFilterChange(filterType, value)
}

const toggleFilterGroup = (groupId: string) => {
  expandedGroups.value[groupId] = !expandedGroups.value[groupId]
  props.onToggleFilterGroup(groupId)
}

const isFilterSelected = (filterType: FilterType, value: string): boolean => {
  return props.selectedFilters[filterType] === value
}
</script>

<template>
  <aside
    class="border-r border-[#EBEDF5] bg-white flex items-stretch overflow-hidden w-full lg:mt-10"
  >
    <div
      class="flex flex-col items-stretch flex-grow w-fit"
    >
      <!-- Filter Header -->
      <div class="bg-[#FAFAFC] w-full pt-3 overflow-hidden">
        <div class="flex mx-6 lg:mx-2.5 items-stretch gap-5 justify-between">
          <div class="flex items-stretch gap-2">
            <Icon name="heroicons:funnel" class="w-6 h-6 text-[#636C7E]" />
            <div class="text-[#2E334C] font-averta text-base font-semibold">
              Filters
            </div>
          </div>
          <button class="hover:bg-gray-100 rounded p-1 transition-colors">
            <Icon name="heroicons:x-mark" class="w-6 h-6 text-[#636C7E]" />
          </button>
        </div>
        <div
          class="border-[#EBEDF5] border border-solid bg-[#EBEDF5] mt-3 flex-shrink-0 h-px"
        ></div>
      </div>

      <!-- Iconscout Exclusive Toggle -->
      <div class="px-6 lg:px-2.5 py-4">
        <div class="flex items-center justify-between">
          <div class="text-[#1C2033] font-averta text-sm font-semibold">
            Iconscout Exclusive
          </div>
          <button
            class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"
            />
          </button>
        </div>
      </div>
      <div
        class="border-[#EBEDF5] border border-solid bg-[#EBEDF5] flex-shrink-0 h-px"
      ></div>

      <!-- Dynamic Filter Groups -->
      <div 
        v-for="(group, groupKey) in FILTER_OPTIONS" 
        :key="groupKey"
        class="max-w-full w-[260px] overflow-hidden"
      >
        <div class="flex w-full px-6 lg:px-5 pt-4 flex-col items-stretch">
          <button
            @click="toggleFilterGroup(groupKey)"
            class="flex items-stretch gap-5 font-averta text-sm text-[#1C2033] font-semibold whitespace-nowrap justify-between lg:whitespace-normal hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
          >
            <div class="text-[#1C2033] my-auto">{{ group.name }}</div>
            <Icon 
              :name="expandedGroups[groupKey] ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
              class="w-6 h-6 text-[#636C7E] transition-transform"
            />
          </button>
          
          <Transition name="slide-down">
            <div v-if="expandedGroups[groupKey]" class="flex mt-4 flex-col items-start justify-start">
              <div 
                v-for="option in group.options"
                :key="option.value"
                class="flex items-center gap-2 justify-start mb-2 last:mb-0"
              >
                <button
                  @click="toggleFilter(option.type, option.value)"
                  class="bg-white flex px-1 flex-col overflow-hidden items-center justify-center w-6 h-6 hover:bg-gray-50 transition-colors"
                >
                  <div
                    :class="[
                      'border border-solid rounded-full flex flex-shrink-0 h-4 w-4 transition-colors',
                      isFilterSelected(option.type, option.value)
                        ? 'border-[#3D92DE] bg-[#3D92DE]' 
                        : 'border-[#8F95B2]'
                    ]"
                  />
                </button>
                <button
                  @click="toggleFilter(option.type, option.value)"
                  class="text-[#2E334C] font-averta text-sm font-normal hover:text-[#0092E4] transition-colors"
                >
                  {{ option.name }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
        <div
          class="border-[#EBEDF5] border border-solid bg-[#EBEDF5] mt-5 flex-shrink-0 h-px"
        ></div>
      </div>
    </div>
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
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}
</style>
