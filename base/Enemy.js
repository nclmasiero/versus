class Enemy {
    constructor(game, targetPlayer) {
        this.name = "Enemy";
        this.target = targetPlayer;
        this.side = this.target.side;
        this.game = game;

        this.maxRadius = round(random(8, 10));
        this.radius = 0;

        this.speed = null;

        let x = random(this.maxRadius, this.game.separator.position - this.maxRadius);
        if(this.side == 1) x += this.game.separator.position;

        this.position = createVector(x, random(height));

        this.spawnTime = random(1.3, 1.6); // in seconds

    }

    update() {
        if(this.radius < this.maxRadius) this.radius += this.maxRadius/(this.spawnTime * 60);
        else {
            if(this.speed == null) this.speed = this.getSpeed();
            else {
                this.position.add(this.speed);

                this.checkBorders();                
            }
        }
    }

    render() {
        stroke(51);
        strokeWeight(2);
        fill(200, 50, 50);
        circle(this.position.x, this.position.y, this.radius*2);
    }

    // FUNCTIONS //

    collision(other) {
        if(other.name == "Enemy") {
            this.explode();
        }
    }

    checkBorders() {
        if(this.side == -1) {
            if(this.position.x > this.game.separator.position - this.radius) this.explode();
        } else {
            if(this.position.x < this.game.separator.position + this.radius) this.explode();
        }

        if(this.position.x < this.radius || this.position.x > width - this.radius) this.explode();
        if(this.position.y < this.radius || this.position.y > height - this.radius) this.explode();
    }

    getSpeed() {
        let targetPosition = createVector(this.target.position.x, this.target.position.y);
        targetPosition.sub(this.position);

        let mag = 3;
        targetPosition.setMag(mag);
        return targetPosition;
    }

    explode() {
        this.game.particleEffect(this.position.x, this.position.y, 3);
        this.isDead = true;
    }
}