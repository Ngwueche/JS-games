import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js"
import {update as updateFood, draw as drawFood} from './food.js';
import { outSideGrid } from "./grid.js";

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
let gameOver =  false;

function main(currentTime){
    if (gameOver){
        if (confirm('Press OK to restart the game')){
            window.location = '/'
        }
        return
    }
    window.requestAnimationFrame(main)//get current browser time
    const secondsSinceLastRendered = (currentTime - lastRenderTime) / 1000 //get the time in seconds
    if (secondsSinceLastRendered < 1 / SNAKE_SPEED) return
    lastRenderTime = currentTime;

    update()
    draw()
}
window.requestAnimationFrame(main);

function update(){
    updateSnake();
    updateFood();
    checkDeath();

}

function draw(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);

}

function checkDeath(){
    gameOver = outSideGrid(getSnakeHead()) || snakeIntersection()
}
