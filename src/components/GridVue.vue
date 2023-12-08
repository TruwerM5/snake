<script setup lang="ts">

import BlockVue from './BlockVue.vue';
import { useSnakeStore } from '@/stores/snakeStore';


const PositionStore = useSnakeStore();

PositionStore.startGame();
PositionStore.handlers();

</script>

<template>
<div class="grid-wrapper">
    <div class="grid">
    <BlockVue 
    v-for="p,i in PositionStore.positions" :key="i" :pos-x="p.posX" :pos-y="p.posY" :index="i">
        <template #mouse v-if="PositionStore.mouseX === p.posX && PositionStore.mouseY === p.posY">
            <img src="/apple-icon.png" alt="Apple" class="apple-icon">
        </template>
    </BlockVue>
</div>
</div>


</template>

<style lang="sass" scoped>
.grid
    max-width: 300px
    height: 300px
    margin: 30px auto
    display: grid
    grid-template-columns: repeat(10, minmax(35px, 1fr))
    grid-template-rows: repeat(10, minmax(35px, 1fr))
    grid-auto-columns: auto
    place-content: center

@media screen and (min-width: 1024px)
    .grid
        max-width: 600px
        height: 600px
</style>