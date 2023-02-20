/*

The Game Project

*/

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
let collectables;
let canyons;
let levelWidth,
lifeFullImg;

// objects
const myCamera = {},
gameChar = {},
goal = {};

function preload(){
	threeLivesImg = loadImage('./images/threeLives.png');
	twoLivesImg = loadImage('./images/twoLives.png');
	oneLivesImg = loadImage('./images/oneLives.png');
	noLivesImg = loadImage('./images/noLives.png');
	goalImg = loadImage('./images/goal.png');
}

function setup()
{
	createCanvas(windowWidth, 576);
	floorPos_y = height * 3/4;
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
	isPlummeting = false;
	jumpLimit = floorPos_y - 50;

	// My game character's properties
	gameChar.x = 150;
	gameChar.y = floorPos_y;
	gameChar.lives = 3;
	gameChar.speed = 5;
	gameChar.jumpHeight = 5;
	gameChar.score = 0;

	// Camera's properies
	myCamera.start = 670;

	// Goal's properies
	goal.x = 3960;
	goal.y = floorPos_y -80;

	// Width of the game level
	levelWidth = 4000;

	// Trees
	trees_x = [ 60, 400, 850, 1300, 1650, 2400, 3150, 3370, 3700]
	treePos_y = height/2;

	// Clouds
	clouds = [
		{x_pos: 20, y_pos: 80},
		{x_pos: 300, y_pos: 150},
		{x_pos: 600, y_pos: 130},
		{x_pos: 1000, y_pos: 90},
		{x_pos: 1300, y_pos: 120},
		{x_pos: 1600, y_pos: 100},
		{x_pos: 1900, y_pos: 130},
		{x_pos: 2200, y_pos: 120},
		{x_pos: 2600, y_pos: 130},
		{x_pos: 3000, y_pos: 100},
		{x_pos: 3350, y_pos: 130},
		{x_pos: 3700, y_pos: 90},
	]

	// Mountains
	mountains = [
		{x_pos: 60, y_pos: floorPos_y},
		{x_pos: 660, y_pos: floorPos_y},
		{x_pos: 1535, y_pos: floorPos_y},
		{x_pos: 2350, y_pos: floorPos_y},
		{x_pos: 3385, y_pos: floorPos_y}
	]

	// Drawing
	canyons = [
		{x_pos: 500, width: 80},
		{x_pos: 1100, width: 80},
		{x_pos: 1400, width: 80},
		{x_pos: 1950, width: 90},
		{x_pos: 2150, width: 90},
		{x_pos: 2800, width: 100},
		{x_pos: 3000, width: 100},
		{x_pos: 3200, width: 100},
		{x_pos: 3800, width: 110}
	]
	collectables = [
		{x_pos: 330, y_pos: 380, size: 7.5, isFound: false},
		{x_pos: 700, y_pos: 380, size: 7.5, isFound: false},
		{x_pos: 1230, y_pos: 380, size: 7.5, isFound: false},
		{x_pos: 1770, y_pos: 380, size: 7.5, isFound: false},
		{x_pos: 2090, y_pos: 380, size: 7.5, isFound: false},
		{x_pos: 2560, y_pos: 380, size: 7.5, isFound: false},
		{x_pos: 2950, y_pos: 380, size: 7.5, isFound: false},
		{x_pos: 3600, y_pos: 380, size: 7.5, isFound: false},
		{x_pos: 3600, y_pos: 380, size: 7.5, isFound: false},
		{x_pos: 3930, y_pos: 380, size: 7.5, isFound: false},
	]
}

