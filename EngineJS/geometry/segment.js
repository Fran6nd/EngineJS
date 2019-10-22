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
    isIntersectingOther(s) {
        var bbox = s.getBoundingBox();
        var myBbox = this.getBoundingBox();
        if (myBbox.intersectOther(bbox)) {
            var intersection = s.getLine().isIntersectingLine(this.getLine())
            if (intersection) {
                /* We know wich segment we are intesecting, at wich point... */
                return intersection;

            }
        }
        return false;
    }
}