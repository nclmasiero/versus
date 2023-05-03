class Entity {

    static getStaticEntity(name) {
        return new Entity(name, -5000, -5000, 0, true);
    }

    constructor(name, x, y, radius, isStatic = false) {
        this.name = name;
        this.position = createVector(x, y);
        this.radius = radius;
        this.isStatic = isStatic;
    }

    tick() {
        if(typeof(this.update) === "function") this.update();
        if(typeof(this.render) === "function") this.render();
    }
}