<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark pl-3">
    <div class="container-fluid">
      <div class="flex justify-between w-full align-items-center">
        <div>
          <a
            class="navbar-brand font-bold cursor-pointer"
            @click="emit('emitValue', 'Category')"
            >E-commerce</a
          >
        
        </div>
        <div>
          <v-btn
            color="white navbar-brand"
            variant="plain"
            @click="emit('emitValue', 'Category')"
          >
            Category
          </v-btn>
          <v-btn
            color="white navbar-brand"
            variant="plain"
            @click="emit('emitValue', 'Product')"
          >
            Product
          </v-btn>
         
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
const emit = defineEmits(["emitValue"]);
</script>