<template>
  <section>
    <div class="bg-white dark:bg-gray-900">
      <div class="form-elements mx-auto max-w-2xl lg:py-16">
        <!-- Title  -->
        <h2
          class="mb-8 font-bold text-4xl text-gray-900 dark:text-white text-center font-sans hover:font-serif"
        >
          {{
            route.params.id == "create"
              ? "Add a new product "
              : "Update a product"
          }}
        </h2>
        <!-- form  -->
        <form @submit.prevent>
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Product Title</label
              >
              <input
                type="text"
                v-model="productTitle"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                @keyup="validateInput('productTitle', productTitle)"
                @blur="validateInput('productTitle', productTitle)"
              />
              <span class="text-red-600" v-if="errors.productTitle">
                {{ errors.productTitle }}
              </span>
            </div>

            <div class="w-full">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Price</label
              >
              <input
                name="price"
                v-model="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                @keyup="validatePriceField('price', price)"
                @blur="validatePriceField('price', price)"
              />
              <span class="text-red-600" v-if="errors.price">
                {{ errors.price }}
              </span>
            </div>
            <div>
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Category</label
              >
              <select
                id="category"
                v-model="category"
                @keyup="validateInput('category', category)"
                @blur="validateInput('category', category)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's clothing</option>
                <option value="women's clothing">Women's clothing</option>
              </select>
              <span class="text-red-600" v-if="errors.category">
                {{ errors.category }}
              </span>
            </div>

            <div class="sm:col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <textarea
                id="description"
                v-model="description"
                rows="8"
                maxlength="250"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
          </div>
          <div class="flex justify-between">
            <button
              type="submit"
              @click="createProduct()"
              class="inline-flex glow-on-hover items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {{
                route.params.id == "create" ? "Add  product " : "Update  data"
              }}
            </button>
            <button
              @click="
                () => {
                  router.back();
                }
              "
              class="inline-flex items-center glow-on-hover px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup>
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";
import { reactive } from "@vue/reactivity";
import useFormValidation from "../../src/modules/useFormValidation";
import axios from "axios";

//Variables
const productTitle = ref("");
const category = ref("");
const description = ref("");
const price = ref(null);
const success = ref(false);
const error = ref(false);
const route = useRoute();
const router = useRouter();
const toast = useToast();
const productData = ref([]);
const { validateNameField, errors, validatePriceField } = useFormValidation();
const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.API_BASE_URL
// Mounted
onMounted(async () => {
  resetValidation();
  await getSingleProduct();
});



// Methods

// Get Single Product
const getSingleProduct = async () => {
  let data = await axios.get(
    `${apiBaseUrl}/products/${route.params.id}`
  );

  productData.value = data.data;
  productTitle.value = productData.value.title;
  price.value = productData.value.price;
  description.value = productData.value.description;
  category.value = productData.value.category;
};

// Input Validation method
const validateInput = (fieldname, value) => {
  validateNameField(fieldname, value);
};

// Create Product
const createProduct = async () => {
  checkFormValidation();
  if (
    Object.keys(errors).length >= 0 &&
    (errors.productTitle !== "" ||
      errors.price !== "" ||
      errors.category !== "")
  ) {
    return false;
  }
  let payload = {
    title: productTitle.value,
    price: price.value,
    description: description.value,
    image: "https://i.pravatar.cc",
    category: category.value,
  };

  if (route.params.id == "create") {
    try {
      let data = await axios.post(`${apiBaseUrl}/products`, {
        payload,
      });

      resetValidation();
      toast.success("Product Created Successfully");
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (e) {
      toast.error("errrorr", e);
      error.value = true;
    }
  } else {
    try {
      let data = await axios.put(
        `${apiBaseUrl}/products/${route.params.id}`,
        {
          payload,
        }
      );
      resetValidation();
      toast.success("Product Updated Successfully");
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (e) {
      //
      toast.error("errrorr", e);
      error.value = true;
    }
  }
};

// Check form validation
const checkFormValidation = () => {
  validateInput("productTitle", productTitle.value);
  validateNameField("price", price.value);
  validateNameField("category", category.value);
};

// Reset Validation
const resetValidation = () => {
  (errors.productTitle = ""), (errors.price = "");
  errors.category = "";
};
</script>

<style>
</style>