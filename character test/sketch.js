
var gameChar_x = 100;
var gameChar_y = 100;

function setup()
{
	createCanvas(1000, 1000);
}

function draw()
{
	background(255);

	rect(gameChar_x, gameChar_y, 50, 30, 0, 0, 10, 10);
	arc(gameChar_x+25, gameChar_y+9, 54, 50, 3.45, 5.95,  OPEN)
}
