/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.

WARNING: Do not get too carried away. If you're shape takes more than 15 lines of code to draw then you've probably over done it.


*/

function setup()
{
	createCanvas(1024, 576);
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(182,91,52);
	rect(0, 432, 1024, 144); //draw some green ground

	//1. a cloud in the sky
	fill(255);
	ellipse(250, 100, 50, 50)
	ellipse(300, 70, 80, 80)
	ellipse(350, 100, 50, 50)
	ellipse(270, 80, 50, 50)
	ellipse(335, 80, 50, 50)
	rect(250, 100, 100, 50)

	fill(100, 155, 255);
	rect(200, 125, 200, 100);
	//... add your code here

	//2. a mountain in the distance
	fill(219, 115, 70);
	rect(420, 230, 120, 202);
	rect(400, 392, 20, 40);
	triangle(410, 392, 420, 230, 420, 392);
	triangle(540, 230, 540, 432, 580, 432);

	quad(530, 432, 600, 250, 630, 250, 630, 432);
	quad(550, 432, 630, 230, 700, 230, 750, 432);
	quad(700, 260, 730, 260, 750, 320, 700, 320);
	quad(700, 320, 770, 320, 790, 380, 700, 380);
	quad(700, 380, 810, 380, 830, 432, 700, 432);
	//... add your code here

	//3. a tree
	fill(44, 145, 26);
	rect(920, 352, 30, 80);
	ellipse(935, 352, 30, 30);

	quad(920, 372, 920, 402, 900, 382, 900, 352);
	ellipse(900, 367, 13, 30);

	quad(950, 392, 950, 422, 970, 392, 970, 362);
	ellipse(970, 377, 10, 30);

	stroke(0);

	point(930, 352);
	point(930, 362);
	point(930, 372);
	point(930, 382);
	point(930, 392);
	point(930, 402);
	point(930, 412);
	point(930, 422);

	point(940, 352);
	point(940, 362);
	point(940, 372);
	point(940, 382);
	point(940, 392);
	point(940, 402);
	point(940, 412);
	point(940, 422);

	point(900, 365);
	point(910, 375);
	point(920, 385);
	
	point(968, 380);
	point(962, 390);
	point(955, 400);

	//... add your code here

	//4. a canyon
	noStroke();
	fill(100, 155, 255);
	rect(150, 432, 150, 200);

	fill(182,91,52);
	rect(0, 432, 170, 50);
	rect(280, 432, 20, 50);

	fill(111,63,65);
	rect(0, 482, 190, 50);
	rect(260, 482, 1000, 50);

	fill(77,44,62);
	rect(0, 532, 210, 50);
	rect(240, 532, 1000, 50);
	//NB. the canyon should go from ground-level to the bottom of the screen

	//5. a collectable token - eg. a jewel, fruit, coins
	stroke(0);
	fill(212, 160, 4);
	ellipse(350, 402, 40, 40);
	ellipse(350, 402, 35, 35);
	//... add your code here

}
