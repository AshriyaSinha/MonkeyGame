var PLAY = 7;
var END = 6;

var gameState = PLAY;

var bananna; var background

function preload(){

  monkey = loadImage ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png","Monkey_04.png", "Monkey_05.png", "Monkey_06.png");
  
  background = loadImage ("jungle,jpg");
  
  stoney = loadImage ("stone.png");
  
  bananna = loadImage ("bananna.png");
  
}

function setup() {
  createCanvas(400, 400);
  
//Drawing monkey
  var monkey = createSprite(75,295,25,25);
  monkey.setAnimation("monkey");
  monkey.scale = 0.15;

//create a ground sprite
  var ground = createSprite(200,350,800,25);
  ground.velocityX = -4;
  ground.x = ground.width/2;

//invisible Ground to support Trex
  var invisibleGround = createSprite(200,385,400,5);
  invisibleGround.visible = false;

//Survial time 1
  var survivalTime = 0;

//Creating groups  
  var ston = createGroup();
  var bana = createGroup();

  
}

function draw() {
  background(220);
  background(255);
  drawSprites();
  
if(gameState == PLAY){
    
  //Jumping Monkey
    if(keyDown("space") && monkey.y>290){
      monkey.velocityY = -15;
    }
      
    monkey.velocityY = monkey.velocityY + 1;
      
  //Moving Ground
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
      
  //Obstacles and Bla
    stone();
    bananna();
      
  //Survival time 2
    survivalTime = Math.ceil(World.frameCount/5);
    switch(survivalTime){
      case 10 : 
          monkey.scale=0.12;
          break;
      case 20 : 
          monkey.scale=0.14;
          break;
      case 30 : 
          monkey.scale=0.16;
          break;
      case 40 : 
          monkey.scale=0.18;
           break;
      default : 
          break;
    }
      
    if(ston.isTouching(monkey)){
        gameState = END;
      }
      
  }
      
  if (gameState == END){
    monkey.velocityY = 0;
    ground.velocityX = 0;
    ston.setVelocityXEach(0); 
    bana.setVelocityXEach(0);
    
    ston.setLifetimeEach(-6);
    bana.setLifetimeEach(-6);
    
    monkey.scale = 0.1;
  }
  
//Survival time 3 
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:" + survivalTime, 100,50);
  
monkey.collide(ground);
}

//Stone
  function stone() {
    if(World.frameCount % 100 ==0){
    var stony = createSprite(300,310,25,25);
    stony.setAnimation("Stone");
    stony.scale = 0.2;
    stony.velocityX = -4;
    stony.lifetime = 60;
    ston.add(stony);
    }
  }

//Bananna
  function bananna(){
    if(World.frameCount % 100 ==0){
      var ban = createSprite(300,200,25,25);
      ban.setAnimation("Banana");
      ban.scale = 0.1;
      ban.y = randomNumber(120,200);
      ban.lifetime = 60;
      ban.velocityX = -4;
      bana.add(ban);
        }
}







