<script setup lang="ts">
interface Props {
  onSearch?: (query: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  onSearch: () => {}
})

const searchInput = ref('')

const handleSearch = () => {
  if (searchInput.value.trim()) {
    props.onSearch(searchInput.value.trim())
  }
}

// Watch for changes and emit search
watch(searchInput, (newValue) => {
  if (newValue.length === 0) {
    props.onSearch('')
  }
})
</script>

<template>
  <header class="bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)]">
    <div
      class="flex justify-between items-center w-full px-6 py-3 gap-x-24 gap-y-10 font-averta flex-wrap lg:px-6 md:px-5"
    >
      <!-- Logo and Search Section -->
      <div
        class="flex min-w-60 my-auto items-center gap-7 justify-start flex-wrap lg:max-w-full"
      >
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img
            src="/logo-iconscout.svg"
            alt="IconScout Logo"
            class="aspect-[5.32] object-contain object-center w-[170px] my-auto flex-shrink-0"
          />
        </NuxtLink>

        <!-- Search Bar -->
        <div
          class="flex items-center rounded-lg my-auto min-w-60 min-h-[46px] px-2.5 py-2 gap-2 w-[360px] bg-[#EBEDF5]"
        >
          <div
            class="flex min-w-60 my-auto items-center gap-2 justify-start flex-1"
          >
            <Icon name="heroicons:magnifying-glass" class="w-6 h-6 text-[#636C7E]" />
            <div
              class="border-[#B4BAD6] border border-solid bg-[#B4BAD6] my-auto w-0 flex-shrink-0 h-7"
            ></div>
            <Icon name="heroicons:adjustments-horizontal" class="w-5 h-5 text-[#636C7E]" />
            <input
              v-model="searchInput"
              type="text"
              placeholder="Search from 8 Million+ assets"
              class="text-[#2E334C] text-sm font-normal leading-6 bg-transparent border-none outline-none my-auto flex-1"
              @keyup.enter="handleSearch"
            />
          </div>
          <button
            @click="handleSearch"
            class="rounded bg-[#FAFAFC] my-auto min-h-[30px] p-1.5 w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-[#636C7E]" />
          </button>
        </div>

        <!-- Navigation Menu -->
        <nav
          class="flex min-w-60 my-auto items-start gap-4 text-base text-[#2E334D] font-semibold justify-start lg:max-w-full"
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
          <NuxtLink 
            to="/features" 
            class="text-[#2E334D] hover:text-[#0092E4] transition-colors"
          >
            All Features
          </NuxtLink>
          <div class="flex items-center justify-start cursor-pointer hover:text-[#0092E4] transition-colors">
            <Icon name="heroicons:gift" class="w-4 h-4 mr-1 text-[#0092E4]" />
            <span class="text-[#2E334D] my-auto">Free Asset</span>
          </div>
          <div
            class="flex items-center whitespace-nowrap justify-start lg:whitespace-normal cursor-pointer hover:text-[#0092E4] transition-colors"
          >
            <span class="text-[#2E334D]">Learn</span>
            <Icon name="heroicons:chevron-down" class="w-4 h-4 ml-1" />
          </div>
        </nav>
      </div>

      <!-- Auth Buttons -->
      <div
        class="flex my-auto min-h-11 items-center gap-6 text-base font-semibold whitespace-nowrap justify-center lg:whitespace-normal"
      >
        <div
          class="flex my-auto items-start gap-3 justify-start lg:whitespace-normal"
        >
          <button
            class="text-black my-auto lg:whitespace-normal rounded-full border border-[#D8DBEB] px-5 py-2.5 bg-white hover:bg-gray-50 transition-colors"
          >
            Login
          </button>
          <button
            class="text-white my-auto lg:whitespace-normal rounded-full px-5 py-2.5 bg-[#0092E4] hover:bg-[#007BC7] transition-colors"
          >
            Signup
          </button>
        </div>
      </div>
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
