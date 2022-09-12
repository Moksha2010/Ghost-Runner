var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

spookySound.loop()
spookySound.volume=0.2
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 50, 50)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = .3

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

}

function draw() {
  background(0);
  if(gameState==="play"){

    if(keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x-5
    }
    
    if(keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x+5
    }

    if(keyDown("space")) {
      ghost.velocityY = -5 
    }
    //add gravity to the ghost
    ghost.velocityY = ghost.velocityY+0.8


    if(ghost.x>width){
      ghost.x=200
    }

    
    if(ghost.x<0){
      ghost.x=200
    }

    spawnDoors()


//is touching 
if(climbersGroup.isTouching(ghost)){
  ghost.velocityY=0
}

if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
  ghost.destroy()
  gameState="end"
}

 
    if (tower.y > 400) {
      tower.y = 300
    }
  drawSprites()

  }



  if(gameState==="end"){
    stroke("yellow")
    fill("green")
    textSize(30)
    text("Game Over",230,230)
  }
  
}





function spawnDoors() {
  if (frameCount % 240 === 0) {
    //create sprites
    var door = createSprite(200, -50)
    var climber = createSprite(200, 10)
    var invisibleBlock = createSprite(200, 15)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 1
    invisibleBlock.debug = true

    //positions of the sprites
    door.x = Math.round(random(120, 400))
    climber.x = door.x
    invisibleBlock.x = climber.x


    //add image to sprites
    door.addImage(doorImg)
    climber.addImage(climberImg)

    //add movement to sprites
    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1

    //add lifetime to sprites
    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800

    //add sprites to the group
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)

ghost.depth=door.depth
ghost.depth +=1



  }
}
