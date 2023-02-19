/*

The Game Project

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isJumping;
var isFalling;
var isPlummeting;
var jumpLimit;
let trees_x;
let treePos_y;
let clouds;
let mountains;
let cameraPosX;
let collectables;
let canyons;
let levelWidth,
lifeFullImg;
// objects
const myCamera = {};

function preload(){
	lifeFullImg = loadImage('./images/batteryLifeFull.png');
}

function setup()
{
	createCanvas(windowWidth, 576);
	floorPos_y = height * 3/4;
	gameChar_x = 100;
	gameChar_y = floorPos_y;
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
	isPlummeting = false;
	jumpLimit = floorPos_y - 50;

	// My game character's properties

	// Camera's properies
	myCamera.start = 600;

	// Width of the game level
	levelWidth = 4000;

	// Trees
	trees_x = [ 0, 200, 400, 700, 900 ]
	treePos_y = height/2;

	// Clouds
	clouds = [
		cloud1 = {x_pos: 20, y_pos: 80},
		cloud2 = {x_pos: 300, y_pos: 150},
		cloud3 = {x_pos: 600, y_pos: 130}
	]

	// Mountains
	mountains = [
		// mountain1 = {x_pos: -200, y_pos: floorPos_y},
		// mountain2 = {x_pos: 550, y_pos: floorPos_y},
		// mountain3 = {x_pos: 900, y_pos: floorPos_y}
	]

	// Drawing
	canyons = [
		// {x_pos: 100, width: 80},
		// {x_pos: 300, width: 80},
		// {x_pos: 600, width: 80},
		// {x_pos: 900, width: 80},
		// {x_pos: 1100, width: 80}
	]
	collectables = [
		// {x_pos: 130, y_pos: 370, size: 10, isFound: false},
		// {x_pos: 330, y_pos: 370, size: 10, isFound: false},
		// {x_pos: 430, y_pos: 370, size: 10, isFound: false},
		// {x_pos: 230, y_pos: 370, size: 10, isFound: false},
		// {x_pos: 530, y_pos: 370, size: 10, isFound: false}
	]
	// cameraPosX = 0;
}

function draw()
{
	///////////DRAWING CODE//////////

	// camera test
	// cameraPosX = gameChar_x - 100;

	//fill the sky blue
	background(100,155,255);

	//draw desert ground
	noStroke();
	// First Layer
	fill(182,91,52);
	rect(0, floorPos_y, width, (height-floorPos_y)/3)
	// Second Layer
	fill(111,63,65);
	rect(0, floorPos_y+((height-floorPos_y)/3), width, (height-floorPos_y)/3);
	// Third Layer
	fill(77,44,62);
	rect(0, floorPos_y+2*((height-floorPos_y)/3), width, (height-floorPos_y)/3);



	// push();
	// Camera Control
	// Same as game character between x(600-3400)
	// Fixed when close to edges
	// myCamera.start = start of the camera position (used in translate so that when gameChar passed the camera start, translate others behind gameChar by myCamera.start pixels)
	if(gameChar_x > myCamera.start && gameChar_x < (levelWidth-myCamera.start)){
		translate(-(gameChar_x-myCamera.start), 0);
	}else if(gameChar_x >= (levelWidth-myCamera.start)){
		translate(-(levelWidth-myCamera.start-myCamera.start), 0);
	}

	drawClouds();
	drawMountains();
	drawTrees();
	for(let i = 0; i < canyons.length; i++){
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);	
	}
	for(let i = 0; i < collectables.length; i++){
		drawCollectable(collectables[i]);
		checkCollectable(collectables[i]);	
	}
	// pop();
	image(lifeFullImg, 15, 10);
	// lifeFullImg.resize(120, 0);

	//the game character
	if(isLeft && (isJumping || isFalling))
	{
		// add your jumping-left code
		//Jumping to the left
		//Setup
		noFill();
		stroke(0);
		rectMode(CENTER);
		angleMode(DEGREES);
		//head
		fill(0,255,255);
		rect(gameChar_x, gameChar_y-35, 8, 14, 3)
		//ears
		fill(80,80,80)
		ellipse(gameChar_x, gameChar_y-35, 2, 4)
		//neck
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-27.5, 3, 1)
		//right arm (covered one)
		fill(0,255,255);
		quad(gameChar_x, gameChar_y-20.5, gameChar_x, gameChar_y-25.5, gameChar_x-11, gameChar_y-25.5, gameChar_x-11, gameChar_y-20.5)
		arc(gameChar_x, gameChar_y-23, 5, 5, 0, 360, OPEN)
		arc(gameChar_x-11, gameChar_y-23, 5, 5, 75, 290, OPEN)
		//right leg
		fill(0,255,255);
		quad(gameChar_x, gameChar_y-20.5+12, gameChar_x, gameChar_y-25.5+12, gameChar_x-11, gameChar_y-25.5+12, gameChar_x-11, gameChar_y-20.5+12)
		arc(gameChar_x, gameChar_y-23+12, 5, 5, 0, 360, OPEN)
		arc(gameChar_x-11, gameChar_y-23+12, 5, 5, 75, 290, OPEN)
		//chest
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-20, 11, 14, 2)
		noFill()
		// trouser
		fill(80,80,80)
		quad(gameChar_x-2.5, gameChar_y-13, gameChar_x+2.5, gameChar_y-13, gameChar_x, gameChar_y-10, gameChar_x, gameChar_y-10)
		//left leg
		fill(0,255,255)
		quad(gameChar_x-1.5, gameChar_y-21+12, gameChar_x+1.5, gameChar_y-25+12, gameChar_x+13.5, gameChar_y-21+12, gameChar_x+11, gameChar_y-17+12)
		arc(gameChar_x, gameChar_y-23+12, 5, 5, 75, 310, OPEN)
		arc(gameChar_x+12, gameChar_y-19+12, 5, 5, 270, 125, OPEN)
		noFill();
		//left arm
		fill(0,255,255)
		quad(gameChar_x-1.5, gameChar_y-21, gameChar_x+1.5, gameChar_y-25, gameChar_x+13.5, gameChar_y-21, gameChar_x+11, gameChar_y-17)
		arc(gameChar_x, gameChar_y-23, 5, 5, 75, 310, OPEN)
		arc(gameChar_x+12, gameChar_y-19, 5, 5, 270, 125, OPEN)
		//Refix
		rectMode(CORNER);
	}
	else if(isRight && (isJumping || isFalling))
	{
		// add your jumping-right code
		//Jumping right
		//Setup
		noFill();
		stroke(0);
		rectMode(CENTER);
		angleMode(DEGREES);
		//head
		fill(0,255,255);
		rect(gameChar_x, gameChar_y-35, 8, 14, 3)
		//ears
		fill(80,80,80)
		ellipse(gameChar_x, gameChar_y-35, 2, 4)
		//neck
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-27.5, 3, 1)
		//left arm (covered one)
		fill(0,255,255);
		quad(gameChar_x, gameChar_y-20.5, gameChar_x, gameChar_y-25.5, gameChar_x+11, gameChar_y-25.5, gameChar_x+11, gameChar_y-20.5)
		arc(gameChar_x, gameChar_y-23, 5, 5, 110, 300, OPEN)
		arc(gameChar_x+11, gameChar_y-23, 5, 5, 245, 100, OPEN)
		//left leg
		fill(0,255,255);
		quad(gameChar_x, gameChar_y-20.5+12, gameChar_x, gameChar_y-25.5+12, gameChar_x+11, gameChar_y-25.5+12, gameChar_x+11, gameChar_y-20.5+12)
		arc(gameChar_x, gameChar_y-23+12, 5, 5, 110, 300, OPEN)
		arc(gameChar_x+11, gameChar_y-23+12, 5, 5, 245, 100, OPEN)
		//chest
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-20, 11, 14, 2)
		noFill()
		// trouser
		fill(80,80,80)
		quad(gameChar_x-2.5, gameChar_y-13, gameChar_x+2.5, gameChar_y-13, gameChar_x, gameChar_y-10, gameChar_x, gameChar_y-10)
		//right leg
		fill(0,255,255)
		quad(gameChar_x+1.5, gameChar_y-21+12, gameChar_x-1.5, gameChar_y-25+12, gameChar_x-13.5, gameChar_y-21+12, gameChar_x-11, gameChar_y-17+12)
		arc(gameChar_x, gameChar_y-23+12, 5, 5, 220, 80, OPEN)
		arc(gameChar_x-12, gameChar_y-19+12, 5, 5, 45, 250, OPEN)
		noFill();
		//right arm
		fill(0,255,255)
		quad(gameChar_x+1.5, gameChar_y-21, gameChar_x-1.5, gameChar_y-25, gameChar_x-13.5, gameChar_y-21, gameChar_x-11, gameChar_y-17)
		arc(gameChar_x, gameChar_y-23, 5, 5, 220, 80, OPEN)
		arc(gameChar_x-12, gameChar_y-19, 5, 5, 45, 250, OPEN)
		//Refix
		rectMode(CORNER);
	}
	else if(isLeft)
	{
		// add your walking left code
		//Walking, turned left
		//Setup
		noFill();
		stroke(0);
		rectMode(CENTER);
		angleMode(DEGREES);
		//head
		fill(0,255,255)
		rect(gameChar_x, gameChar_y-35, 8, 14, 3)
		//ears
		fill(80,80,80)
		ellipse(gameChar_x, gameChar_y-35, 2, 4)
		noFill()
		//neck
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-27.5, 3, 1)
		//right arm (covered one)
		fill(0,255,255);
		quad(gameChar_x+1.5, gameChar_y-21, gameChar_x-1.5, gameChar_y-25, gameChar_x-11, gameChar_y-21, gameChar_x-9.5, gameChar_y-16.4)
		arc(gameChar_x, gameChar_y-23, 5, 5, 235, 70)
		arc(gameChar_x-9.4, gameChar_y-19, 5, 5, 70, 235)
		//right leg
		fill(0,255,255);
		quad(gameChar_x+1.5, gameChar_y-21+12, gameChar_x-1.5, gameChar_y-25+12, gameChar_x-11, gameChar_y-21+12, gameChar_x-9.5, gameChar_y-16+12)
		arc(gameChar_x, gameChar_y-23+12, 5, 5, 235, 70)
		arc(gameChar_x-9.4, gameChar_y-19+12, 5, 5, 70, 235)
		//chest
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-20, 11, 14, 2)
		noFill()
		// trouser
		fill(80,80,80)
		quad(gameChar_x-2.5, gameChar_y-13, gameChar_x+2.5, gameChar_y-13, gameChar_x, gameChar_y-10, gameChar_x, gameChar_y-10)
		//left leg
		fill(0,255,255)
		quad(gameChar_x-2.5, gameChar_y-23+12, gameChar_x+1.9, gameChar_y-25+12, gameChar_x+6, gameChar_y-12+12, gameChar_x+1.6, gameChar_y-10+12)
		arc(gameChar_x, gameChar_y-23+12, 5, 5, 160, 345)
		arc(gameChar_x+3.4, gameChar_y-12+12, 5, 5, 345, 160)
		noFill();
		//left arm
		fill(0,255,255)
		quad(gameChar_x-2.5, gameChar_y-23, gameChar_x+1.9, gameChar_y-25, gameChar_x+6, gameChar_y-12, gameChar_x+1.6, gameChar_y-10)
		arc(gameChar_x, gameChar_y-23, 5, 5, 160, 345)
		arc(gameChar_x+3.4, gameChar_y-12, 5, 5, 345, 160)
		noFill();	
		//Refix
		rectMode(CORNER);
	}
	else if(isRight)
	{
		// add your walking right code
		//Walking, turned right
		//Setup
		noFill();
		stroke(0);
		rectMode(CENTER);
		angleMode(DEGREES);
		//head
		fill(0,255,255);
		rect(gameChar_x, gameChar_y-35, 8, 14, 3)
		//ears
		fill(80,80,80)
		ellipse(gameChar_x, gameChar_y-35, 2, 4)
		//neck
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-27.5, 3, 1)
		//left arm (covered one)
		fill(0,255,255);
		quad(gameChar_x-1.5, gameChar_y-21, gameChar_x+1.5, gameChar_y-25, gameChar_x+11, gameChar_y-21, gameChar_x+9.5, gameChar_y-16.4)
		arc(gameChar_x, gameChar_y-23, 5, 5, 110, 300)
		arc(gameChar_x+9.4, gameChar_y-19, 5, 5, 300, 110)
		//left leg
		fill(0,255,255);
		quad(gameChar_x-1.5, gameChar_y-21+12, gameChar_x+1.5, gameChar_y-25+12, gameChar_x+11, gameChar_y-21+12, gameChar_x+9.5, gameChar_y-16+12)
		arc(gameChar_x, gameChar_y-23+12, 5, 5, 110, 300)
		arc(gameChar_x+9.4, gameChar_y-19+12, 5, 5, 300, 110)
		//chest
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-20, 11, 14, 2)
		noFill()
		// trouser
		fill(80,80,80)
		quad(gameChar_x-2.5, gameChar_y-13, gameChar_x+2.5, gameChar_y-13, gameChar_x, gameChar_y-10, gameChar_x, gameChar_y-10)
		//rght leg
		fill(0,255,255)
		quad(gameChar_x+2.5, gameChar_y-23+12, gameChar_x-1.9, gameChar_y-25+12, gameChar_x-6, gameChar_y-12+12, gameChar_x-1.6, gameChar_y-10+12)
		arc(gameChar_x, gameChar_y-23+12, 5, 5, 200, 45)
		arc(gameChar_x-3.4, gameChar_y-12+12, 5, 5, 45, 200)
		noFill();
		//right arm
		fill(0,255,255)
		quad(gameChar_x+2.5, gameChar_y-23, gameChar_x-1.9, gameChar_y-25, gameChar_x-6, gameChar_y-12, gameChar_x-1.6, gameChar_y-10)
		arc(gameChar_x, gameChar_y-23, 5, 5, 200, 45)
		arc(gameChar_x-3.4, gameChar_y-12, 5, 5, 45, 200)
		noFill();	
		//Refix
		rectMode(CORNER);
	}
	else if(isJumping || isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		//Jumping facing forwards
		//Setup
		noFill();
		stroke(0);
		rectMode(CENTER);
		angleMode(DEGREES);
		//head
		fill(0,255,255)
		rect(gameChar_x, gameChar_y-35, 16, 14, 4)
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-35, 10, 8, 2)
		//eyes
		fill(0,255,255)
		stroke(0,255,255)
		ellipse(gameChar_x-2, gameChar_y-35, 2, 4)
		ellipse(gameChar_x+2, gameChar_y-35, 2, 4)
		stroke(0)
		//ears
		fill(80,80,80)
		ellipse(gameChar_x-9, gameChar_y-35, 2, 4)
		ellipse(gameChar_x+9, gameChar_y-35, 2, 4)
		noFill()
		//neck
		fill(0,255,255)
		rect(gameChar_x, gameChar_y-27.5, 6, 1)
		//chest
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-20, 22, 14, 2)
		//left arm
		fill(0,255,255)
		quad(gameChar_x-11.5, gameChar_y-26, gameChar_x-15.5, gameChar_y-23, gameChar_x-22.5, gameChar_y-33, gameChar_x-18.5, gameChar_y-36)
		arc(gameChar_x-14, gameChar_y-25, 5, 5, 333, 135)
		arc(gameChar_x-21, gameChar_y-35, 5, 5, 108, 350, OPEN)
		//right arm
		fill(0,255,255)
		quad(gameChar_x+15, gameChar_y-23, gameChar_x+12, gameChar_y-27, gameChar_x+19, gameChar_y-36.5, gameChar_x+23.5, gameChar_y-34)
		arc(gameChar_x+13.5, gameChar_y-25, 5, 5, 40, 250, OPEN)
		arc(gameChar_x+21, gameChar_y-35, 5, 5, 200, 40, OPEN)
		// trouser
		fill(80,80,80)
		quad(gameChar_x-5, gameChar_y-13, gameChar_x+5, gameChar_y-13, gameChar_x+2.5, gameChar_y-10, gameChar_x-2.5, gameChar_y-10)
		//left leg
		fill(0,255,255)
		quad(gameChar_x-4, gameChar_y-8, gameChar_x-7, gameChar_y-12, gameChar_x-16.5, gameChar_y-7, gameChar_x-13.5, gameChar_y-3)
		arc(gameChar_x-5.5, gameChar_y-10, 5, 5, 220, 70, OPEN)
		arc(gameChar_x-15, gameChar_y-5, 5, 5, 40, 250, OPEN)
		//right leg
		fill(0,255,255)
		quad(gameChar_x+3.8, gameChar_y-8, gameChar_x+7, gameChar_y-12, gameChar_x+15.2, gameChar_y-1, gameChar_x+11.5, gameChar_y+2)
		arc(gameChar_x+5.5, gameChar_y-10, 5, 5, 120, 340, OPEN)
		arc(gameChar_x+13, gameChar_y, 5, 5, 320, 150, OPEN)
		//Refix
		rectMode(CORNER);
	}
	else
	{
		// add your standing front facing code
		//Standing, facing frontwards
		//Setup
		noFill();
		stroke(0);
		rectMode(CENTER);
		//head
		fill(0,255,255)
		rect(gameChar_x, gameChar_y-35, 16, 14, 4)
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-35, 10, 8, 2)
		//eyes
		fill(0,255,255)
		stroke(0,255,255)
		ellipse(gameChar_x-2, gameChar_y-35, 2, 4)
		ellipse(gameChar_x+2, gameChar_y-35, 2, 4)
		stroke(0)
		//ears
		fill(80,80,80)
		ellipse(gameChar_x-9, gameChar_y-35, 2, 4)
		ellipse(gameChar_x+9, gameChar_y-35, 2, 4)
		noFill()
		//neck
		rect(gameChar_x, gameChar_y-27.5, 6, 1)
		//chest
		fill(80,80,80)
		rect(gameChar_x, gameChar_y-20, 22, 14, 2)
		//left arm
		fill(0,255,255)
		rect(gameChar_x-13.5, gameChar_y-18, 5, 14, 2.5)
		//right arm
		rect(gameChar_x+13.5, gameChar_y-18, 5, 14, 2.5)
		// trouser
		fill(80,80,80)
		quad(gameChar_x-5, gameChar_y-13, gameChar_x+5, gameChar_y-13, gameChar_x+2.5, gameChar_y-10, gameChar_x-2.5, gameChar_y-10)
		//left leg
		fill(0,255,255)
		rect(gameChar_x-5.5, gameChar_y-5, 5, 14, 2.5)
		//right leg
		rect(gameChar_x+5.5, gameChar_y-5, 5, 14, 2.5)
		//Refix
		rectMode(CORNER);
	}
	// I commented this pop out because when it is poped here, the character is left behind
	// same as the background instead of staying in the center unless the user move the character
	// pop();

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	// checking left right
	if(isPlummeting == false){
		if(isLeft == true && gameChar_x > 20){
			gameChar_x -= 40;
		}else if(isRight == true && gameChar_x < (levelWidth-20)){
			gameChar_x += 40;
		}
	}

	// check jumping
	if(isJumping == true){
		if(gameChar_y > jumpLimit){
			gameChar_y -= 5;
		}else{
			isJumping = false;
			isFalling = true;
		}
	}
	// check falling
	if(isFalling == true){
		if(gameChar_y < floorPos_y){
			gameChar_y += 5;
		}else{
			gameChar_y = floorPos_y;
			isFalling = false;
		}
	}

	//TESTING ZONE
	// for(let i = 0; i < 5000; i+=500){
	// 	stroke(255, 0, 0);
	// 	text(i, i, 550);
	// 	rect(i, 0, 1, windowHeight);
	// }
}


function keyPressed()
{
	// console.log(dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos))
	// if statements to control the animation of the character when
	// keys are pressed.
	if(isPlummeting == false){
		if(key == "ArrowLeft" || key == "a"){
			isLeft = true;
		}else if(key == "ArrowRight" || key == "d"){
			isRight = true;
		}
		if((key == "ArrowUp" || key == "w" || key == " ") && isJumping == false && isFalling == false){
			isJumping = true;
		}
	}	
	//open up the console to see how these work
	// console.log("keyPressed: " + key);
	// console.log("keyPressed: " + keyCode);
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
	if(key == "ArrowLeft" || key == "a"){
		isLeft = false;
	}else if(key == "ArrowRight" || key == "d"){
		isRight = false;
	}
	// console.log("keyReleased: " + key);
	// console.log("keyReleased: " + keyCode);
}

function drawClouds(){
	// Clouds
	for(let i = 0; i < clouds.length; i++){
		let cloud = clouds[i];
		// Cloud
		noStroke();
		fill(255);
		ellipse(cloud.x_pos+150, cloud.y_pos, 50, 50)
		ellipse(cloud.x_pos+200, cloud.y_pos-30, 80, 80)
		ellipse(cloud.x_pos+250, cloud.y_pos, 50, 50)
		ellipse(cloud.x_pos+170, cloud.y_pos-20, 50, 50)
		ellipse(cloud.x_pos+235, cloud.y_pos-20, 50, 50)
		rect(cloud.x_pos+150, cloud.y_pos, 100, 50)
		fill(100, 155, 255);
		rect(cloud.x_pos+100, cloud.y_pos+25, 200, 100);
	}
}

function drawMountains(){
	// Mountains
	for(let i = 0; i < mountains.length; i++){
		let mountain = mountains[i];
		// Mountain
		fill(219, 115, 70);
		stroke(0);
		beginShape();
		vertex(mountain.x_pos-50, mountain.y_pos);
		vertex(mountain.x_pos-50, mountain.y_pos-35);
		vertex(mountain.x_pos-40, mountain.y_pos-35);
		vertex(mountain.x_pos-30, mountain.y_pos-200);
		vertex(mountain.x_pos+90, mountain.y_pos-200);
		vertex(mountain.x_pos+115, mountain.y_pos-90);
		vertex(mountain.x_pos+150, mountain.y_pos-180);
		vertex(mountain.x_pos+170, mountain.y_pos-180);
		vertex(mountain.x_pos+180, mountain.y_pos-200);
		vertex(mountain.x_pos+250, mountain.y_pos-200);
		vertex(mountain.x_pos+260, mountain.y_pos-170);
		vertex(mountain.x_pos+280, mountain.y_pos-170);
		vertex(mountain.x_pos+300, mountain.y_pos-110);
		vertex(mountain.x_pos+320, mountain.y_pos-110);
		vertex(mountain.x_pos+340, mountain.y_pos-50);
		vertex(mountain.x_pos+360, mountain.y_pos-50);
		vertex(mountain.x_pos+380, mountain.y_pos);	
		vertex(mountain.x_pos-50, mountain.y_pos);
		endShape();	
	}
}

function drawTrees(){
	// Draw Trees
	for(let i = 0; i < trees_x.length; i++){
		treePos_x = trees_x[i];		
		// A tree
		angleMode(DEGREES)
		fill(44, 145, 26);
		stroke(0)
		rect(treePos_x, treePos_y+64, 30, 80);
		arc(treePos_x+15, treePos_y+65, 30, 30, 180, 0, OPEN);
		quad(treePos_x, treePos_y+85, treePos_x, treePos_y+115, treePos_x-24, treePos_y+93, treePos_x-15, treePos_y+71.5);
		arc(treePos_x-20, treePos_y+82, 23, 23, 107, 315, OPEN);
		quad(treePos_x+30, treePos_y+105, treePos_x+30, 422, treePos_x+57, treePos_y+99, treePos_x+44.5, treePos_y+85);
		arc(treePos_x+50, treePos_y+93, 19, 19, 225, 45, OPEN);
		stroke(0);
		point(treePos_x+10, treePos_y+65);
		point(treePos_x+10, treePos_y+75);
		point(treePos_x+10, treePos_y+85);
		point(treePos_x+10, treePos_y+95);
		point(treePos_x+10, treePos_y+105);
		point(treePos_x+10, treePos_y+115);
		point(treePos_x+10, treePos_y+125);
		point(treePos_x+10, treePos_y+135);
		point(treePos_x+20, treePos_y+65);
		point(treePos_x+20, treePos_y+75);
		point(treePos_x+20, treePos_y+85);
		point(treePos_x+20, treePos_y+95);
		point(treePos_x+20, treePos_y+105);
		point(treePos_x+20, treePos_y+115);
		point(treePos_x+20, treePos_y+125);
		point(treePos_x+20, treePos_y+135);
		point(treePos_x-20, treePos_y+78);
		point(treePos_x-10, treePos_y+88);
		point(treePos_x, treePos_y+98);	
		point(treePos_x+48, treePos_y+93);
		point(treePos_x+42, treePos_y+103);
		point(treePos_x+35, treePos_y+113);
	}
}

function drawCollectable(t_collectable){
	// check item
	if(t_collectable.isFound == false){
		// A collectable token
		fill(0,255,255);
		angleMode(DEGREES)
		stroke(0);
		quad(
			t_collectable.x_pos-1*t_collectable.size, t_collectable.y_pos-2*t_collectable.size,		
			t_collectable.x_pos+1*t_collectable.size, t_collectable.y_pos-2*t_collectable.size,
			t_collectable.x_pos+1*t_collectable.size, t_collectable.y_pos+2*t_collectable.size,
			t_collectable.x_pos-1*t_collectable.size, t_collectable.y_pos+2*t_collectable.size,
			);
		arc(t_collectable.x_pos, t_collectable.y_pos-1.9*t_collectable.size, 2*t_collectable.size, 2*t_collectable.size, 180, 0, OPEN)
		arc(t_collectable.x_pos, t_collectable.y_pos+1.9*t_collectable.size, 2*t_collectable.size, 2*t_collectable.size, 0, 180, OPEN)
		fill(255,255,0);
		beginShape();
		vertex(t_collectable.x_pos, t_collectable.y_pos-2.5*t_collectable.size);
		vertex(t_collectable.x_pos-0.8*t_collectable.size,t_collectable.y_pos+0.2*t_collectable.size);
		vertex(t_collectable.x_pos+0.2*t_collectable.size,t_collectable.y_pos+0.2*t_collectable.size);
		vertex(t_collectable.x_pos, t_collectable.y_pos+2.5*t_collectable.size);
		vertex(t_collectable.x_pos+0.8*t_collectable.size,t_collectable.y_pos-0.2*t_collectable.size)
		vertex(t_collectable.x_pos-0.2*t_collectable.size,t_collectable.y_pos-0.2*t_collectable.size);
		vertex(t_collectable.x_pos, t_collectable.y_pos-2.5*t_collectable.size);
		endShape();
	}
}

function drawCanyon(canyon){
	//draw the canyon
	// A canyon
	noStroke();
	// // First Layer
	// fill(182,91,52);
	// rect(0, floorPos_y, width, (height-floorPos_y)/3)
	// // Second Layer
	// fill(111,63,65);
	// rect(0, floorPos_y+((height-floorPos_y)/3), width, (height-floorPos_y)/3);
	// // Third Layer
	// fill(77,44,62);
	// rect(0, floorPos_y+2*((height-floorPos_y)/3), width, (height-floorPos_y)/3);
	// Canyon
	rectMode(CORNER);
	fill(100, 155, 255);
	rect(canyon.x_pos, floorPos_y, canyon.width, (height-floorPos_y)/3);
	rect(canyon.x_pos+canyon.width/6, floorPos_y+((height-floorPos_y)/3), 2*(canyon.width/3), (height-floorPos_y)/3);
	rect(canyon.x_pos+canyon.width/3, floorPos_y+2*((height-floorPos_y)/3), canyon.width/3, (height-floorPos_y)/3);
	// Refix
	rectMode(CORNER);
}

function checkCollectable(t_collectable){
	// check item found
	if((t_collectable.isFound == false) && (Math.abs((gameChar_x+cameraPosX) - t_collectable.x_pos) <= 12) && (Math.abs((gameChar_y) - t_collectable.y_pos) <= 150)){
		t_collectable.isFound = true;
	}
}

function checkCanyon(canyon){
	// check plummeting
	if((gameChar_y >= floorPos_y) && (gameChar_y < (floorPos_y+150)) && (Math.abs((gameChar_x+cameraPosX) - (canyon.x_pos+canyon.width/2)) <= 40)){
		isPlummeting = true;
		// this height is checked so that character doesn't look like dragged down while in the middle of the jump
		if(gameChar_y > (floorPos_y+50)){			
			isLeft = false;
			isRight = false;
			// falling middle
			if(gameChar_x < (canyon.x_pos+canyon.width/2)){
				gameChar_x += 5;
			}else{
				gameChar_x -= 5;
			}
		}
		// falling down
		gameChar_y += 5;
	}
}