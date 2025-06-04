// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon'
  ],

  // Icon configuration
  icon: {
    size: '24px', // default icon size
    class: '', // default CSS class
    aliases: {},
  },

  // Runtime configuration for environment variables
  runtimeConfig: {
    // Private keys (only available on server-side)
    iconscoutClientSecret: process.env.ICONSCOUT_CLIENT_SECRET,
    
    // Public keys (exposed to client-side)
    public: {
      iconscoutClientId: process.env.ICONSCOUT_CLIENT_ID,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true
  },

  // SSR and performance optimization
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },

  // SEO configuration
  app: {
    head: {
      title: 'IconScout Search',
      meta: [
        { name: 'description', content: 'Search for high-quality icons using IconScout API' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})