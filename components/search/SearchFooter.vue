<script setup lang="ts">
// Footer component logic can be added here
</script>

<template>
  <footer class="pt-6 mt-6 w-full overflow-hidden lg:max-w-full bg-[#EBEDF5]">
    <div class="flex w-full flex-col items-center justify-start lg:max-w-full">
      <!-- Top Section -->
      <div
        class="flex w-[1100px] max-w-full items-center gap-x-24 gap-y-10 text-sm text-black font-normal tracking-[-0.28px] justify-between flex-wrap"
      >
        <div
          class="flex min-w-60 my-auto items-center gap-4 font-averta justify-start"
        >
          <img
            src="/logo-iconscout.svg"
            alt="IconScout Logo"
            class="aspect-[5.13] object-contain object-center w-[185px] my-auto flex-shrink-0"
          >
          <div class="my-auto">Design Resource Marketplace</div>
        </div>
        <div class="font-karla my-auto">
          <span class="font-averta text-[#0058E3]"> 5,663,871 </span>
          <span class="font-averta"> {" "} graphic resources & counting </span>
        </div>
      </div>

      <!-- Divider -->
      <div
        class="border-[#D8DBEB] border border-solid bg-[#D8DBEB] min-h-0 mt-6 w-[1100px] max-w-full"
      />

      <!-- Links Section -->
      <div
        class="flex mt-6 items-start gap-x-16 gap-y-18 justify-start flex-wrap lg:max-w-full"
      >
        <!-- Graphic Resources -->
        <div class="font-averta text-sm leading-6">
          <div class="text-[#2E334C] font-bold">Graphic Resources</div>
          <div class="mt-3 text-[#424866] font-normal">
            <div class="text-[#424866]">Free Icons</div>
            <div class="text-[#424866] mt-1">Free Emoji Icons</div>
            <div class="text-[#424866] mt-1">Free Logo Icons</div>
            <div class="text-[#424866] mt-1">iOS Icons</div>
            <div class="text-[#424866] mt-1">Sticker Icons</div>
            <div class="text-[#424866] mt-1">Gradient Icons</div>
            <div class="text-[#424866] mt-1">Curated Bundle</div>
            <div class="text-[#424866] mt-1">Calendar of Festival</div>
            <div class="text-[#424866] mt-1">Free Assets of the day</div>
            <div class="text-[#424866] mt-1">Explore Design Assets</div>
          </div>
        </div>

        <!-- Products -->
        <div class="font-averta text-sm leading-6">
          <div class="text-[#2E334C] font-bold">Products</div>
          <div class="mt-3 text-[#424866] font-normal">
            <div class="text-[#424866]">Unicon Icon Font</div>
            <div class="text-[#424866] mt-1">Color editor</div>
            <div class="text-[#424866] mt-1">Apps & Plugins</div>
            <div class="text-[#424866] mt-1">Hire designers</div>
            <div class="text-[#424866] mt-1">IconScout API</div>
            <div class="text-[#424866] mt-1">Top Illustrations</div>
            <div class="text-[#424866] mt-1">Top 3D Assets</div>
            <div class="text-[#424866] mt-1">Reverse Image Search</div>
            <div class="text-[#424866] mt-1">Unicon Plugin for Figma</div>
          </div>
        </div>

        <!-- Company -->
        <div class="font-averta text-sm leading-6">
          <div class="text-[#2E334C] font-bold">Company</div>
          <div class="mt-3 text-[#424866] font-normal">
            <div class="text-[#424866]">Blog</div>
            <div class="text-[#424866] mt-1">About</div>
            <div class="text-[#424866] mt-1">Access features</div>
            <div class="text-[#424866] mt-1">Sell on IconScout</div>
            <div class="text-[#424866] mt-1">Startup program</div>
            <div class="text-[#424866] mt-1">We're hiring</div>
          </div>
        </div>

        <!-- Legal -->
        <div class="font-averta text-sm leading-6">
          <div class="text-[#2E334C] font-bold">Legal</div>
          <div class="mt-3 text-[#424866] font-normal">
            <div class="text-[#424866]">Terms of use</div>
            <div class="text-[#424866] mt-1">Privacy policy</div>
            <div class="text-[#424866] mt-1">License agreeement</div>
            <div class="text-[#424866] mt-1">Contributor terms</div>
            <div class="text-[#424866] mt-1">Support center</div>
            <div class="text-[#424866] mt-1">Join discord community</div>
          </div>
        </div>

        <!-- Apps & Social -->
        <div class="flex min-w-60 flex-col items-start justify-start">
          <div class="font-averta text-sm text-[#2E334C] font-bold leading-6">
            <div class="text-[#2E334C]">Get IconScout for desktop</div>
            <div class="mt-3 text-[#424866] text-sm">Download available on desktop</div>
          </div>
          <div class="self-stretch mt-6">
            <div class="text-[#2E334C] font-averta text-sm font-bold leading-6">
              Get LottieFiles mobile app
            </div>
            <div class="mt-3 text-[#424866] text-sm">Available on mobile platforms</div>
          </div>
          <div class="mt-6 min-h-[69px] w-[241px] max-w-full">
            <div class="text-[#424866] font-averta text-sm font-bold leading-6">
              Follow us
            </div>
            <div class="mt-3 text-[#424866] text-sm">Connect with us on social media</div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="justify-center items-center flex mt-6 w-full px-2.5 py-6 flex-col font-karla text-sm text-[#424866] leading-6 lg:max-w-full bg-[#D8DBEB]"
      >
        <div
          class="flex w-[1100px] max-w-full items-center gap-x-24 gap-y-10 justify-between flex-wrap"
        >
          <div
            class="flex min-w-60 my-auto py-1 flex-col items-stretch font-normal w-[290px]"
          >
            <div class="text-[#424866]">
              © 2021 Design Barn Inc. Made with ❤️ in India
            </div>
          </div>
          <div
            class="flex my-auto items-center gap-6 italic font-extralight justify-start"
          >
            <div class="flex my-auto items-start gap-1 justify-start">
              <Icon name="heroicons:shield-check" class="w-6 h-6 text-green-500" />
              <div class="text-[#424866]">Secure Payments</div>
            </div>
            <div class="text-[#424866] text-sm">Payment methods accepted</div>
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
