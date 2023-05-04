class Player {

    static getPlayers() {
        let ret = [];
        for(let i = 0; i < 2; i++) {
            ret.push(new Player({
                x: width/4 + i*width/2,
                y: height/2,
                color: {
                    red: random(100, 200),
                    green: random(100, 200),
                    blue: random(100, 200)
                },
                keys: getNextPlayerKeys()
            }))
        }
        return ret;
    }

    constructor(settings) {
        this.position = createVector(settings.x, settings.y);
        this.speed = createVector(0, 0);
        this.radius = 35;

        this.color = settings.color;

        this.keys = settings.keys;

        this.renderPriority = 10;
    }

    update() {
        this.applySpeed();
        this.applyFriction();
        this.capSpeed();

        this.getInput();
    }

    render() {
        stroke(51);
        strokeWeight(2);
        fill(this.color.red, this.color.green, this.color.blue);
        circle(this.position.x, this.position.y, this.radius*2);
    }

    // FUNCTIONS //

    applySpeed() {
        this.position.add(this.speed);
    }

    capSpeed() {
        let cap = 8;
        
        if(this.speed.x > cap) this.speed.x = cap;
        if(this.speed.x < -cap) this.speed.x = -cap;
        if(this.speed.y > cap) this.speed.y = cap;
        if(this.speed.y < -cap) this.speed.y = -cap;
    }

    applyFriction() {
        let force = 0.5;

        this.speed.x += -Math.sign(this.speed.x) * force;
        this.speed.y += -Math.sign(this.speed.y) * force;

        if(abs(this.speed.x) < force && abs(this.speed.y) < force) {
            this.speed.x = 0;
            this.speed.y = 0;
        }
    }

    getInput() {
        let xDirection = 0;
        let yDirection = 0;

        if(keyIsDown(this.keys.left)) xDirection--;
        if(keyIsDown(this.keys.right)) xDirection++;
        if(keyIsDown(this.keys.up)) yDirection--;
        if(keyIsDown(this.keys.down)) yDirection++;

        let step = 1.5;
        this.speed.x += step * xDirection;
        this.speed.y += step * yDirection;
    }
}