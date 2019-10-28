class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.vertical = null;
        this.horizontal = null;
        /* Equation of line: y = ax + b. */
        if (p1.x - p2.x == 0) {
            this.a = null;
            this.b = null;
            this.vertical = true;
            this.x = p1.x;
        }
        else {
            this.a = (p1.y - p2.y) / (p1.x - p2.x);
            if (this.a == 0) {
                this.horizontal = true;
                this.b = p1.y;
            }
            else {
                this.b = p1.y - p1.x * this.a;
            }
        }
    }
    getLine() {
        return new Line(this.a, this.b, this.p1.copy());
    }
    getBoundingBox() {
        return new BoundingBox(this.p1, this.p2);
    }
    round() {
        return new Segment(this.p1.round(), this.p2.round());
    }
    isIntersectingOther(s) {
        var _s = s.round();
        var _this = this.round();
        var bbox = _s.getBoundingBox();
        var myBbox = _this.getBoundingBox();
        if (myBbox.intersectOther(bbox)) {
            var intersection = _s.getLine().isIntersectingLine(_this.getLine());
            if (_s.getBoundingBox().isPointInside(intersection)) {
                /* We know wich segment we are intesecting, at wich point... */
                return intersection;
            }
        }
        return false;
    }
}