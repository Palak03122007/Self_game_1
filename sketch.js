var health=250;
var bgimg,bg;
var ufo,ufo_sprite;
var comet1,comet2,cometsGroup;
var holeImg,holesGroup;
var ship,shipImg,shipsGroup;
var sat,satImg,satGroup;
var earth,earthImg,earthGroup;
var sun,sunImg,sunGroup;
var fuel,fuelImg,fuelGroup;
var gameState="START";
var bar;
var touchSound,dieSound;
var levelSound;

function preload(){
    bgimg = loadImage("bgimg.jpg");
    ufo = loadImage("spaceship.png");
    comet1 = loadImage("comet1.png");
    comet2 = loadImage("comet2.png");
    holeImg = loadImage("hole.png");
    holeImg2 = loadImage("hole2.png");
    holeImg3 = loadImage("hole3.png");
    shipImg = loadImage("ufoimg.png");
    satImg = loadImage("saturn.png");
    earthImg = loadImage("earth.png");
    sunImg = loadImage("sun.png");
    fuelImg = loadImage("fuel.png");

    touchSound = loadSound("jump.mp3");
    dieSound = loadSound("die.mp3");
    levelSound = loadSound("checkPoint.mp3");
}

function setup(){

    createCanvas(displayWidth,displayHeight/1.5);

    bg = createSprite(displayWidth/2,10,displayWidth,displayHeight);
    bg.addImage(bgimg);
    bg.velocityY = 5;
    bg.scale = 1.5

    ufo_sprite = createSprite(displayWidth/2,displayHeight/1.6);
    ufo_sprite.addImage(ufo);
    ufo_sprite.scale = 0.4;

    bar = createSprite(displayWidth/2,displayHeight*50,displayWidth,1);

    cometsGroup = createGroup();
    holesGroup = createGroup();
    shipsGroup = createGroup();
    satGroup = createGroup();
    earthGroup = createGroup();
    sunGroup = createGroup();
    fuelGroup = createGroup();
}

function draw(){


    if(gameState === "START"){
        fill(229,88,0);
        textSize(25);
        text("Reach to the Sun!",displayWidth/2.4,displayHeight/3.2);
        text("Press Space to Serve",displayWidth/2.45,displayHeight/3);
    }

    if(keyDown(32)){
        gameState = "PLAY";
    }

    if(gameState === "PLAY"){

        

    spawnComets();

    if(bg.y>540){
        bg.y = 0;
    }

    spawnFuel();
        
    drawSprites();

    if(cometsGroup.isTouching(bar)){
        cometsGroup.setVelocityYEach(0);
        cometsGroup.setVisibleEach(false);
        createSat();
    }
    else{
        if(cometsGroup.isTouching(ufo_sprite)){
            health = health - 1;
            touchSound.play();
        }
    }

    fill("white");
    textSize(25);
    text("Level 1",displayWidth/100,displayHeight/1.555);

    if(satGroup.isTouching(ufo_sprite)){
        fill("white");
        textSize(25);
        text("Level 2",displayWidth/100,displayHeight/1.6);
        satGroup.setVelocityYEach(0);
        satGroup.setScaleEach(5);
        satGroup.setVisibleEach(false);
        spawnHoles();
    }
    if(holesGroup.isTouching(bar)){
        holesGroup.setVelocityYEach(0);
        holesGroup.setVisibleEach(false);
        createEarth();
    }
    else{
        if(holesGroup.isTouching(ufo_sprite)){
            health = health - 1;
            touchSound.play();
        }
    }
    if(earthGroup.isTouching(ufo_sprite)){
        fill("white");
        textSize(25);
        text("Level 3",displayWidth/100,displayHeight/1.65);
        earthGroup.setVelocityYEach(0);
        earthGroup.setScaleEach(5);
        earthGroup.setVisibleEach(false);
        spawnShips();
    }
    if(shipsGroup.isTouching(bar)){
        shipsGroup.setVelocityYEach(0);
        shipsGroup.setVisibleEach(false);
        createSun();
    }
    else{
        if(shipsGroup.isTouching(ufo_sprite)){
            health = health - 1;
            touchSound.play();
        }
    }

    if(fuelGroup.isTouching(ufo_sprite)){
        health = health + 1;
    }
    if(sunGroup.isTouching(ufo_sprite)){
        fill("white");
        textSize(100);
        text("You won!",displayWidth/2.09,displayHeight/3);
        sunGroup.setVelocityYEach(0);
        fuelGroup.setVelocityYEach(0);
        bg.velocityY = 0;
    }
    else{
        if(keyDown(UP_ARROW)&&ufo_sprite.y>30){
            ufo_sprite.y = ufo_sprite.y - 8;
        }
        if(keyDown(DOWN_ARROW)&&ufo_sprite.y<displayHeight/1.57){
            ufo_sprite.y = ufo_sprite.y + 8;
        }
        if(keyDown(LEFT_ARROW)&&ufo_sprite.x>70){
            ufo_sprite.x = ufo_sprite.x - 8;
        }
        if(keyDown(RIGHT_ARROW)&&ufo_sprite.x<displayWidth/1.04){
            ufo_sprite.x = ufo_sprite.x + 8;
        }
    }

    if(health===0){
        fill("white");
        textSize(100);
        text("You lose!",displayWidth/2.09,displayHeight/3);
        dieSound.play();
        sunGroup.setVelocityYEach(0);
        marsGroup.setVelocityYEach(0);
        earthGroup.setVelocityYEach(0);
        cometsGroup.setVelocityYEach(0);
        holesGroup.setVelocityYEach(0);
        shipsGroup.setVelocityYEach(0);
        satGroup.setVelocityYEach(0);
        fuelGroup.setVelocityYEach(0);

        bg.velocityY = 0;
    }

    fill("white");
    textSize(20);
    text("Health: "+health,displayWidth/100,displayHeight/30);
}
}

