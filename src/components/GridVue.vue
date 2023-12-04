<script setup lang="ts">

import BlockVue from './BlockVue.vue';
import { usePositionStore } from '@/stores/position';
import { watch,ref } from 'vue';

const PositionStore = usePositionStore();

PositionStore.startGame();
PositionStore.handlers();

</script>

<template>
<h1>{{ PositionStore.getScore }}</h1>
<div class="grid">
    <BlockVue 
    v-for="p,i in PositionStore.positions" :key="i" :pos-x="p.posX" :pos-y="p.posY" :index="i">
        <template #mouse v-if="PositionStore.mouseX === p.posX && PositionStore.mouseY === p.posY">
            <div class="mouse"></div>
        </template>
    </BlockVue>
</div>

</template>

<style lang="sass" scoped>
.grid
    max-width: 800px
    margin: 15px auto 15px
    display: grid
    grid-template-columns: repeat(10, 60px)
    grid-template-rows: repeat(10, 60px)
    
</style>