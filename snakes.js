// snake.js

var time = 100;
var t = 3;
var snakeMap = [];
var w = 10;
var direction = 37;
var x = 0;
var y = 0;
var foodX = 0;
var foodY = 0;
var score = 0;
var bestScore = 0;
var width = 400;
var height = 400;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

showBestScore();
startGame();

function showBestScore() {
    bestScore = localStorage.getItem("bestScore");
    if (bestScore == null) {
        bestScore = 0;
    }
    var best = document.getElementById("bestScore");
    best.innerHTML = bestScore;
}

function startGame() {
    drawFood();
    x = Math.floor(Math.random() * (width / w)) * w;
    y = Math.floor(Math.random() * (height / w)) * w;
    direction = 37 + Math.floor(Math.random() * 4);
    setInterval(gameRefresh, time);
}

function gameRefresh() {
    snakeMap.push({ 'x': x, 'y': y });
    drawSnake();

    switch (direction) {
        case 37:
            x -= w;
            break;
        case 38:
            y -= w;
            break;
        case 39:
            x += w;
            break;
        case 40:
            y += w;
            break;
    }

    var code = detectCollision();
    if (code != 0) {
        if (score > bestScore) {
            localStorage.setItem("bestScore", score);
        }
        if (code === 1) {
            alert("撞到了墙壁，游戏失败！当前得分：" + score);
        } else if (code === 2) {
            alert("撞到了蛇身，游戏失败！当前得分：" + score);
        }
        restartGame();
    }
    if (foodX === x && foodY === y) {
        score += 10;
        var currentScore = document.getElementById("currentScore");
        currentScore.innerHTML = score;
        drawFood();
        t++;
    }
}

function drawSnake() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(x, y, w, w);

    if (snakeMap.length > t) {
        var lastBox = snakeMap.shift();
        ctx.clearRect(lastBox.x, lastBox.y, w, w);
    }
}

document.onkeydown = function(e) {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        direction = e.keyCode;
    }
};

function detectCollision() {
    if (x >= width || y >= height || x < 0 || y < 0) {
        return 1;
    }

    for (var i = 0; i < snakeMap.length; i++) {
        if (snakeMap[i].x === x && snakeMap[i].y === y) {
            return 2;
        }
    }
    return 0;
}

function drawFood() {
    foodX = Math.floor(Math.random() * (width / w)) * w;
    foodY = Math.floor(Math.random() * (height / w)) * w;
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(foodX, foodY, w, w);
}

function restartGame() {
    snakeMap = [];
    x = 0;
    y = 0;
    score = 0;
    var currentScore = document.getElementById("currentScore");
    currentScore.innerHTML = score;
    ctx.clearRect(0, 0, width, height); // 清除画布上的蛇身
    startGame();
}