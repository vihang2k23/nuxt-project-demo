<template>
  <section>
    <div class="mt-3">
      <span class="text-secendory text-4xl ml-6"> Products</span>
    </div>
    <div class="grid grid-cols-3 mt-5 gap-4">
      <!--  Filter of Products -->
      <div class="flex">
        <div class="ml-2">
          <input
            type="text"
            v-model="searchProduct"
            style="width: 300px"
            name="name"
            id="name"
            class="icon bg-gray-50 ml-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search Product"
          />
        </div>
      </div>
      <div class="justify-center flex">
        <div class="">
          <select
            id="category"
            v-model="categoryFilter"
            style="width: 300px"
            @change="filterCategory()"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
          >
            <option value="">Select category</option>
             <option v-for="categorydata in categoryList"
                  :key="categorydata.id" :value="categorydata.id">{{categorydata.name}}</option>
          </select>
        </div>
      </div>
      <!-- Title  -->

      <!-- create user button  -->
      <div class="grid-cols-end flex justify-end">
        <button
          class="inline-flex items-center glow-on-hover px-5 py-2.5 mr-3 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mb-6"
          @click="dialog = true,dialogKey='Create'"
        >
          Create Product
        </button>
      </div>
    </div>
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
              Actions
            </th>

            <th></th>
            <!-- Add more th elements for other headers -->
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white" v-for="data in productData" :key="data.id">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
             {{data.id}}
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
                  @click="editProduct(data)"
                ></nuxt-icon>
              </div>
            </td>
            <!-- Add more td elements for other columns -->
          </tr>
        </tbody>
      </table>
      <div v-if="!productData.length">
      <h2 class=" text-center text-2xl mt-5">
        Data Not Available</h2>
      </div>
 
    </div>
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title class="text-center mt-3">
          <span class="text-h3">{{dialogKey == "Create" ? "Create Product" : "Update Product"}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Title</label
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
              </v-col>
              <v-col cols="12" sm="12" md="12">
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
              </v-col>
              <v-col cols="12" sm="12" md="12" >
              <div  >

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
                  <option v-for="categorydata in categoryList"
                  :key="categorydata.id" :value="categorydata.id">{{categorydata.name}}</option>
                
                </select>
               
                <span class="text-red-600" v-if="errors.category">
                  {{ errors.category }}
                </span>
              </div>
               
              </v-col>
              <v-col cols="12" sm="12" md="12">
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
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <button
            class="inline-flex items-center px-5 py-2.5 mr-3 text-sm font-medium text-center text-white bg-secondary rounded-lg mb-6"
            variant="text"
            @click="(dialog = false), resetValidation(),emptyfield()"
          >
            Close
          </button>

          <button
            class="inline-flex items-center px-5 py-2.5 mr-3 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mb-6"
            @click="createProduct(data)"
          >
           {{dialogKey=="Create" ? "Create" : "Update"}}
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>


<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import useFormValidation from "../src/modules/useFormValidation";
import { useToast } from "vue-toastification";

// variables
const productData = ref([]);
const categoryList = ref([])
const categoryFilter = ref("");
const route = useRouter();
const searchProduct = ref("");
const toast = useToast();
const dialog = ref(false);
const productTitle = ref("");
const category = ref("");
const description = ref("");
const price = ref(null);
const success = ref(false);
const error = ref(false);
const dialogKey = ref()
const { validateNameField, errors, validatePriceField } = useFormValidation();
const runtimeConfig = useRuntimeConfig();
const id = ref()
const apiBaseUrl = runtimeConfig.public.API_BASE_URL;
// Mounted
onMounted(async () => {
      await getCategoryList()
  await getProductData();

});

watch(searchProduct,async(nv)=>{
    if(nv){
        await getProductData()
    }else{
        await getProductData()
    }

})


// Methods

//Filter Category
const filterCategory = async () => {
  console.log("hello", categoryFilter.value);
  if (categoryFilter.value) {
  let data = await axios.post(`${apiBaseUrl}/api/product/list`,{
    search:searchProduct.value,
    category_id : categoryFilter.value
   
  });
  let product = data.data.data;
  productData.value = product.products
  } else {
    await getProductData();
  }
};
//get list of Product
const getProductData = async () => {
  let data = await axios.post(`${apiBaseUrl}/api/product/list`,{
    search:searchProduct.value,
   
  });
  let product = data.data.data;
  productData.value = product.products
  console.log(' productData.value: ',  productData.value);
};

//delete Product
function deleteProduct(id){
 Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,

    confirmButtonColor: "#1E4ED8",

    confirmButtonText: "Yes, delete it!",
  }).then(async(result) => {
   try{
     if (result.isConfirmed) {
     
      let data = await axios.post(`${apiBaseUrl}/api/product/delete`,{
      id:id
      })
 
   await getProductData()
     
      Swal.fire({
        title: "Deleted!",
        text: data.data.message,
        icon: "success",
        confirmButtonColor: "#1E4ED8"
        
      });
    }
   }catch(e){
    console.log('e: ', e);
      toast.error(e.response.data.message)
   }
  }).catch((e)=>{
    console.log('e: ', e);
    
  })
}


// Input Validation method
const validateInput = (fieldname: any, value) => {
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
    category_id: category.value,
  };

  if (dialogKey.value ==  "Create") {
    try {
      let data = await axios.post(`${apiBaseUrl}/api/product/create`, 
        payload,
      );
dialog.value=false
      resetValidation();
      toast.success(data.data.message);
emptyfield()
      await getProductData()
    } catch (e) {
      toast.error("errrorr", e);
      error.value = true;
    }
  } else {
    try {
        let payloadData = {
    title: productTitle.value,
    price: price.value,
    description: description.value,
    category_id: category.value,
    id:id.value
  };
      let data = await axios.post(`${apiBaseUrl}/api/product/update`, payloadData);
      resetValidation();
      console.log(data);
     
      dialog.value=false
       emptyfield()
      toast.success(data.data.message);
         await getProductData()
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

const getCategoryList = async() => {
let data =await axios.post(`${apiBaseUrl}/api/category/list`,{
    
})
let categoryData = data.data.data
console.log('categoryData: ', categoryData);
categoryList.value = categoryData.categories
console.log('categoryList.value: ', categoryList.value);

};

function editProduct(data){
    console.log('data: ', data);
    dialog.value = true,dialogKey.value='Edit',(id.value=data.id)
    productTitle.value = data.title
    price.value = data.price
    category.value = data.category_id
    description.value = data.description
    id.value = data.id

}

function emptyfield(){
    productTitle.value = " ",

    category.value = ""
    description.value = ""
    price.value = null
}
</script>

<style>
</style>