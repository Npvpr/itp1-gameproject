/*

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	treePos_x = width/2;
	treePos_y = height/2;

	canyon = {x_pos: 300, width: 100};
	collectable = {x_pos: 130, y_pos: 370, size: 10};

	mountain = {x_pos: treePos_x, y_pos: floorPos_y};
	cloud = {x_pos: 20, y_pos: 100};
}

function draw()
{
	background(100, 155, 255); //fill the sky blue
	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, height, width - floorPos_y); //draw some green ground

	// Cloud
	fill(255);
	ellipse(cloud.x_pos+150, cloud.y_pos, 50, 50)
	ellipse(cloud.x_pos+200, cloud.y_pos-30, 80, 80)
	ellipse(cloud.x_pos+250, cloud.y_pos, 50, 50)
	ellipse(cloud.x_pos+170, cloud.y_pos-20, 50, 50)
	ellipse(cloud.x_pos+235, cloud.y_pos-20, 50, 50)
	rect(cloud.x_pos+150, cloud.y_pos, 100, 50)

	fill(100, 155, 255);
	rect(cloud.x_pos+100, cloud.y_pos+25, 200, 100);

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

	// Standing, facing frontwards
	// Setup
	noFill();
	stroke(0);
	rectMode(CENTER);
	// head
	fill(0,255,255)
	rect(gameChar_x, gameChar_y-35, 16, 14, 4)
	fill(80,80,80)
	rect(gameChar_x, gameChar_y-35, 10, 8, 2)
	// eyes
	fill(0,255,255)
	stroke(0,255,255)
	ellipse(gameChar_x-2, gameChar_y-35, 2, 4)
	ellipse(gameChar_x+2, gameChar_y-35, 2, 4)
	stroke(0)
	// ears
	fill(80,80,80)
	ellipse(gameChar_x-9, gameChar_y-35, 2, 4)
	ellipse(gameChar_x+9, gameChar_y-35, 2, 4)
	noFill()
	// antenna
	line(gameChar_x-9, gameChar_y-35, gameChar_x-11, gameChar_y-45)
	line(gameChar_x+9, gameChar_y-35, gameChar_x+11, gameChar_y-45)
	// neck
	rect(gameChar_x, gameChar_y-27.5, 6, 1)
	// chest
	fill(80,80,80)
	rect(gameChar_x, gameChar_y-20, 22, 14, 2)
	// left arm
	fill(0,255,255)
	rect(gameChar_x-13.5, gameChar_y-18, 5, 14, 2.5)
	// right arm
	rect(gameChar_x+13.5, gameChar_y-18, 5, 14, 2.5)
	// trouser
	fill(80,80,80)
	quad(gameChar_x-5, gameChar_y-13, gameChar_x+5, gameChar_y-13, gameChar_x+2.5, gameChar_y-10, gameChar_x-2.5, gameChar_y-10)
	// left leg
	fill(0,255,255)
	rect(gameChar_x-5.5, gameChar_y-5, 5, 14, 2.5)
	// right leg
	rect(gameChar_x+5.5, gameChar_y-5, 5, 14, 2.5)
	// Refix
	rectMode(CORNER);

	// A collectable token
	// collectable = {x_pos: 100, y_pos: 100, size: 50};
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
	fill(255,255,0)
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

function mousePressed()
{
	gameChar_x = mouseX;
	gameChar_y = mouseY;

}
