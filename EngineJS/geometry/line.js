class Line {
    constructor(a, b, point) {
        this.a = a;
        this.b = b;
        this.vertical = a == null ? true : false;
        this.horizontal = a == 0 ? true : false;
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
        else if (l.horizontal || this.horizontal) {
            var horizontal = l.horizontal ? l.copy() : this.copy();
            var other = !l.horizontal ? l.copy() : this.copy();
            var y = horizontal.aPoint.y;
            var x = (y - other.b) / other.a;
            return new Vector2D(x, y);
        }
        else {
            var x = (this.b - l.b) / (l.a - this.a);
            var y = this.a * x + this.b;
            return new Vector2D(x, y);
        }

    }
    print()
    {
        console.log('Line: ' + this.a.toString() + 'x + ' + this.b.toString());
    }
    copy() {
        return new Line(this.a, this.b, this.aPoint);
    }
}