class Game extends Level {
    constructor() {
        super();
        this.entities = [];
        this.players = Player.getPlayers();
        this.entities.push(this.players[0], this.players[1]);
    }

    update() {
        for(let entity of this.entities) {
            entity.update();
        }
    }

    render() {
        background(200);
        for(let entity of this.entities) {
            entity.render();
        }
    }
    
    addEntity(entity) {
        this.entities.push(entity);
    }
}