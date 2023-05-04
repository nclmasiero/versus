class EnemySpawner {
    constructor(game) {
        this.game = game;

        this.frequencies = [60, 60];
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
        for(let i = 0; i < this.frequencies.length; i++) {
            this.frequencies[i] = max(15, this.frequencies[i]);
        }
    }
}