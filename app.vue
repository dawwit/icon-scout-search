<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Set up proper mobile viewport and meta tags
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
    { name: 'theme-color', content: '#0092E4' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
})
</script>

<style>
/* Mobile optimizations */
@media (max-width: 1024px) {
  /* Improve touch targets */
  button, a, input, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Prevent text scaling on iOS */
  * {
    -webkit-text-size-adjust: 100%;
  }
}

/* Prevent horizontal scroll */
html, body {
  overflow-x: hidden;
  width: 100%;
}

/* Improve scrolling on iOS */
* {
  -webkit-overflow-scrolling: touch;
}
</style>
