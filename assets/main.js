const TILE_SIZE = 50;
let mapSize;
let canvas = document.getElementById("gameMap");
let canvasContext = canvas.getContext("2d");
let imgBen = new Image(); imgBen.src = "assets/images/ben.png";
let imgLean = new Image(); imgLean.src = "assets/images/lean.png";
let mapArray;
let isMapGenerated = false;

let playerName;
let playerScore = 0;
let playerX = 0;
let playerY = 0;

function init() {
    mapSize = document.getElementById("map_size").value;
    playerName = document.getElementById("player_name").value;
    
    mapArray = new Array(mapSize);
    for (let i=0; i<mapSize; i++) {
        mapArray[i] = new Array(mapSize);
    }
}

function resizeCanvas() {
    document.getElementById("gameMap").setAttribute("height", mapSize * TILE_SIZE);
    document.getElementById("gameMap").setAttribute("width", mapSize * TILE_SIZE);
}

function clearCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMap() {
    clearCanvas();
    canvasContext.drawImage(imgBen, playerX * TILE_SIZE, playerY * TILE_SIZE , TILE_SIZE, TILE_SIZE);
    for(let i = 0; i <mapSize; i++) {
        for(let j = 0; j <mapSize; j++) {
            if (mapArray[i][j] == "l") canvasContext.drawImage(imgLean, j * TILE_SIZE, i * TILE_SIZE , TILE_SIZE, TILE_SIZE);
            canvasContext.strokeRect(TILE_SIZE*j, TILE_SIZE*i, TILE_SIZE, TILE_SIZE);
        }
    }
    document.getElementById("player_position").innerHTML= "X: " + playerX + "   Y: " + playerY;
    document.getElementById("player_score").innerHTML= playerName + "\' score: " + playerScore;
}

function spawnRandomLean() {
    let randomX=0, randomY=0;
    do {
        randomX = Math.floor(Math.random() * (mapSize-1));
    } while (randomX === playerX);
    do {
        randomY = Math.floor(Math.random() * (mapSize-1));
    } while(randomY === playerY);
    mapArray[randomY][randomX] = "l";
}

document.getElementById("generateButton").onclick = function(){
    
    if (isMapGenerated) {
        playerX = 0;
        playerY = 0;
        playerScore = 0;
        
    }
    
    if (!document.getElementById("player_name").value) {
            document.getElementById("player_position").innerHTML = "Name cannot be null!";
            return;
    }
    
    init();
    resizeCanvas();
    spawnRandomLean();
    drawMap();
    isMapGenerated = true;
}

document.onkeydown = function(e) {
    
    if (!isMapGenerated) return;
	if (e.key.toLowerCase() == "w" && playerY > 0 && mapArray[playerY-1][playerX] !== "l") playerY--;
    else if (e.key.toLowerCase() == "a" && playerX > 0 && mapArray[playerY][playerX-1] !== "l") playerX--;
    else if (e.key.toLowerCase() == "s" && playerY < mapSize-1 && mapArray[playerY+1][playerX] !== "l") playerY++;
    else if (e.key.toLowerCase() == "d" && playerX < mapSize -1 && mapArray[playerY][playerX+1] !== "l") playerX++;
    else return;
    
    drawMap();
}

canvas.onclick = function(e) {
    let rect = canvas.getBoundingClientRect()
    let clickedX = Math.floor((event.clientX - rect.left) / TILE_SIZE);
    let clickedY = Math.floor((event.clientY - rect.top) / TILE_SIZE);
    
    if (mapArray[clickedY][clickedX] !== "l") return;
    if(Math.abs(clickedX - playerX) * Math.abs(clickedY - playerY) !== 0) return;
    
    mapArray[clickedY][clickedX] = " ";
    playerScore++;
    spawnRandomLean();
    drawMap();
    
}