<script setup lang="ts">

import { useSnakeStore } from '@/stores/snakeStore';

const PositionStore = useSnakeStore();

</script>

<template>
    <div class="keyboard">
        <button @click="PositionStore.handleButtonClick('left')" 
        class="keyboard__button button button_left">
            <img src="/arrow-left.png" alt="Arrow Left">
        </button>
        <button @click="PositionStore.handleButtonClick('up')" 
        class="keyboard__button button button_up">
            <img src="/arrow-up.png" alt="">
        </button>
        <button @click="PositionStore.handleButtonClick('down')" 
        class="keyboard__button button button_down">
            <img src="/arrow-down.png" alt="">
        </button>
        <button @click="PositionStore.handleButtonClick('right')" 
        class="keyboard__button button button_right">
            <img src="/arrow-right.png" alt="">
        </button>
    </div>
</template>

<style scoped lang="sass">
.keyboard
    width: fit-content
    margin: 30px auto
    display: grid
    grid-template-columns: repeat(3, 100px)
    grid-template-rows: repeat(3, 100px)
    gap: 20px
    
.button
    border: 1px solid #4788C7
    background-color: transparent
    &_up
        grid-column: 2/3
    &_left
        grid-row: 2/3
    &_down
        grid-column: 2/3
        grid-row: 3/4
    &_right
        grid-column: 3/3
        grid-row: 2/3
</style>