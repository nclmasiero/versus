class EnemySpawner {
    constructor(game) {
        this.game = game;

        this.frequencies = [0, 0];
    }

    update() {
        for(let i = 0; i < 2; i++) {
            if(frameCount % this.frequencies[i] == 0) this.spawn(this.game.players[i]);
        }

        this.updateFrequencies();
    }

    // FUNCTIONS //

    spawn(player) {
        this.game.addEntity(new Enemy(this.game, player));
    }

    updateFrequencies() {
        this.frequencies[0] = 60;
        this.frequencies[1] = 60;
    }
}