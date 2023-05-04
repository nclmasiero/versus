class Victory extends Level {
    constructor(player) {
        super();
        this.player = player;
    }

    render() {
        background(this.player.color.red, this.player.color.green, this.player.color.blue, 200);

        noStroke();
        fill(51);
        textSize(100);
        textAlign(CENTER, CENTER);
        text(this.getSide() + " Player Wins!", width/2, height/2);
    }

    getSide() {
        if(this.player.side == -1) return "Left";
        else return "Right";
    }
}