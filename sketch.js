var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedIt;

var foodObj;

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
    sadDog=loadImage("Dog.png");
    happyDog=loadImage("happy dog.png");
}

function setup() {

  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);

  feedIt=createButton("Feed");
  feedIt.position(900,95);

  foodObj.getFedTime();
 
}

function draw() {
  background(46,139,87);
  foodObj.display();

  addFood.mousePressed(addFoods);
  feedIt.mousePressed(feed);

  //write code to read fedtime value from the database 

  fill("purple");
  textSize("15")
  if (lastFed>=12){
    text("Last Fed:"+lastFed%12+"PM",350,30)

  }else if(lastFed==0){
    text("Last Fed:12 AM",350,30)
  }else{
    text("Last Fed:"+lastFed+"AM",350,30)

  }
 
  drawSprites();
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feed(){
  if(foodS>0){ 
  foodS--;
  lastFed=hour();
  database.ref('/').update({
    Food:foodS,
    FeedTime:lastFed
   
  })}
}

function readStock(data){
  foodS=data.val();
  foodObj.foodStock=foodS;
}
