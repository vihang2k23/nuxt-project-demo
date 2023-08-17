<!-- components/DataTable.vue -->
<template>
  <section class="overflow-x-auto mt-6">
    <div class="grid grid-cols-3 gap-4">
      <!--  Filter of Products -->
      <div>
        <select
          id="category"
          v-model="category"
          @change="filterCategory()"
          class="bg-gray-50 ml-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-1/2 p-2.5"
        >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's clothing</option>
          <option value="women's clothing">Women's clothing</option>
        </select>
      </div>
      <!-- Title  -->
      <div>
        <h1
          class="text-center justify-end mb-8 mt-2 font-bold text-3xl text-gray-900 dark:text-white text-center font-sans hover:font-serif"
        >
          Product List
        </h1>
      </div>
      <!-- create user button  -->
      <div class="grid-cols-end flex justify-end">
        <button
          class="inline-flex items-center mt-2 glow-on-hover px-5 py-2.5 mr-3 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mb-6"
          @click="createProduct()"
        >
          Create User
        </button>
      </div>
    </div>
    <!-- Product list table  -->
    <div class="overflow-x-auto">
      <table class="w-full border mx-auto divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              class="px-6 py-3 bg-gray-100 text-lg font-black text-left text-lg leading-4 text-gray-600 uppercase tracking-wider"
            >
              Id
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left leading-4 text-lg font-black text-gray-600 uppercase tracking-wider"
            >
              Image
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left leading-4 text-lg font-black text-gray-600 uppercase tracking-wider"
            >
              title
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left leading-4 text-lg font-black text-gray-600 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left leading-4 text-lg font-black text-gray-600 uppercase tracking-wider"
            >
              description
            </th>

            <th
              class="px-6 py-3 bg-gray-100 text-left leading-4 text-lg font-black text-gray-600 uppercase tracking-wider"
            >
              Ratting
            </th>
            <th
              class="px-6 py-3 bg-gray-100 text-left leading-4 text-lg font-black text-gray-600 uppercase tracking-wider"
            >
              Actions
            </th>

            <th></th>
            <!-- Add more th elements for other headers -->
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white" v-for="data in productData" :key="data.id">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {{ data.id }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <img :src="data.image" class="w-1/2"/>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {{ data.title }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {{ data.price }}$
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              {{ data.description }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <NuxtRating
                :read-only="true"
                ratingSize="32px"
                class="mr-5 relative"
                :ratingValue="data.rating.rate"
              />
            </td>
            <td class="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
              <div class="flex">
                <nuxt-icon
                  name="delete"
                  style=""
                  @click="deleteProduct(data.id)"
                  class="ml- 2 mr-3"
                  filled
                >
                </nuxt-icon>
                <nuxt-icon
                  class="cursor-pointer"
                  name="edit"
                  filled
                  @click="editProduct(data.id)"
                ></nuxt-icon>
              </div>
            </td>
            <!-- Add more td elements for other columns -->
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
// variables
const productData = ref([]);
const category = ref("");
const route = useRouter();
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.API_BASE_URL

// Mounted
onMounted(async () => {

  await getProductData();
});

// Methods

// Edit Product
const editProduct = (id :any) => {
  route.push({ path: `/product/${id}` });
}
//create product
const createProduct = () => {
  route.push({ path: "/product/create" });
}
//Filter Category
const filterCategory = async()=> {
  console.log("hello", category.value);
  if (category.value) {
    let data = await axios.get(
      `${apiBaseUrl}/products/category/${category.value}`
    );
    productData.value = data.data;
  } else {
    await getProductData();
  }
}
//get list of Product 
const  getProductData = async() => {
  let data = await axios.get(`${apiBaseUrl}/products`);
  productData.value = data.data;
}

//delete Product
const deleteProduct = (id :any) =>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,

    customClass: {
      confirmButton: "glow-on-hover",
      cancelButton: "glow-on-hover",
    },
    confirmButtonColor: "#111",

    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
      // Swal.fire({"Deleted!", "Your Product has been deleted.", "success"});
      Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted",
          icon: "success",
          customClass: {
      confirmButton: "glow-on-hover",
     
    },

      })
    }
  });
}
</script>

