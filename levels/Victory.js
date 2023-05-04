class Victory extends Level {
    constructor(player) {
        super();
        this.player = player;
    }

    render() {
        background(this.player.color.red, this.player.color.green, this.player.color.blue, 200);

        noFill();
        stroke(51);
        strokeWeight(6);
        textSize(150);
        textAlign(CENTER, CENTER);
        text(this.getSide() + " Player Wins!", width/2, height/2);
        
        noStroke();
        fill(51);
        textSize(50);
        text("Press F5 to Reset", width/2, height/2 + height/4);
    }

    getSide() {
        if(this.player.side == -1) return "Left";
        else return "Right";
    }
}