function draw()
{
	///////////DRAWING CODE//////////
	// Draw Things that do not translate (Fixed Position)
	drawSky();
	drawGround();
	checkLives(gameChar.lives);

	// Camera Control
	// Same as game character between x(600-3400)
	// Fixed when close to edges
	// myCamera.start = start of the camera position (used in translate so that when gameChar passed the camera start, translate others behind gameChar by myCamera.start pixels)
	if(gameChar.x > myCamera.start && gameChar.x < (levelWidth-myCamera.start)){
		translate(-(gameChar.x-myCamera.start), 0);
	}else if(gameChar.x >= (levelWidth-myCamera.start)){
		translate(-(levelWidth-myCamera.start-myCamera.start), 0);
	}

	// Draw all the other things that move positions
	drawClouds();
	drawMountains();
	drawTrees();
	drawGoal();
	for(let i = 0; i < canyons.length; i++){
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);	
	}
	for(let i = 0; i < collectables.length; i++){
		drawCollectable(collectables[i]);
		checkCollectable(collectables[i]);	
	}

	// Checking Game character's style
	if(isLeft && (isJumping || isFalling)){
		drawJumpLeft();
	}else if(isRight && (isJumping || isFalling)){
		drawJumpRight();
	}else if(isLeft){
		drawWalkLeft();
	}else if(isRight){
		drawWalkRight();
	}else if(isJumping || isFalling || isPlummeting){
		drawJumpFront();
	}else{
		drawStandFront();
	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	// checking left right
	if(isPlummeting == false){
		if(isLeft == true && gameChar.x > 20){
			gameChar.x -= gameChar.speed;
		}else if(isRight == true && gameChar.x < (levelWidth-20)){
			gameChar.x += gameChar.speed;
		}
	}

	// check jumping
	if(isJumping == true){
		if(gameChar.y > jumpLimit){
			gameChar.y -= 5;
		}else{
			isJumping = false;
			isFalling = true;
		}
	}
	// check falling
	if(isFalling == true){
		if(gameChar.y < floorPos_y){
			gameChar.y += 5;
		}else{
			isFalling = false;
			gameChar.x = 150;
			gameChar.y = floorPos_y;
			gameChar.lives -= 1;
		}
	}

	//TESTING ZONE
	// for(let i = 1000; i < 5000; i+=500){
	// 	stroke(255, 0, 0);
	// 	text(i, i, 550);
	// 	rect(i, 0, 1, windowHeight);
	// }
}

