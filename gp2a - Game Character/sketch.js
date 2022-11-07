/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. Around 10-20 lines of code should work for each state of your game character.

*/

var gameChar_x = 0;
var gameChar_y = 0;

function setup()
{
	createCanvas(400, 600);
}

function draw()
{
	background(255);

	//Standing, facing frontwards
	stroke(100);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	//Add your code here ...
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

	//Jumping facing forwards
	stroke(100);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	//Add your code here ...
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

	//Walking, turned left
	stroke(100);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
	//Add your code here ...
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

	//Walking, turned right
	stroke(100);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	//Add your code here ...
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

	//Jumping right
	stroke(100);
	noFill();
	rect(20, 460, 50, 80);
	noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;
	//Add your code here ...
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

	//Jumping to the left
	stroke(100);
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	//Add your code here ...
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
