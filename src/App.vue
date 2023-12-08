<script setup lang="ts">
import GridVue from './components/GridVue.vue';
import ScoreVue from './components/ScoreVue.vue';
import KeyboardVue from './components/KeyboardVue.vue';

import { useSnakeStore } from './stores/snakeStore';

const PositionStore = useSnakeStore();

//draw grid
PositionStore.createPositions();

</script>

<template>
  <GridVue/>
  <ScoreVue />
  <KeyboardVue class="keyboard" />

</template>

<style scoped lang="sass">

@media screen and (min-width: 1024px)
    .keyboard
        display: none
</style>
