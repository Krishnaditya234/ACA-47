   var gameState = "play";
   var score =0;

   function preload(){
    spaceImage= loadImage("images/bgspace.jpg");
    enemyImage= loadImage("images/enemy.png");
    spaceshipImage= loadImage("images/spaceShip.png");
    bulletImage=loadImage("images/firebullet.png");
    bulletSound=loadSound("sounds/shooting.mp3");
    restart=loadImage("images/restart.png")
   }
   
   function setup(){
    createCanvas(1000, 600);
    space = createSprite(width, height);
    space.addImage(spaceImage);  
    space.scale=5
    space.y = space.height/2;
    
    console.log(3*"bob");
    player = createSprite(width/2, height-100);
    player.addImage(spaceshipImage);
    player.scale= 0.5;

    EnemyGroup = new Group();
    BulletGroup = new Group();
    textSize(25);
    fill("yellow")
   }

   function draw() {  
   background("black");   
   if(gameState === "play"){  
    if(keyWentDown("space"))  {
      generateBullets();
      bulletSound.play();
   }

     space.velocityY= 5;
     player.x = World.mouseX;
   
     if (space.y > height) {       
       space.y = space.height/2;
     }
  
     generateEnemy();
     if(EnemyGroup.isTouching(player)){
      gameState = "END";
     }
   }
   else if (gameState === "END") { 
    space.velocityX = 0;
    player.velocityY = 0;  
    player.velocityX = 0; 
    EnemyGroup.setVelocityXEach(0);
    BulletGroup.setVelocityXEach(0);
    EnemyGroup.setLifetimeEach(-1);
    BulletGroup.setLifetimeEach(-1);
    player.y=570;
    restart.visible=true;

if(mousePressedOver(restart)){
  restartGame(); 
 }
  }
   
   for (var i = 0; i < EnemyGroup.length; i++) {
   var temp=EnemyGroup.get(i);
   if(temp.isTouching(BulletGroup)){
     temp.destroy();
     score = score+1;
   }
 }  
 
   for (var i = 0; i < EnemyGroup.length; i++) {
     var temp1=EnemyGroup.get(i);
     if(temp1.y>height+50){
     temp1.destroy();
     score = score-1;
   }
 }  
   
   drawSprites();
     text("Score:  "+score,300,30); 
   }
  
  function generateEnemy() {
   if(World.frameCount%40===0){
     var enemy = createSprite(300,0);
     enemy.addImage(enemyImage);
    enemy.x = random(20,width-20);
     enemy.velocityY = 5;
     enemy.scale = 0.5;
     enemy.lifetime = 300;
     EnemyGroup.add(enemy);
   }
 }
 
 function generateBullets() {
   var bullet = createSprite(300,380,5,10);
   bullet.addImage(bulletImage);
   bullet.scale=0.3;
   bullet.x = player.x;
   bullet.y = player.y; 
   bullet.velocityY = -10;
   bullet.depth = player.depth-1;
   bullet.lifetime = 200;  
   BulletGroup.add(bullet);
   
 }  
 
   
