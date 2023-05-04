class InterfaceRenderer {
    constructor(game) {
        this.renderPriority = 20;
        this.game = game;
    }

    render() {
        for(let player of this.game.players) {
            let toFill = player.health;
            let radius = 30;

            for(let i = 0; i < player.maxHealth; i++) {
                stroke(51);
                strokeWeight(2);
                noFill();
                if(toFill > 0) fill(player.color.red, player.color.green, player.color.blue);
                let circleX = (width/2 + (width/2 - radius) * player.side) + (radius + radius/3) * i * -player.side;
                circle(circleX, height - radius, radius);

                toFill--;
            }
        }
    }
}