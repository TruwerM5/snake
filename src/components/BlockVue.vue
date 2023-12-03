<script setup lang="ts">

import { ref } from 'vue';
import { usePositionStore } from '@/stores/position';

const PositionStore = usePositionStore();

const props = defineProps({
    posX: {
        type: Number,
        required: true,
    },
    posY: {
        type: Number,
        required: true,
    }
});

function defineSnakeBody():Boolean {
    //draw snake on grid
    let body = PositionStore.snakeBody.find(({posX, posY}:any) => {
        return posX == props.posX && posY == props.posY
    });

    //if positions of snake and grid are equal draw snake
    return body ? true : false
}

function defineSnakeHead():Boolean {
    return props.posX === PositionStore.getHead.posX && props.posY === PositionStore.getHead.posY;
}




</script>

<template>
    <div class="block">
        <div v-if="defineSnakeBody()"
        :class="['snake', 
        {'head': defineSnakeHead() }]"></div>
    </div>
</template>

<style lang="sass">
.block
    background-color: #639660
    display: flex
    align-items: center
    justify-content: center
.snake
    width: 100%
    height: 100%
    border-radius: 20%
    background-color: #50bceb
.head
    background: #17c5e8
</style>