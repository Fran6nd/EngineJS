class BoundingBox {
    constructor(p1, p2) {
        this.minPoint = new Vector2D(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
        this.maxPoint = new Vector2D(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
        this.p1 = new Vector2D(this.minPoint.x, this.minPoint.y);
        this.p2 = new Vector2D(this.minPoint.x, this.maxPoint.y);
        this.p3 = new Vector2D(this.maxPoint.x, this.minPoint.y);
        this.p4 = new Vector2D(this.maxPoint.x, this.maxPoint.y);
    }
    isPointInside(p) {
        return p.x >= this.minPoint.x && p.y >= this.minPoint.y && p.x <= this.maxPoint.x && p.y <= this.maxPoint.y;
    }
    intersectOther(box) {
        if (this.isPointInside(box.p1) || this.isPointInside(box.p2) || this.isPointInside(box.p3) || this.isPointInside(box.p4)) {
            return true;
        }
        if (box.isPointInside(this.p1) || box.isPointInside(this.p2) || box.isPointInside(this.p3) || box.isPointInside(this.p4)) {
            return true;
        }
        return false;
    }
}