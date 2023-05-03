class Level {
    constructor(name) {
        this.name = name;
    }

    tick() {
        if(typeof(this.update) === "function") this.update();
        if(typeof(this.render) === "function") this.render();
    }
}