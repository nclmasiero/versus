class Level {
    tick() {
        if(typeof(this.update) === "function") this.update();
        if(typeof(this.render) === "function") this.render();
    }
}