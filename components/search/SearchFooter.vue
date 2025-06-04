<script setup lang="ts">
// Footer component - no complex logic needed
</script>

<template>
  <footer class="pt-6 mt-6 w-full overflow-hidden lg:max-w-full bg-[#EBEDF5]">
    <div class="flex w-full flex-col items-center justify-start lg:max-w-full">
      <!-- Top Section -->
      <div
        class="flex w-full max-w-7xl px-4 sm:px-6 lg:px-8 items-center gap-x-8 lg:gap-x-24 gap-y-6 lg:gap-y-10 text-sm text-black font-normal tracking-[-0.28px] justify-between flex-wrap"
      >
        <div
          class="flex min-w-0 my-auto items-center gap-4 font-averta justify-start flex-wrap sm:flex-nowrap"
        >
          <img
            src="/logo-iconscout.svg"
            alt="IconScout Logo"
            class="aspect-[5.13] object-contain object-center w-[140px] sm:w-[160px] lg:w-[185px] my-auto flex-shrink-0"
          >
          <div class="my-auto text-center sm:text-left">Design Resource Marketplace</div>
        </div>
        <div class="font-karla my-auto text-center sm:text-right">
          <span class="font-averta text-[#0058E3]"> 5,663,871 </span>
          <span class="font-averta"> graphic resources & counting </span>
        </div>
      </div>

      <!-- Divider -->
      <div
        class="border-[#D8DBEB] border border-solid bg-[#D8DBEB] min-h-0 mt-6 w-full max-w-7xl mx-4 sm:mx-6 lg:mx-8"
      />

      <!-- Links Section -->
      <div
        class="flex mt-6 px-4 sm:px-6 lg:px-8 w-full max-w-7xl items-start gap-x-8 lg:gap-x-16 gap-y-8 lg:gap-y-18 justify-start flex-wrap lg:max-w-full"
      >
        <!-- Graphic Resources -->
        <div class="font-averta text-sm leading-6 min-w-[160px] flex-1 lg:flex-none lg:min-w-[200px]">
          <div class="text-[#2E334C] font-bold mb-3">Graphic Resources</div>
          <div class="text-[#424866] font-normal space-y-2">
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Free Icons</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Free Emoji Icons</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Free Logo Icons</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">iOS Icons</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Sticker Icons</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Gradient Icons</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Curated Bundle</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Calendar of Festival</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Free Assets of the day</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Explore Design Assets</div>
          </div>
        </div>

        <!-- Products -->
        <div class="font-averta text-sm leading-6 min-w-[160px] flex-1 lg:flex-none lg:min-w-[200px]">
          <div class="text-[#2E334C] font-bold mb-3">Products</div>
          <div class="text-[#424866] font-normal space-y-2">
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Unicon Icon Font</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Color editor</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Apps & Plugins</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Hire designers</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">IconScout API</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Top Illustrations</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Top 3D Assets</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Reverse Image Search</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Unicon Plugin for Figma</div>
          </div>
        </div>

        <!-- Company -->
        <div class="font-averta text-sm leading-6 min-w-[160px] flex-1 lg:flex-none lg:min-w-[200px]">
          <div class="text-[#2E334C] font-bold mb-3">Company</div>
          <div class="text-[#424866] font-normal space-y-2">
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Blog</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">About</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Access features</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Sell on IconScout</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Startup program</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">We're hiring</div>
          </div>
        </div>

        <!-- Legal -->
        <div class="font-averta text-sm leading-6 min-w-[160px] flex-1 lg:flex-none lg:min-w-[200px]">
          <div class="text-[#2E334C] font-bold mb-3">Legal</div>
          <div class="text-[#424866] font-normal space-y-2">
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Terms of use</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Privacy policy</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">License agreeement</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Contributor terms</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Support center</div>
            <div class="text-[#424866] hover:text-[#0092E4] cursor-pointer transition-colors">Join discord community</div>
          </div>
        </div>

        <!-- Apps & Social -->
        <div class="flex min-w-[200px] flex-1 lg:flex-none lg:min-w-[240px] flex-col items-start justify-start w-full sm:w-auto">
          <div class="font-averta text-sm text-[#2E334C] font-bold leading-6 mb-3">
            <div class="text-[#2E334C]">Get IconScout for desktop</div>
            <div class="mt-3 text-[#424866] text-sm font-normal">Download available on desktop</div>
          </div>
          <div class="self-stretch mt-6">
            <div class="text-[#2E334C] font-averta text-sm font-bold leading-6 mb-3">
              Get LottieFiles mobile app
            </div>
            <div class="text-[#424866] text-sm font-normal">Available on mobile platforms</div>
          </div>
          <div class="mt-6 w-full">
            <div class="text-[#424866] font-averta text-sm font-bold leading-6 mb-3">
              Follow us
            </div>
            <div class="text-[#424866] text-sm font-normal">Connect with us on social media</div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="justify-center items-center flex mt-6 w-full px-4 sm:px-6 lg:px-8 py-6 flex-col font-karla text-sm text-[#424866] leading-6 lg:max-w-full bg-[#D8DBEB]"
      >
        <div
          class="flex w-full max-w-7xl items-center gap-x-8 lg:gap-x-24 gap-y-6 lg:gap-y-10 justify-between flex-wrap"
        >
          <div
            class="flex min-w-0 my-auto py-1 flex-col items-stretch font-normal w-full sm:w-auto text-center sm:text-left"
          >
            <div class="text-[#424866]">
              © 2021 Design Barn Inc. Made with ❤️ in India
            </div>
          </div>
          <div
            class="flex my-auto items-center gap-3 sm:gap-6 italic font-extralight justify-center sm:justify-start flex-wrap sm:flex-nowrap"
          >
            <div class="flex my-auto items-start gap-1 justify-start">
              <Icon name="heroicons:shield-check" class="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              <div class="text-[#424866] text-xs sm:text-sm">Secure Payments</div>
            </div>
            <div class="text-[#424866] text-xs sm:text-sm text-center">Payment methods accepted</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
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

.font-karla {
  font-family:
    "Karla",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
}
</style>
