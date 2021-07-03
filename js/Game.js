  class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      car1 = createSprite(150,300);
      car1.addImage(car1Img);
      car1position = database.ref('position1');
      car1position.on("value", readPosition, showError);
      car2 = createSprite(350,350);
      car2.addImage(car2Img);
      car2position = database.ref('position2');
      car2position.on("value", readPosition, showError);
  
      cars = [car1, car2];
    }
  
    play(){
      form.hide();
      spawnObstacles();
      Player.getPlayerInfo();
     
      
      if(allPlayers !== undefined){

        background(rgb(198,135,103));
        image(raceTrack, 0, -displayHeight*4, displayWidth, displayHeight*5);
        
        var index = 0;
  
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          index = index + 1 ;
  
          x = x + 200;
          y = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
         
          if (index === player.index){
            
            fill("green");
            ellipse(x,y,60,60);
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y;

            
            }
          
         
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        writePosition(0, -10);
        player.update();
      }
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        writePosition(-10, 0);
        player.update;
      }
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        writePosition(0, +10)
        player.update;
      }
      function spawnObstacles()
      {
        if(frameCount%80 === 0){
           obstacles = createSprite(Math.round(random(75, 400)), 0);
           obstacles.velocityY = 6;
           obstacles.scale = 0.2;
           var rand = Math.round(random(1, 2));
        if(rand === 1){
           obstacles.addImage(cone)
        }else 
        if(rand === 2){
           obstacles.addImage(barrior)
        }
        obstacles.lifetime = 200;
        obstaclesGroup.add(obstacles);
        }
    }
    if(obstaclesGroup.isTouching(cars[0]) || obstaclesGroup.isTouching(cars[1])){
      gameState = 2;
    }
    function writePosition1(x,y){
       database.ref('position1').set({
         'x': position1.x + x,
         'y': position1.y +y
       })
    }
    function writePosition2(x,y){
      database.ref('position2').set({
        'x': position2.x + x,
        'y': position2.y +y
      })
   }
   function readPosition1(data){
     position1 = data.val();
     cars[0].x = position1.x;
     cars[0].y = position1.y;
   }
   function readPosition2(data){
    position2 = data.val();
    cars[1].x = position2.x;
    cars[1].y = position2.y;
  }
  function showError(){
    console.log("Error in Writing to the Database");
  }
    drawSprites();
     }
   end(){
     text("Game Over", 500, 500);
    }  
  }