function spawnComets(){
    if(frameCount%6===0){
        var com1 = createSprite(random(displayWidth/100,displayWidth),displayHeight/1000);
        com1.velocityY = 20;
        
         //generate random obstacles
         var rand = Math.round(random(1,2));
         switch(rand) {
           case 1: com1.addImage(comet1);
                   break;
           case 2: com1.addImage(comet2);
                   break;
           default: break;
         }
        
         //assign scale and lifetime to the obstacle           
         com1.scale = 0.09;
    
        console.log(com1.y);
          //add each obstacle to the group
         cometsGroup.add(com1);

         if(com1.y === 300){
             cometsGroup.destroyEach();
         }
}
}

function spawnHoles(){
    if(frameCount%6===0){
        var hole = createSprite(random(displayWidth/100,displayWidth),displayHeight/200);
        hole.velocityY = 25;
        
        var ran = Math.round(random(1,3));
         switch(ran) {
           case 1: hole.addImage(holeImg);
           hole.scale = 0.1;
                   break;
           case 2: hole.addImage(holeImg2);
           hole.scale = 0.25;
                   break;
           case 3: hole.addImage(holeImg3);
           hole.scale = 0.25;
                   break;
           default: break;
         }
          //add each obstacle to the group
         holesGroup.add(hole);
}
}

function spawnShips(){
    if(frameCount%8===0){
    ship = createSprite(random(displayWidth/100,displayWidth),displayHeight/200);
    ship.velocityY = Math.round(random(20,28));
    ship.scale = 0.06;
    ship.addImage(shipImg);
    shipsGroup.add(ship);
    }
}

function createSat(){
    if(frameCount%500===0){
    sat = createSprite(displayWidth/2,displayHeight/500);
    sat.velocityY = 6;
    sat.scale = 1;
    sat.addImage(satImg);
    satGroup.add(sat);
    }
}

function createEarth(){
    if(frameCount%500===0){
    earth = createSprite(displayWidth/2,displayHeight/500);
    earth.velocityY = 6;
    earth.scale = 0.4;
    earth.addImage(earthImg);
    earthGroup.add(earth);
    }
}

function createSun(){
    if(frameCount%500===0){
    sun = createSprite(displayWidth/2,displayHeight/500);
    sun.velocityY = 4;
    sun.scale = 0.8;
    sun.addImage(sunImg);
    sunGroup.add(sun);
    }
}

function spawnFuel(){
    if(frameCount%600===0){
    fuel = createSprite(random(displayWidth/100,displayWidth),displayHeight/200);
    fuel.velocityY = 7;
    fuel.scale = 0.07;
    fuel.addImage(fuelImg);
    fuel.lifetime = 300;
    fuelGroup.add(fuel);
    }
}