import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue';

interface Position {
    posX: number | never;
    posY: number | never;
}

export const usePositionStore = defineStore('positions', {
    state: () => {
        return {
            direction: <string>('right'),
            positions: <any>[],
            startPosX: 1|2|3|4|5|6|7|8|9|10,
            startPosY: 1|2|3|4|5|6|7|8|9|10,
            mouseX: <number>(0),
            mouseY: <number>(0),
            snakeBody: <any>[],
            timeoutId: <number>(0),
            isMoving: <boolean>(false),
        }
    },
    getters: {
        getScore: (state) => {
            return state.snakeBody.length - 1;
        },
        getHead: (state) => {
            let { posX, posY } = state.snakeBody[0];
            return { posX, posY };
        }
    },
    actions: {
        // crating positions
        createPositions() { 
            for (let y = 10; y > 0; y--) {
                for (let x = 1; x < 11; x++) {
                    this.positions.push({posX: x, posY: y})
                }
            }
        },
        getRandomPositons(): number[] {
            // get random positions x and y for snake and mouse
            let randPosX = Math.floor(1 + Math.random() * (10 + 1 - 1));
            let randPosY = Math.floor(1 + Math.random() * (10 + 1 - 1));
            return [randPosX, randPosY];
        },
        setPositions() {
            // set start positions x and y for snake's head
            let [x, y] = this.getRandomPositons();
            this.startPosX = x;
            this.startPosY = y;
            this.snakeBody.push({posX: this.startPosX, posY: this.startPosY});
        },

        move() {
            // moving snake (change posX and posY)
                
                if (this.direction == 'right') {
                    this.startPosX++;
                } else if (this.direction == 'left') {
                    this.startPosX--;
                } else if (this.direction == 'top') {
                    this.startPosY++;
                } else if (this.direction == 'bottom') {
                    this.startPosY--;
                }
                
                
                if (this.startPosX > 10) {
                    this.startPosX = 1;
                }
                if (this.startPosX < 1) {
                    this.startPosX = 10;
                }
                
                if (this.startPosY > 10) {
                    this.startPosY = 1;
                }

                if (this.startPosY < 1) {
                    this.startPosY = 10;
                }


                //add new element to snake body
                this.snakeBody.unshift({posX: this.startPosX, 
                                        posY: this.startPosY, 
                                        direction: this.direction});

                //remove first element of snake body
                this.snakeBody.pop();
                
                

                // if positions of snake and mouse are equal
                this.snakeEatsMouse();


                this.ifSnakeBitesSelf();

                if(this.snakeBody.length >= 99) {
                    this.gameOver();
                }
                
        },
        createMouse() {
            //create random positions for mouse
            let [x, y] = this.getRandomPositons();
            let isMouseInSnakeBody = this.snakeBody.find((item:any) => {
                return item.posX === x && item.posY === y ? true : false;
            })
            
            //if mouse appears in snake body
            while (isMouseInSnakeBody && this.getScore < 100) {
                [x, y] = this.getRandomPositons();
                
                isMouseInSnakeBody = this.snakeBody.find((item:any) => {
                    return item.posX === x && item.posY === y ? true : false;
                });
            }
            this.mouseX = x;
            this.mouseY = y;
        },
        startGame() {
            this.setPositions();
            this.createMouse();
            this.timeoutId = setInterval(this.move, 700);
        
        },
        handlers() {
            //handlers for keyboard
            window.addEventListener('keydown', (e) => {
                let arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

                let arrowKey = arrows.find(item => item === e.code);

                if (arrowKey) {
                    
                    if ((e.code == 'ArrowRight' && this.direction == 'right') ||
                        (e.code == 'ArrowLeft' && this.direction == 'left') ||
                        (e.code == 'ArrowUp' && this.direction == 'top') ||
                        (e.code == 'ArrowDown' && this.direction == 'bottom')) {

                        return;
                    } 

                    
                    if (e.code == 'ArrowLeft' && this.direction != 'right') {
                        this.direction = 'left';
                        
                        
                    } else if (e.code == 'ArrowRight' && this.direction != 'left') {
                        this.direction = 'right';
                       
                    } else if (e.code == 'ArrowDown' && this.direction != 'top') {
                        this.direction = 'bottom';
                       
                    } else if (e.code == 'ArrowUp' && this.direction != 'bottom') {
                        this.direction = 'top';
                       
                    } 
                    
                    if ((e.code == 'ArrowRight' && this.direction == 'left') ||
                        (e.code == 'ArrowLeft' && this.direction == 'right') ||
                        (e.code == 'ArrowBottom' && this.direction == 'top') ||
                        (e.code == 'ArrowUp' && this.direction == 'bottom')) {
                        return;
                    }
                    
                        clearInterval(this.timeoutId);
                        this.move();
                        clearInterval(this.timeoutId);
                        
                        this.timeoutId = setInterval(this.move, 700);
                    
                }

                
            });
        },
        snakeEatsMouse() {
            let snakeHead = this.snakeBody[0];
            let snakeTail = this.snakeBody[this.snakeBody.length - 1];
            
            
            if (snakeHead.posX === this.mouseX && snakeHead.posY === this.mouseY) {
                
                this.snakeBody.push({posX: snakeTail.posX, posY: snakeTail.posY});
                
                this.createMouse();
            }
        },
        ifSnakeBitesSelf() {
            //check if snake bites self
            let head = this.getHead;
            for(let i = 1; i < this.snakeBody.length; i++) {
                if (head.posX === this.snakeBody[i].posX && 
                    head.posY === this.snakeBody[i].posY &&
                    this.snakeBody.length > 2) {
                    clearInterval(this.timeoutId);
                    this.gameOver();
                }
            }
        },
        gameOver() {
            //stop game
            
            
            clearInterval(this.timeoutId);
            for(let i = 0; i < 9999; i++) {
                window.clearInterval(i);
            }
            this.$reset();
            this.createPositions();
            this.startGame();
        }
        
    }
})