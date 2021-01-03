var mario, marioImg, backgroundImg, ground, groundImg;
var obstacle, obstacleImg;
var cloud, cloudImg;
var obstacleGroup, cloudGroup, coinsGroup;

var coin, coinImg;
var sun, sunImg;
var restart, restartImg;
var gameOver, gameOverImg;

var score = 0;
var coins = 0;

var PLAY = 0;
var PLAY1 = 1;
var PLAY2 = 2;
var PLAY3 = 3;
var END = 4;

var gameState = PLAY




function preload() {
    backgroundImg = loadImage("Images/download (1).jfif")
    marioImg = loadAnimation("Images/mario1.png", "Images/mario2.png", "Images/mario3.png", "Images/mario4.png", "Images/mario5.png", "Images/mario6.png")
    groundImg = loadImage("Images/ground.jfif")
    obstacleImg = loadImage("Images/rObstacle.png")
    cloudImg = loadImage("Images/rCloud.png")
    coinImg = loadImage("Images/rCoin.png")
    sunImg = loadImage("Images/rSun.png")
    restartImg = loadImage("Images/icon.png")
    gameOverImg = loadImage("Images/download.png")

}


function setup() {

    createCanvas(900, 700)
    mario = createSprite(100, 450, 10, 10)
    mario.addAnimation("running", marioImg)
    mario.scale = 0.4;

    ground = createSprite(650, 610)
    ground.addImage(groundImg)
    ground.scale = 4.3

    sun = createSprite(width - 50, 40)
    sun.addImage(sunImg);
    sun.scale = 0.4

    
    
    

    obstacleGroup = new Group();
    cloudGroup = new Group();
    coinsGroup = new Group();


}

function draw() {
    
        background(backgroundImg)
       

    if (gameState === PLAY) {

        if (coinsGroup.isTouching(mario)) {
            coinsGroup.destroyXEach();
            console.log("parth")
        }


        spawnObstace();
        spawClouds();
        spawCoins();


 gameOver = createSprite(width/2,height/2);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 4;
    gameOver.visible = false;

    restart = createSprite(width / 2, height / 2+150)
    restart.addImage(restartImg)
    restart.scale=0.2;
    restart.visible = false;


        if (keyDown("space") && mario.y > 440) {
            mario.velocityY = -13
        }

        mario.velocityY = mario.velocityY + 0.6
        mario.collide(ground)

        ground.velocityX = -5
        
        if (ground.x < 300) {
            ground.x = 450
        }
        
        score = score +0.1


        if (obstacleGroup.isTouching(mario)) {
            gameState = END;
        }


    } else if (gameState === END) {

        

        
        sun.visible = false;

        mario.velocityY = 0
        ground.velocityX = 0
        obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        coinsGroup.setVelocityXEach(0);

        obstacleGroup.setLifetimeEach(-1)
        cloudGroup.setLifetimeEach(-1)
        coinsGroup.setLifetimeEach(-1)

       

        // background(gameOverImg)

        gameOver.visible = true;
        restart.visible = true;

        if (mousePressedOver(restart)){
            reset();
        }

    }





    drawSprites();
    textSize(30)
    fill("yellow")
    text("SURVIVAL: "+Math.round(score),50,50);
    text("COINS: "+coins,50,100);


}


function spawnObstace() {
    if (frameCount % 100 === 0) {
        obstacle = createSprite(900, 470)
        obstacle.addImage(obstacleImg)
        obstacle.scale = 0.4
        obstacle.velocityX = -5
        obstacle.lifeTime = 180
        obstacleGroup.add(obstacle)
    }
}

function spawClouds() {
    if (frameCount % 60 === 0) {
        cloud = createSprite(900, random(30, 200))
        cloud.addImage(cloudImg)
        cloud.scale = 0.4
        cloud.velocityX = -5
        cloud.lifeTime = 180
        cloudGroup.add(cloud)
    }
}

function spawCoins() {
    if (frameCount % 60 === 0) {
        coin = createSprite(900, random(430, 470))
        coin.addImage(coinImg)
        coin.scale = 0.2
        coin.velocityX = -5
        coin.lifeTime = 180
        coinsGroup.add(cloud)
    }
}

function reset(){
    gameState = PLAY;
    score = 0;
    coins = 0;
    coinsGroup.destroyEach();
    cloudGroup.destroyEach();
    obstacleGroup.destroyEach();
    // mario.destroy();
    gameOver.visible = false;
    restart.visible = false;
}