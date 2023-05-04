class InterfaceRenderer {
    constructor(game) {
        this.renderPriority = 20;
        this.game = game;
    }

    render() {
        for(let player of this.game.players) {
            this.renderHealth(player);
            this.renderScore(player);
        }
    }

    // FUNCTIONS //

    renderHealth(player) {
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

    renderScore(player) {
        noStroke();
        fill(51);
        textAlign(CENTER, CENTER);

        let x = this.game.separator.position + (this.game.separator.position/2 * player.side);
        let y = height/15;

        textSize(40);
        text(player.score, x, y);
    
        textSize(20);
        text("x" + player.momentum, x + 15 + 12 * player.score.toString().length, y + 4);
    }
}