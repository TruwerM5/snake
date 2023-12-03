<script setup lang="ts">
import GridVue from './components/GridVue.vue';
import { usePositionStore } from './stores/position';

const PositionStore = usePositionStore();

//draw grid
PositionStore.createPositions();

</script>

<template>
  <GridVue/>
</template>

<style scoped>


</style>
