<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useSnakeStore } from '@/stores/snakeStore';

const array: number[] = [];
const snakeStore = useSnakeStore();
const overflow = ref(0);


for(let i = 0; i <= 100; i++) {
    array.push(i);
}



</script>

<template>
    <div class="score-wrapper">
        <div class="score">
            <ul class="score__list" :style="{top: snakeStore.getScore * -100 + '%'}">
                <li v-for="item,i in array" :key="i"
                class="score__item" >
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="sass">
.score
    position: relative
    width: 40px
    height: 35px
    overflow: hidden
    margin: 10px auto
    text-align: center
    &__list
        position: absolute
        top: 0
        left: 0
        list-style-type: none
        transition: top .4s
        min-height: 100%
        min-width: 100%
    &__item
        position: relative
        min-height: 35px
        min-width: 40px
        font-size: 30px
</style>