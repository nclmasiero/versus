class Bot {
    constructor(game, player) {
        this.player = player;
        this.nearest = null;
        this.game = game;
    }

    update() {
        if(this.player.acceptBot == false) return;

        this.updateNearest();
        if(this.nearest == null) return;

        let headDirection = createVector(this.player.position.x, this.player.position.y);
        headDirection.sub(this.nearest.position);
        let stepForce = 3;
        headDirection.setMag(stepForce);
        this.player.speed.add(headDirection);

        let centerX = this.getCenterX();
        let distanceFromCenter = dist(centerX, height/2, this.player.position.x, this.player.position.y);
        let centerAttraction = createVector(centerX, height/2);
        centerAttraction.sub(this.player.position.x, this.player.position.y);
        centerAttraction.setMag(distanceFromCenter / 150);
        this.player.speed.add(centerAttraction);

        let randomWeight = 1;
        let randomModifier = createVector(random(-randomWeight, randomWeight), random(-randomWeight, randomWeight));
        this.player.speed.add(randomModifier);

    }

    // FUNCTIONS //
    updateNearest() {
        if(frameCount % 1 == 0) {
            this.nearest = this.getNearestEnemy();
        }
    }

    getCenterX() {
        if(this.player.side == -1) {
            return this.game.separator.position/2;
        } else return this.game.separator.position + (width-this.game.separator.position) / 2;
    }

    getNearestEnemy() {
        let nearest = null;
        let distance = width * height;
        for(let entity of this.game.entities) {
            if(entity.name != "Enemy") continue;
            if(!this.game.isInSide(entity, this.player.side)) continue;

            let currentDist = dist(entity.position.x, entity.position.y, this.player.position.x, this.player.position.y);
            if(currentDist < distance) {
                distance = currentDist;
                nearest = entity;
            }
        }

        return nearest;
    }
}