function keyPressed()
{
	// console.log(dist(gameChar.x, gameChar.y, collectable.x_pos, collectable.y_pos))
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

function drawSky(){
	//fill the sky blue
	background(161, 220, 255);
}

function drawGround(){
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
}

function checkLives(lives){
	switch(lives){
		case 0:
			image(noLivesImg, 10, 10);
			break;
		case 1:
			image(oneLivesImg, 10, 10);
			break;
		case 2:
			image(twoLivesImg, 10, 10);
			break;
		case 3:
			image(threeLivesImg, 10, 10);
			break;
	}
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
		fill(161, 220, 255);
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
	// Canyon
	rectMode(CORNER);
	fill(161, 220, 255);
	rect(canyon.x_pos, floorPos_y, canyon.width, (height-floorPos_y)/3);
	rect(canyon.x_pos+canyon.width/6, floorPos_y+((height-floorPos_y)/3), 2*(canyon.width/3), (height-floorPos_y)/3);
	rect(canyon.x_pos+canyon.width/3, floorPos_y+2*((height-floorPos_y)/3), canyon.width/3, (height-floorPos_y)/3);
	// Refix
	rectMode(CORNER);
}

function checkCollectable(t_collectable){
	// check item found
	if((t_collectable.isFound == false) && (Math.abs((gameChar.x) - t_collectable.x_pos) <= 12) && (Math.abs((gameChar.y) - t_collectable.y_pos) <= 150)){
		t_collectable.isFound = true;
	}
}

function checkCanyon(canyon){
	// check plummeting
	if((gameChar.y >= floorPos_y) && (gameChar.y < (floorPos_y+150)) && (Math.abs((gameChar.x) - (canyon.x_pos+canyon.width/2)) <= ((canyon.width/2)-10))){
		isPlummeting = true;
		// this height is checked so that character doesn't look like dragged down while in the middle of the jump
		if(gameChar.y > (floorPos_y+50)){			
			isLeft = false;
			isRight = false;
			// falling middle
			if(gameChar.x < (canyon.x_pos+canyon.width/2)){
				gameChar.x += 5;
			}else{
				gameChar.x -= 5;
			}
		}
		// falling down
		gameChar.y += 5;
	}
}

function drawGoal(){
	image(goalImg, goal.x, goal.y);
}

// Game Character styles
function drawJumpLeft(){
	//Jumping to the left
	//Setup
	noFill();
	stroke(0);
	rectMode(CENTER);
	angleMode(DEGREES);
	//head
	fill(0,255,255);
	rect(gameChar.x, gameChar.y-35, 8, 14, 3)
	//ears
	fill(80,80,80)
	ellipse(gameChar.x, gameChar.y-35, 2, 4)
	//neck
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-27.5, 3, 1)
	//right arm (covered one)
	fill(0,255,255);
	quad(gameChar.x, gameChar.y-20.5, gameChar.x, gameChar.y-25.5, gameChar.x-11, gameChar.y-25.5, gameChar.x-11, gameChar.y-20.5)
	arc(gameChar.x, gameChar.y-23, 5, 5, 0, 360, OPEN)
	arc(gameChar.x-11, gameChar.y-23, 5, 5, 75, 290, OPEN)
	//right leg
	fill(0,255,255);
	quad(gameChar.x, gameChar.y-20.5+12, gameChar.x, gameChar.y-25.5+12, gameChar.x-11, gameChar.y-25.5+12, gameChar.x-11, gameChar.y-20.5+12)
	arc(gameChar.x, gameChar.y-23+12, 5, 5, 0, 360, OPEN)
	arc(gameChar.x-11, gameChar.y-23+12, 5, 5, 75, 290, OPEN)
	//chest
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-20, 11, 14, 2)
	noFill()
	// trouser
	fill(80,80,80)
	quad(gameChar.x-2.5, gameChar.y-13, gameChar.x+2.5, gameChar.y-13, gameChar.x, gameChar.y-10, gameChar.x, gameChar.y-10)
	//left leg
	fill(0,255,255)
	quad(gameChar.x-1.5, gameChar.y-21+12, gameChar.x+1.5, gameChar.y-25+12, gameChar.x+13.5, gameChar.y-21+12, gameChar.x+11, gameChar.y-17+12)
	arc(gameChar.x, gameChar.y-23+12, 5, 5, 75, 310, OPEN)
	arc(gameChar.x+12, gameChar.y-19+12, 5, 5, 270, 125, OPEN)
	noFill();
	//left arm
	fill(0,255,255)
	quad(gameChar.x-1.5, gameChar.y-21, gameChar.x+1.5, gameChar.y-25, gameChar.x+13.5, gameChar.y-21, gameChar.x+11, gameChar.y-17)
	arc(gameChar.x, gameChar.y-23, 5, 5, 75, 310, OPEN)
	arc(gameChar.x+12, gameChar.y-19, 5, 5, 270, 125, OPEN)
	//Refix
	rectMode(CORNER);
}

