var database, game;
var car1Img, car2Img;
var car1, car2, raceTrack, cars;
var cone, barrior, obstacles, obstaclesGroup;
var playerCount, allPlayers, form, player;
var gameState = 0;
var car1position, car2position;

function preload(){
 car1Img = loadImage("images/car2.png");
 car2Img = loadImage("images/car3.png");
 raceTrack = loadImage("images/track.png");
 cone = loadImage("images/coneImg.png");
 barrior = loadImage("images/barriorImg.png");
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState()
  game.start()
  obstaclesGroup = new Group();
}

function draw() {

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  

}

