var LEVEL;

function setup() {
    createCanvas(windowWidth, windowHeight);

    LEVEL = new Game();
    LEVEL.setup();
}

function draw() {
    LEVEL.tick();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(typeof(level.resize) === "function") level.resize();
}

// FUNCTIONS //

function setLevel(level) {
    LEVEL = level;
    LEVEL.setup();
}

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