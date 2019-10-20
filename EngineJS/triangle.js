class Triangle {
    constructor(center, p1, p2, p3) {
        this.center = center;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.baseP1 = p1.copy();
        this.baseP2 = p2.copy();
        this.baseP3 = p3.copy();
    }
    setTransform(transform) {
        this.center = transform.position.copy();
        this.p1 = this.baseP1.copy();
        this.p2 = this.baseP2.copy();
        this.p3 = this.baseP3.copy();
        this.p1.incrementArg(transform.rotation).increment(this.center);
        this.p2.incrementArg(transform.rotation).increment(this.center);
        this.p3.incrementArg(transform.rotation).increment(this.center);
    }
    static sign(point, p1, p2) {
        return (point.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (point.y - p1.y);
    }
    isPointInside(p) {
        var b1 = Triangle.sign(p, this.p1, this.p2) > 0;
        var b2 = Triangle.sign(p, this.p2, this.p3) > 0;
        var b3 = Triangle.sign(p, this.p3, this.p1) > 0;
        return ((b1 == b2) && (b2 == b3));
    }
    isIntersectingTriangle(t) {
        if (this.isPointInside(t.p1)) {
            return true;
        }
        if (this.isPointInside(t.p2)) {
            return true;
        }
        if (this.isPointInside(t.p3)) {
            return true;
        }
        if (t.isPointInside(this.p1)) {
            return true;
        }
        if (t.isPointInside(this.p2)) {
            return true;
        }
        if (t.isPointInside(this.p3)) {
            return true;
        }
    }
    draw(ctx) {
        Drawing.drawTriangle(ctx, this.p1, this.p2, this.p3);
    }
}