function drawJumpRight(){
	//Jumping right
	//Setup
	noFill();
	stroke(0);
	rectMode(CENTER);
	angleMode(DEGREES);
	//head
	fill(0,255,255);
	rect(gameChar.x, gameChar.y-35, 8, 14, 3)
	//ears
	fill(80,80,80)
	ellipse(gameChar.x, gameChar.y-35, 2, 4)
	//neck
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-27.5, 3, 1)
	//left arm (covered one)
	fill(0,255,255);
	quad(gameChar.x, gameChar.y-20.5, gameChar.x, gameChar.y-25.5, gameChar.x+11, gameChar.y-25.5, gameChar.x+11, gameChar.y-20.5)
	arc(gameChar.x, gameChar.y-23, 5, 5, 110, 300, OPEN)
	arc(gameChar.x+11, gameChar.y-23, 5, 5, 245, 100, OPEN)
	//left leg
	fill(0,255,255);
	quad(gameChar.x, gameChar.y-20.5+12, gameChar.x, gameChar.y-25.5+12, gameChar.x+11, gameChar.y-25.5+12, gameChar.x+11, gameChar.y-20.5+12)
	arc(gameChar.x, gameChar.y-23+12, 5, 5, 110, 300, OPEN)
	arc(gameChar.x+11, gameChar.y-23+12, 5, 5, 245, 100, OPEN)
	//chest
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-20, 11, 14, 2)
	noFill()
	// trouser
	fill(80,80,80)
	quad(gameChar.x-2.5, gameChar.y-13, gameChar.x+2.5, gameChar.y-13, gameChar.x, gameChar.y-10, gameChar.x, gameChar.y-10)
	//right leg
	fill(0,255,255)
	quad(gameChar.x+1.5, gameChar.y-21+12, gameChar.x-1.5, gameChar.y-25+12, gameChar.x-13.5, gameChar.y-21+12, gameChar.x-11, gameChar.y-17+12)
	arc(gameChar.x, gameChar.y-23+12, 5, 5, 220, 80, OPEN)
	arc(gameChar.x-12, gameChar.y-19+12, 5, 5, 45, 250, OPEN)
	noFill();
	//right arm
	fill(0,255,255)
	quad(gameChar.x+1.5, gameChar.y-21, gameChar.x-1.5, gameChar.y-25, gameChar.x-13.5, gameChar.y-21, gameChar.x-11, gameChar.y-17)
	arc(gameChar.x, gameChar.y-23, 5, 5, 220, 80, OPEN)
	arc(gameChar.x-12, gameChar.y-19, 5, 5, 45, 250, OPEN)
	//Refix
	rectMode(CORNER);
}

function drawWalkLeft(){
	//Walking, turned left
	//Setup
	noFill();
	stroke(0);
	rectMode(CENTER);
	angleMode(DEGREES);
	//head
	fill(0,255,255)
	rect(gameChar.x, gameChar.y-35, 8, 14, 3)
	//ears
	fill(80,80,80)
	ellipse(gameChar.x, gameChar.y-35, 2, 4)
	noFill()
	//neck
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-27.5, 3, 1)
	//right arm (covered one)
	fill(0,255,255);
	quad(gameChar.x+1.5, gameChar.y-21, gameChar.x-1.5, gameChar.y-25, gameChar.x-11, gameChar.y-21, gameChar.x-9.5, gameChar.y-16.4)
	arc(gameChar.x, gameChar.y-23, 5, 5, 235, 70)
	arc(gameChar.x-9.4, gameChar.y-19, 5, 5, 70, 235)
	//right leg
	fill(0,255,255);
	quad(gameChar.x+1.5, gameChar.y-21+12, gameChar.x-1.5, gameChar.y-25+12, gameChar.x-11, gameChar.y-21+12, gameChar.x-9.5, gameChar.y-16+12)
	arc(gameChar.x, gameChar.y-23+12, 5, 5, 235, 70)
	arc(gameChar.x-9.4, gameChar.y-19+12, 5, 5, 70, 235)
	//chest
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-20, 11, 14, 2)
	noFill()
	// trouser
	fill(80,80,80)
	quad(gameChar.x-2.5, gameChar.y-13, gameChar.x+2.5, gameChar.y-13, gameChar.x, gameChar.y-10, gameChar.x, gameChar.y-10)
	//left leg
	fill(0,255,255)
	quad(gameChar.x-2.5, gameChar.y-23+12, gameChar.x+1.9, gameChar.y-25+12, gameChar.x+6, gameChar.y-12+12, gameChar.x+1.6, gameChar.y-10+12)
	arc(gameChar.x, gameChar.y-23+12, 5, 5, 160, 345)
	arc(gameChar.x+3.4, gameChar.y-12+12, 5, 5, 345, 160)
	noFill();
	//left arm
	fill(0,255,255)
	quad(gameChar.x-2.5, gameChar.y-23, gameChar.x+1.9, gameChar.y-25, gameChar.x+6, gameChar.y-12, gameChar.x+1.6, gameChar.y-10)
	arc(gameChar.x, gameChar.y-23, 5, 5, 160, 345)
	arc(gameChar.x+3.4, gameChar.y-12, 5, 5, 345, 160)
	noFill();	
	//Refix
	rectMode(CORNER);
}

