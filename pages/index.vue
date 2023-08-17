<!-- components/DataTable.vue -->
<template>
  <section class="overflow-x-auto ">
  <navbar @emitValue="listingKey"/>
   <categories v-if="categoryKey"/>

   <Products v-if="productKey"/>
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
const productKey = ref(false)
const categoryKey = ref(true)
// Mounted
onMounted(async () => {

  await getProductData();
});

// Methods
function listingKey(data){
  console.log(data,"emit");
  if(data == "Product"){
    productKey.value=true;
    categoryKey.value = false
  }else{
    productKey.value = false
    categoryKey.value=true
  }
}


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

