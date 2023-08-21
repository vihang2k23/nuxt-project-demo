// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
devtools: { enabled: true },
modules: ['nuxt-icons',"nuxt-rating" ,    'nuxt-mapbox' ],
mapbox: {
  accessToken: 'pk.eyJ1IjoidmloYW5ncCIsImEiOiJjbGl4MGx4YXQwM2d3M3FxZXdkcWExMnhpIn0.q-nh1qUn2qvaKe630T2w2g'
},
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
