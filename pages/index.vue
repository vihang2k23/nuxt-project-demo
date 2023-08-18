<!-- components/DataTable.vue -->
<template>
  <section class="overflow-x-auto">
    <navbar @emitValue="listingKey" />
    <categories v-if="categoryKey" />

    <Products v-if="productKey" />
  </section>
</template>

<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
// variables
const productData = ref([]);
const category = ref("");
const route = useRouter();
const productKey = ref(false);
const categoryKey = ref(true);

// Methods
function listingKey(data:any) {
  console.log(data, "emit");
  if (data == "Product") {
    productKey.value = true;
    categoryKey.value = false;
  } else {
    productKey.value = false;
    categoryKey.value = true;
  }
}
</script>

