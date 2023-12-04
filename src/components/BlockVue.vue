<script setup lang="ts">

import { ref, reactive } from 'vue';
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
    },
    index: {
        type: Number,
        required: true
    }
});


const rotationStyles = reactive({
    transform: 'rotate(0deg)'
})

function defineSnakeBody() {
    //draw snake on grid
    let body = PositionStore.snakeBody.find(({posX, posY}:any) => {
        return posX == props.posX && posY == props.posY
    });
    if(body && body.direction) {
        if (body.direction == 'left' || body.direction == 'right') {
            rotationStyles.transform = 'rotate(0)';
        } else {
            rotationStyles.transform = 'rotate(90deg)';
        }
    }
    //if positions of snake and grid are equal draw snake
    return body;
}

function defineSnakeHead():Boolean {
    //if positions of head and block are equal draw head
    return props.posX === PositionStore.getHead.posX && props.posY === PositionStore.getHead.posY;
}



function getHeadRotation() {
    switch(PositionStore.direction) {
        case ('top'):
            return 0;
        break;
        case ('bottom'):
            return 180;
        break;
        case ('left'):
            return -90;
        break;
        case ('right'):
            return 90;
        break;
    }
}


</script>

<template>
    <div class="block">
        <template v-if="defineSnakeBody()">
            <div v-if="defineSnakeHead()"
            class="head" :style="{transform: `rotate(${getHeadRotation()}deg)`}">
                <div class="eye eye_left"></div>
                <div class="eye eye_right"></div>
            </div>
            <div v-else class="snake" :style="rotationStyles"></div>
        </template>
        <slot name="mouse">

        </slot>

            
    </div>
</template>

<style lang="sass" scoped>
.block
    position: relative
    display: flex
    align-items: center
    justify-content: center
    background-color: #639660
.snake
    width: 100%
    height: 80%
    border-radius: 35%
    background-color: #17c5e8
.head
    position: absolute
    left: 0
    top: 0
    right: 0
    width: 100%
    transform: translate(-50%, -50%)
    height: 100%
    border-radius: 40%
    background: #17c5e8
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 93% 100%, 7% 100%, 0% 50%)
.eye
    position: absolute
    width: 10px
    height: 10px
    border-radius: 50%
    background-color: #000
    z-index: 10
    
    top: 50%
    transform: translateY(-50%)
    &_left
        left: 10px
    &_right
        right: 10px
</style>