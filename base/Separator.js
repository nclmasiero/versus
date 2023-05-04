class Separator {
    constructor(game, startingPoint = width/2) {
        this.destination = startingPoint;
        this.position = this.destination;

        this.game = game;
    }

    update() {
        this.position += (this.destination - this.position) / 20;

        let p1 = this.game.players[0];
        let p2 = this.game.players[1];
        let modifier = (p1.score - p2.score) * 0.01;
        this.destination += modifier;
    }

    render() {
        noFill();
        stroke(51);
        strokeWeight(3);
        line(this.position, 0, this.position, height);
    }

    // FUNCTIONS //

    addPosition(pos) {
        this.destination += pos;
    }

    setPosition(pos) {
        this.destination = pos;
    }
}