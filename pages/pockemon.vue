<template>
<MapboxMap
      map-id="pk.eyJ1IjoidmloYW5ncCIsImEiOiJjbGl4MGx4YXQwM2d3M3FxZXdkcWExMnhpIn0.q-nh1qUn2qvaKe630T2w2g"
      style="position: absolute; top: 0; bottom: 0; left: 250px; width: 500px;"
      :options="{
        style: 'mapbox://styles/mapbox/light-v11', // style URL
        center: [23.185640, 72.602837], // starting position
        zoom: 5 // starting zoom
      }"


    >
        <MapboxSource 
        source-id="pk.eyJ1IjoidmloYW5ncCIsImEiOiJjbGl4MGx4YXQwM2d3M3FxZXdkcWExMnhpIn0.q-nh1qUn2qvaKe630T2w2g"
        :source="{
          type: 'geojson',
          data: '/test.geojson'
        }"
      />
      <MapboxLayer
        :layer="{
          source: 'pk.eyJ1IjoidmloYW5ncCIsImEiOiJjbGl4MGx4YXQwM2d3M3FxZXdkcWExMnhpIn0.q-nh1qUn2qvaKe630T2w2g',
          id: 'geojson-layer',
          type: 'fill'
        }"
      />
      <MapboxGeolocateControl position="top-left" />
</MapboxMap>


</template>

<script setup>

    onMounted(()=>{
        useMapbox("pk.eyJ1IjoidmloYW5ncCIsImEiOiJjbGl4MGx4YXQwM2d3M3FxZXdkcWExMnhpIn0.q-nh1qUn2qvaKe630T2w2g", (map) => {
        console.log('map: ', map);
      // Do whatever with map here
    })
    })
</script>

<style>

</style>template>