function drawWalkRight(){
	//Walking, turned right
	//Setup
	noFill();
	stroke(0);
	rectMode(CENTER);
	angleMode(DEGREES);
	//head
	fill(0,255,255);
	rect(gameChar.x, gameChar.y-35, 8, 14, 3)
	//ears
	fill(80,80,80)
	ellipse(gameChar.x, gameChar.y-35, 2, 4)
	//neck
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-27.5, 3, 1)
	//left arm (covered one)
	fill(0,255,255);
	quad(gameChar.x-1.5, gameChar.y-21, gameChar.x+1.5, gameChar.y-25, gameChar.x+11, gameChar.y-21, gameChar.x+9.5, gameChar.y-16.4)
	arc(gameChar.x, gameChar.y-23, 5, 5, 110, 300)
	arc(gameChar.x+9.4, gameChar.y-19, 5, 5, 300, 110)
	//left leg
	fill(0,255,255);
	quad(gameChar.x-1.5, gameChar.y-21+12, gameChar.x+1.5, gameChar.y-25+12, gameChar.x+11, gameChar.y-21+12, gameChar.x+9.5, gameChar.y-16+12)
	arc(gameChar.x, gameChar.y-23+12, 5, 5, 110, 300)
	arc(gameChar.x+9.4, gameChar.y-19+12, 5, 5, 300, 110)
	//chest
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-20, 11, 14, 2)
	noFill()
	// trouser
	fill(80,80,80)
	quad(gameChar.x-2.5, gameChar.y-13, gameChar.x+2.5, gameChar.y-13, gameChar.x, gameChar.y-10, gameChar.x, gameChar.y-10)
	//rght leg
	fill(0,255,255)
	quad(gameChar.x+2.5, gameChar.y-23+12, gameChar.x-1.9, gameChar.y-25+12, gameChar.x-6, gameChar.y-12+12, gameChar.x-1.6, gameChar.y-10+12)
	arc(gameChar.x, gameChar.y-23+12, 5, 5, 200, 45)
	arc(gameChar.x-3.4, gameChar.y-12+12, 5, 5, 45, 200)
	noFill();
	//right arm
	fill(0,255,255)
	quad(gameChar.x+2.5, gameChar.y-23, gameChar.x-1.9, gameChar.y-25, gameChar.x-6, gameChar.y-12, gameChar.x-1.6, gameChar.y-10)
	arc(gameChar.x, gameChar.y-23, 5, 5, 200, 45)
	arc(gameChar.x-3.4, gameChar.y-12, 5, 5, 45, 200)
	noFill();	
	//Refix
	rectMode(CORNER);
}

