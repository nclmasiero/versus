class Separator {
    constructor(startingPoint = width/2) {
        this.destination = startingPoint;
        this.position = this.destination;
    }

    update() {
        this.position += (this.destination - this.position) / 20;
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