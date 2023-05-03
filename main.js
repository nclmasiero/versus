var LEVEL;

function setup() {
    createCanvas(windowWidth, windowHeight);

    level = new Title();
}

function draw() {
    level.tick();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(typeof(level.resize) === "function") level.resize();
}