function drawJumpFront(){
	//Jumping facing forwards
	//Setup
	noFill();
	stroke(0);
	rectMode(CENTER);
	angleMode(DEGREES);
	//head
	fill(0,255,255)
	rect(gameChar.x, gameChar.y-35, 16, 14, 4)
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-35, 10, 8, 2)
	//eyes
	fill(0,255,255)
	stroke(0,255,255)
	ellipse(gameChar.x-2, gameChar.y-35, 2, 4)
	ellipse(gameChar.x+2, gameChar.y-35, 2, 4)
	stroke(0)
	//ears
	fill(80,80,80)
	ellipse(gameChar.x-9, gameChar.y-35, 2, 4)
	ellipse(gameChar.x+9, gameChar.y-35, 2, 4)
	noFill()
	//neck
	fill(0,255,255)
	rect(gameChar.x, gameChar.y-27.5, 6, 1)
	//chest
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-20, 22, 14, 2)
	//left arm
	fill(0,255,255)
	quad(gameChar.x-11.5, gameChar.y-26, gameChar.x-15.5, gameChar.y-23, gameChar.x-22.5, gameChar.y-33, gameChar.x-18.5, gameChar.y-36)
	arc(gameChar.x-14, gameChar.y-25, 5, 5, 333, 135)
	arc(gameChar.x-21, gameChar.y-35, 5, 5, 108, 350, OPEN)
	//right arm
	fill(0,255,255)
	quad(gameChar.x+15, gameChar.y-23, gameChar.x+12, gameChar.y-27, gameChar.x+19, gameChar.y-36.5, gameChar.x+23.5, gameChar.y-34)
	arc(gameChar.x+13.5, gameChar.y-25, 5, 5, 40, 250, OPEN)
	arc(gameChar.x+21, gameChar.y-35, 5, 5, 200, 40, OPEN)
	// trouser
	fill(80,80,80)
	quad(gameChar.x-5, gameChar.y-13, gameChar.x+5, gameChar.y-13, gameChar.x+2.5, gameChar.y-10, gameChar.x-2.5, gameChar.y-10)
	//left leg
	fill(0,255,255)
	quad(gameChar.x-4, gameChar.y-8, gameChar.x-7, gameChar.y-12, gameChar.x-16.5, gameChar.y-7, gameChar.x-13.5, gameChar.y-3)
	arc(gameChar.x-5.5, gameChar.y-10, 5, 5, 220, 70, OPEN)
	arc(gameChar.x-15, gameChar.y-5, 5, 5, 40, 250, OPEN)
	//right leg
	fill(0,255,255)
	quad(gameChar.x+3.8, gameChar.y-8, gameChar.x+7, gameChar.y-12, gameChar.x+15.2, gameChar.y-1, gameChar.x+11.5, gameChar.y+2)
	arc(gameChar.x+5.5, gameChar.y-10, 5, 5, 120, 340, OPEN)
	arc(gameChar.x+13, gameChar.y, 5, 5, 320, 150, OPEN)
	//Refix
	rectMode(CORNER);
}

function drawStandFront(){
	//Standing, facing frontwards
	//Setup
	noFill();
	stroke(0);
	rectMode(CENTER);
	//head
	fill(0,255,255)
	rect(gameChar.x, gameChar.y-35, 16, 14, 4)
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-35, 10, 8, 2)
	//eyes
	fill(0,255,255)
	stroke(0,255,255)
	ellipse(gameChar.x-2, gameChar.y-35, 2, 4)
	ellipse(gameChar.x+2, gameChar.y-35, 2, 4)
	stroke(0)
	//ears
	fill(80,80,80)
	ellipse(gameChar.x-9, gameChar.y-35, 2, 4)
	ellipse(gameChar.x+9, gameChar.y-35, 2, 4)
	noFill()
	//neck
	rect(gameChar.x, gameChar.y-27.5, 6, 1)
	//chest
	fill(80,80,80)
	rect(gameChar.x, gameChar.y-20, 22, 14, 2)
	//left arm
	fill(0,255,255)
	rect(gameChar.x-13.5, gameChar.y-18, 5, 14, 2.5)
	//right arm
	rect(gameChar.x+13.5, gameChar.y-18, 5, 14, 2.5)
	// trouser
	fill(80,80,80)
	quad(gameChar.x-5, gameChar.y-13, gameChar.x+5, gameChar.y-13, gameChar.x+2.5, gameChar.y-10, gameChar.x-2.5, gameChar.y-10)
	//left leg
	fill(0,255,255)
	rect(gameChar.x-5.5, gameChar.y-5, 5, 14, 2.5)
	//right leg
	rect(gameChar.x+5.5, gameChar.y-5, 5, 14, 2.5)
	//Refix
	rectMode(CORNER);
}