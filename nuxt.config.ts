// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-icons',"nuxt-rating"  ],
  script: [
    {
      src: 'bootstrap/dist/js/bootstrap.bundle.min.js'
    }
  ],

  css: ["bootstrap/dist/css/bootstrap.min.css",'~/assets/css/tailwind.css','vuetify/lib/styles/main.sass'],
  
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
  transpile: ['vue-toastification','vuetify'],
},
runtimeConfig: {
  public: {
    API_BASE_URL: process.env.API_BASE_URL,

  },
},

})
