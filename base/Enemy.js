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
        let y = random(this.maxRadius, height - this.maxRadius);

        this.position = createVector(x, y);

        this.correctSpawnDistance();

        this.spawnTime = random(1.3, 1.6); // in seconds

        this.isHoming = false;
        if(random(100) < 8) this.isHoming = true;

    }

    update() {
        if(this.radius < this.maxRadius) this.radius += this.maxRadius/(this.spawnTime * 60);
        else {
            if(this.speed == null) this.speed = this.getSpeed();
            else {
                if(this.isHoming) this.speed = this.getSpeed();
                this.position.add(this.speed);

                this.checkBorders();                
            }
        }
    }

    render() {
        stroke(51);
        strokeWeight(2);
        fill(200, 50, 50);
        if(this.isHoming) {
            rectMode(CENTER);
            rect(this.position.x, this.position.y, this.radius*2, this.radius*2);
        } else circle(this.position.x, this.position.y, this.radius*2);
    }

    // FUNCTIONS //

    collision(other) {
        if(other.name == "Enemy") {
            this.explode();
        }
    }

    correctSpawnDistance() {
        let maxDistance = this.target.radius * 10;
        let distance = dist(this.position.x, this.position.y, this.target.position.x, this.target.position.y);
        if(distance >= maxDistance) return;

        let correctionVector = createVector(this.position.x, this.position.y);
        correctionVector.sub(this.target.position);
        correctionVector.setMag(maxDistance);
        this.position.x = this.target.position.x;
        this.position.y = this.target.position.y;
        this.position.add(correctionVector);
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

    explode(isPositive = true) {
        this.game.particleEffect(this.position.x, this.position.y, 3);
        if(isPositive) this.target.addScore(1);
        this.isDead = true;
    }
}