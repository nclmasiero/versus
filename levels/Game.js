class Game extends Level {
    constructor() {
        super();
        this.entities = [];
    }
    
    setup() {
        this.players = Player.getPlayers(this);
        this.separator = new Separator(this);
        this.interface = new InterfaceRenderer(this);
        this.spawner = new EnemySpawner(this);
    
        this.addEntity(this.players[0]);
        this.addEntity(this.players[1]);
        this.addEntity(this.separator);

        this.addEntity(this.spawner);

        this.addEntity(this.interface);

        this.addEntity(new Bot(this, this.players[1]));
    }

    update() {
        if(this.players[0].isDead) setLevel(new Victory(this.players[1]));
        if(this.players[1].isDead) setLevel(new Victory(this.players[0]));

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

        rectMode(CORNER);
        let rectsAlpha = 50;
        fill(this.players[0].color.red, this.players[0].color.green, this.players[0].color.blue, rectsAlpha);
        rect(0, 0, this.separator.position, height);
        fill(this.players[1].color.red, this.players[1].color.green, this.players[1].color.blue, rectsAlpha);
        rect(this.separator.position, 0, width, height);

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

    isInSide(entity, side) {
        if (side == -1) return entity.position.x < this.separator.position;
        if (side == 1) return entity.position.x > this.separator.position;
    }
}