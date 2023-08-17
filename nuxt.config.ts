// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-icons',"nuxt-rating"  ],

  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  buildModules: [
    "@nuxtjs/axios"
],
axios: {
  baseURL: 'https://fakestoreapi.com',
},
build:{
  // vue-toastification - old commonjs module 
  transpile: ['vue-toastification'],
},
runtimeConfig: {
  public: {
    API_BASE_URL: process.env.API_BASE_URL,

  },
},

})
