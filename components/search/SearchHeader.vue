<script setup lang="ts">
const searchStore = useSearchStore()

const searchInput = ref('')
const showMobileMenu = ref(false)

// Sync searchInput with the composable's searchQuery
watch(() => searchStore.searchQuery, (newQuery) => {
  searchInput.value = newQuery
}, { immediate: true })

const performSearch = () => {
  if (searchInput.value.trim()) {
    searchStore.handleSearch(searchInput.value.trim())
  }
  showMobileMenu.value = false
}

// Clear search when input is empty
watch(searchInput, (newValue) => {
  if (newValue.length === 0) {
    searchStore.handleSearch('')
  }
})

// Close mobile menu when clicking outside or resizing
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      showMobileMenu.value = false
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<template>
  <header class="bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
    <div
      class="flex justify-between items-center w-full px-4 sm:px-6 py-3 gap-x-4 sm:gap-x-8 lg:gap-x-24 gap-y-4 font-averta flex-wrap lg:px-6 md:px-5"
    >
      <!-- Logo and Search Section -->
      <div
        class="flex min-w-0 my-auto items-center gap-3 sm:gap-7 justify-start flex-wrap lg:max-w-full w-full lg:w-auto order-1 lg:order-none"
      >
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center flex-shrink-0">
          <img
            src="/logo-iconscout.svg"
            alt="IconScout Logo"
            class="aspect-[5.32] object-contain object-center w-[120px] sm:w-[150px] lg:w-[170px] my-auto flex-shrink-0"
          >
        </NuxtLink>

        <!-- Search Bar -->
        <div
          class="flex items-center rounded-lg my-auto min-h-[40px] sm:min-h-[46px] px-2.5 py-2 gap-2 w-full sm:w-[300px] lg:w-[360px] bg-[#EBEDF5]"
        >
          <div
            class="flex min-w-0 my-auto items-center gap-2 justify-start flex-1"
          >
            <Icon name="heroicons:magnifying-glass" class="w-5 h-5 sm:w-6 sm:h-6 text-[#636C7E] flex-shrink-0" />
            <div
              class="border-[#B4BAD6] border border-solid bg-[#B4BAD6] my-auto w-0 flex-shrink-0 h-5 sm:h-7"
            />
            <input
              v-model="searchInput"
              type="text"
              placeholder="Search from 8 Million+ assets"
              class="text-[#2E334C] text-sm font-normal leading-6 bg-transparent border-none outline-none my-auto flex-1 min-w-0"
              @keyup.enter="performSearch"
            >
          </div>
          <button
            class="rounded bg-[#FAFAFC] my-auto min-h-[26px] sm:min-h-[30px] p-1.5 w-[26px] sm:w-[30px] h-[26px] sm:h-[30px] flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
            @click="performSearch"
          >
            <Icon name="heroicons:magnifying-glass" class="w-3 h-3 sm:w-4 sm:h-4 text-[#636C7E]" />
          </button>
        </div>
      </div>

      <!-- Navigation Menu - Hidden on mobile -->
      <nav
        class="hidden lg:flex min-w-60 my-auto items-start gap-4 text-base text-[#2E334D] font-semibold justify-start lg:max-w-full order-2 lg:order-none"
      >
        <div
          class="flex items-center whitespace-nowrap justify-start lg:whitespace-normal cursor-pointer hover:text-[#0092E4] transition-colors"
        >
          <span class="text-[#2E334D]">Explore</span>
          <Icon name="heroicons:chevron-down" class="w-4 h-4 ml-1" />
        </div>
        <div
          class="flex items-center whitespace-nowrap justify-start lg:whitespace-normal cursor-pointer hover:text-[#0092E4] transition-colors"
        >
          <span class="text-[#2E334D]">Tools</span>
          <Icon name="heroicons:chevron-down" class="w-4 h-4 ml-1" />
        </div>
        <span class="text-[#2E334D] hover:text-[#0092E4] transition-colors cursor-pointer">
          All Features
        </span>
        <div class="flex items-center justify-start cursor-pointer hover:text-[#0092E4] transition-colors">
          <Icon name="heroicons:gift" class="w-3 h-3 mr-2 text-[#0092E4]" />
          <span class="text-[#2E334D] my-auto">Free Asset</span>
        </div>
        <div
          class="flex items-center whitespace-nowrap justify-start lg:whitespace-normal cursor-pointer hover:text-[#0092E4] transition-colors"
        >
          <span class="text-[#2E334D]">Learn</span>
          <Icon name="heroicons:chevron-down" class="w-4 h-4 ml-1" />
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <div class="flex lg:hidden items-center order-3 lg:order-none">
        <button
          @click="showMobileMenu = !showMobileMenu"
          class="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Icon name="heroicons:bars-3" class="w-6 h-6 text-[#636C7E]" />
        </button>
      </div>

      <!-- Auth Buttons -->
      <div
        class="flex my-auto min-h-11 items-center gap-3 sm:gap-6 text-sm sm:text-base font-semibold whitespace-nowrap justify-center lg:whitespace-normal order-4 lg:order-none"
      >
        <div
          class="flex my-auto items-start gap-2 sm:gap-3 justify-start lg:whitespace-normal"
        >
          <button
            class="text-black my-auto lg:whitespace-normal rounded-full border border-[#D8DBEB] px-3 sm:px-5 py-2 sm:py-2.5 bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Login
          </button>
          <button
            class="text-white my-auto lg:whitespace-normal rounded-full px-3 sm:px-5 py-2 sm:py-2.5 bg-[#0092E4] hover:bg-[#007BC7] transition-colors text-sm sm:text-base"
          >
            Signup
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div 
      v-if="showMobileMenu"
      class="lg:hidden bg-white border-t border-gray-200 py-4 px-4"
    >
      <nav class="flex flex-col gap-4 text-base text-[#2E334D] font-semibold">
        <div class="flex items-center justify-between cursor-pointer hover:text-[#0092E4] transition-colors py-2">
          <span class="text-[#2E334D]">Explore</span>
          <Icon name="heroicons:chevron-down" class="w-4 h-4" />
        </div>
        <div class="flex items-center justify-between cursor-pointer hover:text-[#0092E4] transition-colors py-2">
          <span class="text-[#2E334D]">Tools</span>
          <Icon name="heroicons:chevron-down" class="w-4 h-4" />
        </div>
        <span class="text-[#2E334D] hover:text-[#0092E4] transition-colors cursor-pointer py-2">
          All Features
        </span>
        <div class="flex items-center justify-start cursor-pointer hover:text-[#0092E4] transition-colors py-2">
          <Icon name="heroicons:gift" class="w-4 h-4 mr-2 text-[#0092E4]" />
          <span class="text-[#2E334D]">Free Asset</span>
        </div>
        <div class="flex items-center justify-between cursor-pointer hover:text-[#0092E4] transition-colors py-2">
          <span class="text-[#2E334D]">Learn</span>
          <Icon name="heroicons:chevron-down" class="w-4 h-4" />
        </div>
      </nav>
    </div>
  </header>
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
