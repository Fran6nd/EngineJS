class Collider {
    constructor(transform, enable = true) {
        this.transform = transform;
        this.triangles = new Array();
        this.enabled = enable;
    }
    add(triangle) {
        this.triangles.push(triangle);
    }
    setTransform(transform) {
        this.transform = transform;
        for (const t1 of this.triangles) {
            t1.setTransform(transform);
        }
    }
    isIntersectingCollider(col, transform, dtransform) {
        if (col.enabled) {
            for (const t1 of this.triangles) {
                for (const t2 of col.triangles) {
                    var res = t1.isIntersectingTriangle(t2, transform, dtransform);
                    if (res) {
                        return res;
                    }
                }
            }
        }
        return false;
    }
    isPointInside(point) {
        for (const t2 of this.triangles) {
            if (t1.isPointInside(point)) {
                return true;
            }
        }
        return false;
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    draw(ctx) {
        for (const t1 of this.triangles) {
            t1.draw(ctx);
        }
    }
}