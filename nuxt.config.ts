// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_partials.scss" as *;',
        },
      },
    },
  },
  css: [
    '~/assets/scss/main.scss',
  ],
  runtimeConfig: {
    public: {
      iconscoutClientId: '',
      iconscoutClientSecret: '',
    }
  },
  modules: ['@nuxt/eslint', 'nuxt-icon', '@pinia/nuxt'],
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
});
