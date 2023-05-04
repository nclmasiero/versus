class Collision {
    static isOverlapping(a, b) {
        let distance = dist(a.position.x, a.position.y, b.position.x, b.position.y);
        let rSum = a.radius + b.radius;
        return distance <= rSum;
    }

    static checkAllCollisions(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if(!(arr[i].position && arr[j].position)) continue;

                if (this.isOverlapping(arr[i], arr[j])) {
                    if(typeof(arr[i].collision) === "function") arr[i].collision(arr[j]);
                    if(typeof(arr[j].collision) === "function") arr[j].collision(arr[i]);
                }
            }
        }
    }
}