var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg, bgImage;
var zombie, zombieImage;
var brokencar, brokenImage;
var ground, groundImage, invisibleground;

var score = 0;

var gameOver, restart;

function preload(){
    bgImage = loadImage("background_image.jpg");
    zombieImage = loadImage("single zombie cartoon (1).png");
    brokencarImage = loadImage("broken car.png");
    groundImage = loadImage("ground2.png");
    gameOverImage = loadImage("groundOver.png");
    restartImage = loadImage("restart.png");
}

function setup(){
    var canvas = createCanvas(600,400);
    bg = createSprite(200,300,600,400);
    bg.addImage(bgImage);
    bg.x = bg.width/2;
    bg.velocityX = -6;
    bg.scale = 2;
    zombie = createSprite(50,320,30,50);
    zombie.addImage(zombieImage);
    zombie.scale = 0.3;
    brokencar = createSprite(150,350,30,50);
    brokencar.addImage(brokencarImage);
    brokencar.scale = 0.5;
    ground = createSprite(200,180,400,20);
    ground.addImage(groundImage);
    ground.x = ground.width/2;
    ground.velocityX = -(6 + 3*score/100);
    invisibleground = createSprite(200,190,400,10);
    invisibleground.visible = false;
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.5;
    gameOver.visible = false;
    restart = createSprite(300,140);
    restart.addImage(restartImage);
    restart.scale = 0.5;
    restart.visible = false;

    score = 0;

}

function draw(){
    if(bg.x<0){
     bg.x = bg.width/2;
     background(225);
     text("score:" + score, 500, 50);

     if(gameState===PLAY){
         score = score + Math.round(getFrameRate()/60);
         ground.velocityX = -(6 + 3*score/100);
         zombie.changeAnimation("running", zombie_running);

         if(keyDown("space") && zombie.y >= 159) {
             zombie.velocityY = -12;
         }
         zombie.velocityY = zombie.velocityY + 0.8;

         if(ground.x < 0){
             ground.x = ground.width/2;
         }
         zombie.collide(invisibleground);
         spawnObstacles();

         if(obstacleGroup.isTouching(zombie)){
             gameState = END;
         }
     }
     else if(gameState ===END){
        gameOver.visible = true;
        restart.visible = true;
        ground.velocityX = 0;
        zombie.velocityY = 0;
        obstaclesGroup.setvelocityXEach(0);
 
        zombie.changeAnimation("collided", trex_collided);
 
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setlifetimeEach(-1);

        if(mousePressedOver(restart)){
            reset();
        }
      
     }

       
    }
    drawSprites();
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup.destroyEach();
    score = 0;
}

function obstacles(){
    if(frameCount % 60 === 0){
        var obstacle = createSprite(600,165,10,40);
        //obstacle.denug = true;
        obstacle.velocityX = -(6 +3*score/100);

        //generate random obstacles
        var rand = Math .round(random(1,6));
        switch(rand){
            case 1: obstacle.addImage(obstacle1);
            break;
            case 2: obstacle.addImage(obstacle2);
            break;
            case 3: obstacle.addImage(obstacle3);
            break;
            case 4: obstacle.addImage(obstacle4);
            break;
            case 5: obstacle.addImage(obstacle5);
            break;
            case 6: obstacle.addImage(obstacle6);
            break;
            default: break;
        }
        //assign scale and lifetime to the obstacle
        obstacle.scale  = 0.5;
        obstacle.lifetime = 300;
        //add each obstacle to the group
        obstaclesGroup.add(obstacle);
    }
}