class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.vertical = null;
        this.horizontal = null;
        /* Equation of line: y = ax + b. */
        if (p1.x == p2.x) {
            this.a = null;
            this.b = null;
            this.vertical = true;
            this.x = p1.x;
        }
        else if (p1.y == p2.y) {
            this.a = 0;
            this.b = p1.x;
            this.horizontal = true;
        }
        else {
            this.a = (p1.y - p2.y) / (p1.x - p2.x);
            this.b = p1.y - p1.x * this.a;
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
        var _s = s;
        var _this = this;
        var bbox = _s.getBoundingBox();
        var myBbox = _this.getBoundingBox();
        if (myBbox.intersectOther(bbox)) {
            if (this.getLine().a == s.getLine().a && this.getLine().a != null) {
                if (this.vertical && s.vertical) {
                    console.log('fail 1');
                    var x = this.p1.x;
                    var maxCommonY = Math.min(Math.max(this.p1.y, this.p2.y), Math.max(s.p1.y, s.p2.y));
                    var minCommonY = Math.max(Math.min(this.p1.y, this.p2.y), Math.min(s.p1.y, s.p2.y));
                    var delta = maxCommonY - minCommonY;
                    var y = minCommonY + delta / 2;
                    return new Vector2D(x, y);
                }
                else if (this.horizontal && s.horizontal) {
                    var y = this.p1.y;
                    var maxCommonX = Math.min(Math.max(this.p1.x, this.p2.x), Math.max(s.p1.x, s.p2.x));
                    var minCommonX = Math.max(Math.min(this.p1.x, this.p2.x), Math.min(s.p1.x, s.p2.x));
                    var delta = maxCommonX - minCommonX;
                    var x = minCommonX + delta / 2;
                    return new Vector2D(x, y);
                    return false;
                }
                else {
                    console.log('=======');
                    var thisMinX = Math.min(this.p1.x, this.p2.x);
                    var thisMaxX = Math.min(this.p1.x, this.p2.x);
                    var sMinX = Math.min(s.p1.x, s.p2.x);
                    var sMaxX = Math.min(s.p1.x, s.p2.x);
                    var minCommonX = Math.max(thisMinX, sMinX);
                    var maxCommonX = Math.min(thisMaxX, sMaxX);
                    var delta = maxCommonX - minCommonX;
                    var x = minCommonX - delta / 2;
                    var y = this.getLine().a * x + this.getLine().b;
                    return new Vector2D(x, y);
                }
            }
            var intersection = s.getLine().isIntersectingLine(this.getLine());
            if (s.getBoundingBox().isPointInside(intersection)) {
                /* We know wich segment we are intesecting, at wich point... */
                return intersection;
            }
        }
        return false;
    }
}