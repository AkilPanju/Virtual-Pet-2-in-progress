var dog, dogImg, happyDog, database, foodS, foodStock;
var feed, addFood;
var fedTime,lastFed;
var FeedPetButton, AddFoodButton;
var foodObj; 

function preload()
{
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  milkImage = loadImage("Milk.png");
}

function setup() 
{
  //creating the database
  database = firebase.database();
  
  //creating the canvas
  createCanvas(500, 500);
  
  //creating the fog sprite
  dog = createSprite(200,200,50,50); 
  
  //making the dog look like a dog
  dog.addImage(dogImg);
  dog.scale = 0.6;
  
  //storing the value under Food in the database in foodStock
  foodStock = database.ref("Food");
  //if the value of Food in the database changes then function readStock will happen
  foodStock.on("value",readStock);
  
  //creating a new food class object
  var foodObj = new Food();
  
  //to make the feed pet button
  FeedPetButton = createButton("Feed The Pet");
  FeedPetButton.position(700,95);
  FeedPetButton.mousePressed(FeedDog);
  
  //to make the add food button
  addFood = createButton("Add Food");
  addFood.position(800.95);
  addFood.mousePressed(addFood)
}


function draw() {  
  
  //setting the background colour
  background(46, 139, 87)
  
  //storing the feed time from the database in "fedTime"
  fedTime = database.ref("FeedTime");
  //if the value of feed time changes in the database then it will store that new value in lastFed
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  //displaying foodObj  
  //foodObj.display();
    

//setting the time format
    if(lastFed>=12){
      text("Last Feed: "+ lastFed%12 + "PM",350,30);
  }else if(lastFed == 0){
      text("Last Feed : 12 AM",350,30);
  }else{
      text("Last Feed : "+lastFed + "AM,350,30");
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data)
  {
    lastFed = data.val();
  });
}
  //add styles here



//storing data.val in foodS
  function readStock(data) {
    foodS = data.val();
  
  }
  
  //
  function writeStock(x)
  {
    if(x<=0){
      x=0;
    }else{
      x=x-1;
    }
    
    
    database.ref('/').update({
      'Food':x
    })
  }
  
  
  
  function FeedDog() {
    dog.addImage(happyDog);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
  
  function addFoodS(){
    foodS++
    database.ref('/').update({
      Food:foodS
    })
  }