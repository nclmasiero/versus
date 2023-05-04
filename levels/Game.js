class Game extends Level {
    constructor() {
        super();
        this.entities = [];
    }
    
    setup() {
        this.players = Player.getPlayers(this);
        this.separator = new Separator();
        this.interface = new InterfaceRenderer(this);
        this.spawner = new EnemySpawner(this);
    
        this.addEntity(this.players[0]);
        this.addEntity(this.players[1]);
        this.addEntity(this.separator);

        this.addEntity(this.spawner);

        this.addEntity(this.interface);
    }

    update() {
        for(let entity of this.entities) {
            if(typeof(entity.update) === "function") entity.update();
        }

        for(let i = this.entities.length - 1; i >= 0; i--) {
            if(this.entities[i].isDead) this.entities.splice(i, 1);
        }

        Collision.checkAllCollisions(this.entities);
    }

    render() {
        background(200);
        for(let entity of this.entities) {
            if(typeof(entity.render) === "function") entity.render();
        }
    }
    
    addEntity(entity) {
        this.entities.push(entity);
    }

    particleEffect(x, y, amount) {
        for(let i = 0; i < amount; i++) {
            this.addEntity(new Particle(x, y));
        }
    }
}