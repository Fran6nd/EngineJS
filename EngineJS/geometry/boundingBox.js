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
        if (p) {
            var _p = p;
            if (_p.x >= this.minPoint.x && _p.y >= this.minPoint.y && _p.x <= this.maxPoint.x && _p.y <= this.maxPoint.y)
                return true;
        }
        return false;
    }
    intersectOther(box) {
        if (this.isPointInside(box.p1) || this.isPointInside(box.p2) || this.isPointInside(box.p3) || this.isPointInside(box.p4)) {
            return true;
        }
        if (box.isPointInside(this.p1) || box.isPointInside(this.p2) || box.isPointInside(this.p3) || box.isPointInside(this.p4)) {
            return true;
        }
        if ((box.minPoint.y == box.maxPoint.y)||(this.minPoint.y == this.maxPoint.y)) {
            if ((this.minPoint.x >= box.minPoint.x && this.minPoint.x <= box.maxPoint.x) || (this.maxPoint.x >= box.minPoint.x && this.maxPoint.x <= box.maxPoint.x)) {
                return true;
            }
            if ((box.minPoint.x >= this.minPoint.x && box.minPoint.x <= this.maxPoint.x) || (box.maxPoint.x >= this.minPoint.x && box.maxPoint.x <= this.maxPoint.x)) {
                return true;
            }
        }
        if ((box.minPoint.x == box.maxPoint.x)||(this.minPoint.x == this.maxPoint.x)) {
            if ((this.minPoint.y >= box.minPoint.y && this.minPoint.y <= box.maxPoint.y) || (this.maxPoint.y >= box.minPoint.y && this.maxPoint.y <= box.maxPoint.y)) {
                return true;
            }
            if ((box.minPoint.y >= this.minPoint.y && box.minPoint.y <= this.maxPoint.y) || (box.maxPoint.y >= this.minPoint.y && box.maxPoint.y <= this.maxPoint.y)) {
                return true;
            }
        }
        return false;
    }
}