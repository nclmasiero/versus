class Player {

    static getPlayers(game) {
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
                side: -1 + 2*i,
                keys: getNextPlayerKeys(),
                game: game
            }))
        }
        return ret;
    }

    constructor(settings) {
        this.name = "Player";
        this.position = createVector(settings.x, settings.y);
        this.speed = createVector(0, 0);
        this.radius = 35;

        this.color = settings.color;

        this.keys = settings.keys;

        this.renderPriority = 10;

        this.maxHealth = 3;
        this.health = this.maxHealth;

        this.side = settings.side;
        this.game = settings.game;

        this.maxBlinkDelay = 60 * 1.2;
        this.blinkDelay = 0;
        this.doRender = true;

        this.score = 0;
        this.momentum = 1;
        this.momentumModifier = 0;
    }

    update() {
        this.applySpeed();
        this.applyFriction();
        this.capSpeed();

        this.checkBorders();

        this.getInput();
        this.updateBlinking();
    }

    render() {
        stroke(51);
        strokeWeight(2);
        fill(this.color.red, this.color.green, this.color.blue);
        if(this.doRender) circle(this.position.x, this.position.y, this.radius*2);
    }

    // FUNCTIONS //

    collision(other) {
        if(this.blinkDelay > 0) return;
        
        if(other.name == "Enemy") {
            this.bounceFromEntity(other);
            other.explode(false);
            this.hit();
        }
    }

    blink() {
        this.blinkDelay = this.maxBlinkDelay;
    }

    updateBlinking() {
        this.blinkDelay = max(0, this.blinkDelay - 1);
        if(this.blinkDelay > 0) {
            if(frameCount % 10 == 0) this.doRender = !this.doRender;
        } else this.doRender = true;
    }

    checkBorders() {
        if(this.position.x > width - this.radius) this.position.x = width - this.radius;
        if(this.position.x < this.radius) this.position.x = this.radius;

        if(this.side == -1) {
            if(this.position.x > this.game.separator.position - this.radius) this.position.x = this.game.separator.position - this.radius;
        } else {
            if(this.position.x < this.game.separator.position + this.radius) this.position.x = this.game.separator.position + this.radius;
        }

        if(this.position.y < 0) this.position.y = 0;
        if(this.position.y > height) this.position.y = height;
    }

    hit(damage=1) {
        this.health -= damage;
        this.blink();
        this.momentumModifier = 0;
        this.momentum = 1;

        if(this.health <= 0) this.isDead = true;
    }

    bounceFromEntity(other) {
        let bounceVector = createVector(this.position.x, this.position.y);
        bounceVector.sub(other.position);
        let force = 10;
        bounceVector.setMag(force);
        this.speed.add(bounceVector);
    }

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

    addScore(amount) {
        this.score += amount * this.momentum;
        this.momentumModifier++;

        if(this.momentumModifier >= 20) {
            this.momentumModifier = 0;
            this.momentum++;
        }
    }
}