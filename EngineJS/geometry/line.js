class Line {
    constructor(a, b, point) {
        this.a = a;
        this.b = b;
        this.vertical = true ? a == null : false;
        this.horizontal = true ? a == 0 : false;
        this.aPoint = point;
    }
    isPointOnMe(point) {
        var expectedValue = this.a * point.x + this.b;
        return expectedValue == point.y;
    }
    isIntersectingLine(l) {
        if (l.a == this.a) {
            return false;
        }
        else if (l.vertical || this.vertical) {
            var vert = l.vertical ? l.copy() : this.copy();
            var other = !l.vertical ? l.copy() : this.copy();
            var x = vert.aPoint.x;
            var y = other.a * x + other.b;
            return new Vector2D(x, y);

        }
        else {
            var x = (this.b - l.b) / (l.a - this.a);
            var y = this.a * x + this.b;
            return new Vector2D(x, y);
        }

    }
    copy() {
        return new Line(this.a, this.b, this.aPoint);
    }
}