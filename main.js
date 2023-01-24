const TILE_SIZE = 50;
let mapHeight;
let mapWidth;
let canvas = document.getElementById("gameMap");
let canvasContext = canvas.getContext("2d");
let imgBen = new Image(); imgBen.src = "assets/images/ben.png";
let imgLean = new Image(); imgLean.src = "assets/images/lean.png";
let mapArray;
let isMapGenerated = false;

let playerScore = 0;
let playerX = 0;
let playerY = 0;

function init() {
    mapHeight = document.getElementById("map_height").value;
    mapWidth = document.getElementById("map_width").value;
    
    mapArray = new Array(mapHeight);
    for (let i=0; i<mapWidth; i++) {
        mapArray[i] = new Array(mapWidth);
    }
}

function resizeCanvas() {
    document.getElementById("gameMap").setAttribute("height", mapHeight * TILE_SIZE);
    document.getElementById("gameMap").setAttribute("width", mapWidth * TILE_SIZE);
}

function clearCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMap() {
    clearCanvas();
    canvasContext.drawImage(imgBen, playerX * TILE_SIZE, playerY * TILE_SIZE , TILE_SIZE, TILE_SIZE);
    for(let i = 0; i <mapHeight; i++) {
        for(let j = 0; j <mapWidth; j++) {
            if (mapArray[i][j] == "l") canvasContext.drawImage(imgLean, j * TILE_SIZE, i * TILE_SIZE , TILE_SIZE, TILE_SIZE);
            
            canvasContext.strokeRect(TILE_SIZE*j, TILE_SIZE*i, TILE_SIZE, TILE_SIZE);
        }
    }
    document.getElementById("player_position").innerHTML= "X: " + playerX + "   Y: " + playerY;
}

function spawnRandomLean() {
    let randomX=0, randomY=0;
    do {
        randomX = Math.floor(Math.random() * (mapWidth-1));
    } while (randomX === playerX);
    do {
        randomY = Math.floor(Math.random() * (mapHeight-1));
    } while(randomY === playerY);
    mapArray[randomY][randomX] = "l";
}

document.getElementById("generateButton").onclick = function(){
    
    if (isMapGenerated) {
        playerX = 0;
        playerY = 0;
        playerScore = 0;
        
    }
    if (!document.getElementById("player_name").value) 
        {
            document.getElementById("player_position").innerHTML = "Name cannot be null!";
            return;
        }
    
    init();
    resizeCanvas();
    drawMap();
    isMapGenerated = true;
    spawnRandomLean();
}

document.onkeydown = function(e) {
    
    if (!isMapGenerated) return; 
	if (e.key.toLowerCase() == "w" && playerY > 0 && ) playerY--;
    else if (e.key.toLowerCase() == "a" && playerX > 0) playerX--;
    else if (e.key.toLowerCase() == "s" && playerY < mapHeight-1) playerY++;
    else if (e.key.toLowerCase() == "d" && playerX < mapWidth -1) playerX++;
    else return;
    
    drawMap();
    
}