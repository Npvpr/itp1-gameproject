/*

The Game Project

Week 3

Game interaction

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
var isFound;
var difference;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
	isPlummeting = false;
	jumpLimit = floorPos_y - 50;
	isFound = false;

	// Drawing
	cloud = {x_pos: 20, y_pos: 100};
	canyon = {x_pos: 300, width: 100};
	collectable = {x_pos: 130, y_pos: 370, size: 10};
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue
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

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon
	// A canyon
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
	// Canyon
	rectMode(CORNER);
	fill(100, 155, 255);
	rect(canyon.x_pos, floorPos_y, canyon.width, (height-floorPos_y)/3);
	rect(canyon.x_pos+canyon.width/6, floorPos_y+((height-floorPos_y)/3), 2*(canyon.width/3), (height-floorPos_y)/3);
	rect(canyon.x_pos+canyon.width/3, floorPos_y+2*((height-floorPos_y)/3), canyon.width/3, (height-floorPos_y)/3);
	// Refix
	rectMode(CORNER);

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
		//antenna
		line(gameChar_x, gameChar_y-35, gameChar_x+4, gameChar_y-45)
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
		//antenna
		line(gameChar_x, gameChar_y-35, gameChar_x-4, gameChar_y-45)
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
		//antenna
		line(gameChar_x, gameChar_y-35, gameChar_x+2, gameChar_y-45)
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
		//antenna
		line(gameChar_x, gameChar_y-35, gameChar_x-2, gameChar_y-45)
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
		//antenna
		line(gameChar_x-9, gameChar_y-35, gameChar_x-11, gameChar_y-45)
		line(gameChar_x+9, gameChar_y-35, gameChar_x+11, gameChar_y-45)
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
		//antenna
		line(gameChar_x-9, gameChar_y-35, gameChar_x-11, gameChar_y-45)
		line(gameChar_x+9, gameChar_y-35, gameChar_x+11, gameChar_y-45)
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

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	// checking left right
	if(isPlummeting == false){
		if(isLeft == true){
			gameChar_x -= 5;
		}else if(isRight == true){
			gameChar_x += 5;
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
	// check item
	if(isFound == false){
		// A collectable token
		fill(0,255,255);
		angleMode(DEGREES)
		stroke(0);
		quad(
			collectable.x_pos-1*collectable.size, collectable.y_pos-2*collectable.size,		
			collectable.x_pos+1*collectable.size, collectable.y_pos-2*collectable.size,
			collectable.x_pos+1*collectable.size, collectable.y_pos+2*collectable.size,
			collectable.x_pos-1*collectable.size, collectable.y_pos+2*collectable.size,
			);
		arc(collectable.x_pos, collectable.y_pos-1.9*collectable.size, 2*collectable.size, 2*collectable.size, 180, 0, OPEN)
		arc(collectable.x_pos, collectable.y_pos+1.9*collectable.size, 2*collectable.size, 2*collectable.size, 0, 180, OPEN)
		fill(255,255,0);
		beginShape();
		vertex(collectable.x_pos, collectable.y_pos-2.5*collectable.size);
		vertex(collectable.x_pos-0.8*collectable.size,collectable.y_pos+0.2*collectable.size);
		vertex(collectable.x_pos+0.2*collectable.size,collectable.y_pos+0.2*collectable.size);
		vertex(collectable.x_pos, collectable.y_pos+2.5*collectable.size);
		vertex(collectable.x_pos+0.8*collectable.size,collectable.y_pos-0.2*collectable.size)
		vertex(collectable.x_pos-0.2*collectable.size,collectable.y_pos-0.2*collectable.size);
		vertex(collectable.x_pos, collectable.y_pos-2.5*collectable.size);
		endShape();
	}
	// check item found
	if((isFound == false) && (Math.abs(gameChar_x - collectable.x_pos) <= 12)){
		isFound = true;
	}
	// line(canyon.x_pos+canyon.width/2, 0, canyon.x_pos+canyon.width/2, height)
	// check plummeting
	if((gameChar_y >= floorPos_y) && (gameChar_y < (floorPos_y+150)) && (Math.abs(gameChar_x - (canyon.x_pos+canyon.width/2)) <= 40)){
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
