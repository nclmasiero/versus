var LEVEL;

function setup() {
    createCanvas(windowWidth, windowHeight);

    level = new Game();
}

function draw() {
    level.tick();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(typeof(level.resize) === "function") level.resize();
}

// FUNCTIONS //

var playerKeys = [
    {
        up: 87,
        down: 83,
        right: 68,
        left: 65
    },
    {
        up: 38,
        down: 40,
        left: 37,
        right: 39
    }
];
var lastPlayerKeysIndex = -1;
function getNextPlayerKeys() {
    lastPlayerKeysIndex++;
    return playerKeys[lastPlayerKeysIndex];
}