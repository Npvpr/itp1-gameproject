function preload(){
    fullImg = loadImage("./images/batteryLifeFull.png");
}
function setup(){
    createCanvas(2000, 2000);
    image(fullImg, 0, 0);
    fullImg.resize(10, 5);
}