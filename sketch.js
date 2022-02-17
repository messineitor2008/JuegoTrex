var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

var jumpSound , checkPointSound, dieSound



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  jumpSound = loadSound("jump.mp3")
   dieSound = loadSound("die.mp3") 
   checkPointSound = loadSound("checkPoint.mp3")

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
   var message = "This is a message";
    console.log(message)
     trex = createSprite(50,height-70,20,50);
      trex.addAnimation("running", trex_running); 
      trex.addAnimation("collided", trex_collided);
       trex.scale = 0.5;
        ground = createSprite(width/2,height-80,width,20);
         ground.addImage("ground",groundImage);
          ground.x = ground.width /2;
           gameOver = createSprite(width/2,height/2-5);
            gameOver.addImage(gameOverImg);
             restart = createSprite(width/2,height-250); 
             restart.addImage(restartImg);
              gameOver.scale = 0.5;
               restart.scale = 0.5; 
               invisibleGround = createSprite(width/2,height-10,width,125);
                invisibleGround.visible = false;
                 //create Obstacle and Cloud Groups 
                 obstaclesGroup = createGroup(); 
                 cloudsGroup = createGroup(); 
                 trex.setCollider("rectangle",0,0,trex.width,trex.height);
                  //trex.debug = true score = 0;
                 } 
                 function draw() {
                    background(180);
                   //displaying score 
                   text("Score: "+ score, width/2+400,50);
                   if(gameState === PLAY){ gameOver.visible = false;
                     restart.visible = false; 
                     ground.velocityX = -(4 + 3* score/100)
                      //scoring 
                      score = score + Math.round(frameRate()/60);
                       if(score>0 && score%100 === 0){ checkPointSound.play() } 
                       if (ground.x < 0){ ground.x = ground.width/2;
                       } //jump when the space key is pressed
                        if((touches.lenght>0||keyDown("space"))&& trex.y >=height-120) { trex.velocityY = -12;
                           jumpSound.play();
                            touches=[];
                           } //add gravity 
                           trex.velocityY = trex.velocityY + 0.8 
                           //spawn the clouds 
                           spawnClouds();
                            //spawn obstacles on the ground 
                            spawnObstacles();
                             if(obstaclesGroup.isTouching(trex)){ 
                               trex.velocityY = -12;
                                jumpSound.play();
                                 gameState = END;
                                  dieSound.play() } } 
                                  else if (gameState === END) { gameOver.visible = true;
                                     restart.visible = true; 
                                     //change the trex animation 
                                     trex.changeAnimation("collided", trex_collided);
                                      ground.velocityX = 0;
                                       trex.velocityY = 0
                                        //set lifetime of the game objects so that they are never destroyed 
                                        obstaclesGroup.setLifetimeEach(-1);
                                         cloudsGroup.setLifetimeEach(-1);
                                          obstaclesGroup.setVelocityXEach(0); 
                                          cloudsGroup.setVelocityXEach(0);
                                           if(touches.lenght>0||mousePressedOver(restart)) { reset(); 
                                            touches=[]; 
                                          } } //stop trex from falling down 
                                          trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //escribir código aquí para aparecer nubes.
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+100,height/2-2,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //asignar tiempo de vida a la variable
    cloud.lifetime = 200;
    
    //ajustar la profundidad.
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //agregar cada nube a un grupo.
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generar obstáculos aleatorios
    var rand = Math.round(random(1,6));
    switch(rand) {
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
    
    //asignar tamaño y tiempo de vida al obstáculo.            
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}