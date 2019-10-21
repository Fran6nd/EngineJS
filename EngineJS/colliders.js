class Colliders {
    constructor() {
        this.colliders = new Map();
        this.instantiateId = 0;
    }
    isIntersectingColliders(col, transform, dtransform) {
        for (const [k1, c1] of this.colliders.entries()) {
            for (const [k2, c2] of col.colliders.entries()) {
                var res = c1.isIntersectingCollider(c2, transform, dtransform)
                if (res) {
                    return res;
                }
            }
        }
        return false;
    }
    isPointInside(point)
    {
        for (const [k1, c1] of this.colliders.entries()) {
            if (c1.isPointInside(p))
            {
                return true;
            }
        }
        return false;
    }
    add(collider) {
        this.instantiateId++;
        var id = this.instantiateId.toString(10);
        this.colliders.set(id, collider);
        collider.id = id;
        return id;
    }
    remove(id) {
        this.colliders.delete(id);
    }
    enable(id) {
        this.colliders.get(id).enable();
    }
    disable(id) {
        this.colliders.get(id).disable();
    }
    enableAll() {
        for (const [key, value] of this.colliders.entries()) {
            value.enable();
        }
    }
    disableAll() {
        for (const [key, value] of this.colliders.entries()) {
            value.disable();
        }
    }
    draw(ctx) {
        for (const [key, value] of this.colliders.entries()) {
            value.draw(ctx);
        }
    }
    update(transform) {
        for (const [key, value] of this.colliders.entries()) {
            value.setTransform(transform);
        }
    }
}