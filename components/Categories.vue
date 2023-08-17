<template>
  <section>
    <div class="mt-3">
      <span class="text-secendory text-4xl ml-3"> Categories</span>
    </div>
    <div class="flex justify-between mb-4 mt-4 align-items-center">
      <div>
        <input
          type="text"
          v-model="searchCategory"
          style="width: 300px"
          name="name"
          id="name"

          class="icon bg-gray-50 ml-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Search Category"
        />
      </div>
      <!-- Title  -->

      <!-- create user button  -->
      <div class="grid-cols-end flex justify-end">
        <button
          @click="dialog = true,dialogStatus='Create'"
          class="inline-flex items-center glow-on-hover px-5 py-2.5 mr-4 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        
     
        >
          Create Category
        </button>
      </div>
    </div>
    <!-- Product list table  -->
    <div class="">
      <table class="w-5/12 border mx-auto divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              class="px-6 py-3 bg-gray-100 text-lg font-black text-left text-lg leading-4 text-gray-600 uppercase tracking-wider"
            >
              Category Name
            </th>

            <th
              class="px-6 py-3 bg-gray-100 text-right leading-4 text-lg font-black text-gray-600 uppercase tracking-wider"
            >
              Actions
            </th>

            <!-- Add more th elements for other headers -->
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white" v-for="data in categoryList" :key="data.id">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {{data.name}}
            </td>

            <td class="px-10 py-4 whitespace-no-wrap border-b border-gray-200  text-right">
              <div class="flex justify-end">
                <nuxt-icon name="delete" style="" class="ml- 2 mr-3" filled @click="deleteCategory(data.id)">
                </nuxt-icon>
                <nuxt-icon
                  class="cursor-pointer"
                  name="edit"
                  filled
                  @click="editCategory(data)"
                ></nuxt-icon>
              </div>
            </td>
            <!-- Add more td elements for other columns -->
          </tr>
        </tbody>
      </table>
      <div v-if="!categoryList.length">
      <h2 class="text-center text-2xl mt-5">
        Data Not Available</h2>
      </div>
    </div>
  </section>

  <v-dialog v-model="dialog" persistent width="512">
    <v-card>
      <v-card-title class="text-center mt-3">
        <span class="text-h5  text-center">{{dialogStatus == "Create" ? "Create Category" : "Update Category"}}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Category Name</label
              >
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                id="price"
                placeholder="Enter Category Name"
                required
                v-model="categoryName"
                @keydown="validateInput('categoryname', categoryName)"
                @blur="validateInput('categoryname', categoryName)"
              />
              <span class="text-red-600" v-if="errors.categoryname">
                {{ errors.categoryname }}
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="inline-flex items-center px-5 py-2.5 mr-3 text-sm font-medium text-center text-white bg-secondary rounded-lg mb-6"
          @click="(dialog = false), (errors.categoryname = ''), (categoryName = '')"
        >
          Close
        </v-btn>
        <button
          class="inline-flex items-center px-5 py-2.5 mr-3 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mb-6"
          @click="createCategory()"
        >
        {{dialogStatus == "Create" ? "Create " : "Update"}}
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import axios from "axios";
import useFormValidation from "../src/modules/useFormValidation";
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";
const categoryName = ref("");
const dialog = ref(false);
const searchCategory = ref("");
const runtimeConfig = useRuntimeConfig();
const categoryList = ref([])
const dialogStatus = ref('')
const id = ref(null)
const apiBaseUrl = runtimeConfig.public.API_BASE_URL;
const itemsPerPage = 5;
const toast = useToast();
const headers = ref([
  {
    title: "Category",
    align: "start",
    sortable: false,
    key: "name",
  },

  { title: "Actions", align: "center", key: "iron" },
]);
const { validateNameField, errors, validatePriceField } = useFormValidation();

watch(searchCategory,async(nv)=>{
    if(nv){
        await getCategoryList()
    }else{
        await getCategoryList()
    }

})

async function createCategory() {
  dialog.value = true;
  validateInput("categoryname", categoryName.value);
  console.log(errors);
  if (Object.keys(errors).length >= 0 && errors.categoryname !== "") {
    return false;
  }
if(dialogStatus.value == 'Create'){
 let data = await axios.post(`${apiBaseUrl}/api/category/create`,{
    
    name:categoryName.value
  })
   categoryName.value = ""
    dialog.value =false
  await getCategoryList()
  toast.success(data.data.message)
   
}else{
     let data = await axios.post(`${apiBaseUrl}/api/category/update`,{
    name:categoryName.value,
    id:id.value
  })
  dialog.value = false
  categoryName.value = ""
    toast.success(data.data.message)
  await getCategoryList()
}
 
}

function editCategory(data){
    dialog.value = true,dialogStatus.value='Edit',(id.value=data.id)
    categoryName.value = data.name
}
function deleteCategory(id){
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
     
      let data = await axios.post(`${apiBaseUrl}/api/category/delete`,{
      id:id
      })

   await getCategoryList()
      // Swal.fire({"Deleted!", "Your Product has been deleted.", "success"});
      Swal.fire({
        title: "Deleted!",
        text: data.data.message,
        confirmButtonColor: "#1E4ED8",
        icon: "success",
        
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


// async function searchCategoryList(){
//     if(searchCategory.value){

    
    
    
// }


// Input Validation method
const validateInput = (fieldname, value) => {
  validateNameField(fieldname, value);
};
const getCategoryList = async() => {
let data =await axios.post(`${apiBaseUrl}/api/category/list`,{
    search:searchCategory.value
})
let categoryData = data.data.data
console.log('categoryData: ', categoryData);
categoryList.value = categoryData.categories
console.log('categoryList.value: ', categoryList.value);

};
onMounted(async() => {
  errors.categoryname = "";
  await getCategoryList()
});
</script>
<style >
</style>