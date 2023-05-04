class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        let force = random(1, 2);
        this.speed = createVector(random(-force, force), random(-force, force));
        this.radius = 10;

        this.maxLifeSpan = 60 * 0.8;
        this.lifeSpan = this.maxLifeSpan;
    }

    update() {
        this.position.add(this.speed);

        this.lifeSpan--;
        if(this.lifeSpan <= 0) this.isDead = true;
    }

    render() {
        let alpha = round(map(this.lifeSpan, 0, this.maxLifeSpan, 0, 255));
        let radius = round(map(this.lifeSpan, 0, this.maxLifeSpan, 0, this.radius));

        stroke(51, alpha);
        strokeWeight(2);
        fill(51, alpha);
        circle(this.position.x, this.position.y, radius);
    }
}