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
    isIntersectingTriangle(t, transform, dtransform) {
        if (this.isPointInside(t.p1)) {
            return new HitPoint(t.p1, this, transform, dtransform, false);
        }
        if (this.isPointInside(t.p2)) {
            return new HitPoint(t.p2, this, transform, dtransform, false);
        }
        if (this.isPointInside(t.p3)) {
            return new HitPoint(t.p3, this, transform, dtransform, false);
        }
        if (t.isPointInside(this.p1)) {
            return new HitPoint(this.p1, t, transform, dtransform);
        }
        if (t.isPointInside(this.p2)) {
            return new HitPoint(this.p2, t, transform, dtransform);
        }
        if (t.isPointInside(this.p3)) {
            return new HitPoint(this.p3, t, transform, dtransform);
        }
        return false;
    }

    draw(ctx) {
        Drawing.drawTriangle(ctx, this.p1, this.p2, this.p3);
    }
}
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
}
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
class HitPoint {
    constructor(point, triangle, transform, dtransform, pointMoved = true) {
        /* Base on https://martin-thoma.com/how-to-check-if-two-line-segments-intersect/ */
        /* If one of the moved points is inside a triangle: */
        this.pos = null;
        var previousPoint;
        if (pointMoved) {
            /* Let's get the previous point position: */
            previousPoint = point.copy().decrement(dtransform.position.decrementArg(dtransform.rotation));
        }
        else {
            previousPoint = point.copy().increment(dtransform.position.incrementArg(dtransform.rotation));
        }
        if (previousPoint) {
            var crossingSegment = new Segment(previousPoint, point);
            var segments = new Array();
            segments.push(new Segment(triangle.p1, triangle.p2));
            segments.push(new Segment(triangle.p2, triangle.p3));
            segments.push(new Segment(triangle.p3, triangle.p1));
            var crossingSegmentBoundingbox = crossingSegment.getBoundingBox();
            for (const s of segments) {
                var bbox = s.getBoundingBox();
                if (crossingSegmentBoundingbox.intersectOther(bbox)) {
                    var intersection = s.getLine().isIntersectingLine(crossingSegment.getLine())
                    if (intersection) {
                        //console.log(intersection.x.toString() + ' ' + intersection.y.toString());
                        //if (crossingSegmentBoundingbox.isPointInside(intersection) && bbox.isPointInside(intersection))
                        {
                            /* We know wich segment we are intesecting, at wich point... */
                            console.log(intersection.x.toString() + ' ' + intersection.y.toString());
                            this.pos = intersection;
                            this.segmentHit = s;
                        }
                    }
                }
            }
        }
    }
    draw(ctx)
    {
        if (this.pos)
            Drawing.drawCross(ctx, this.pos);
    }
}
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
            console.log('Error Case');
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
            console.log('a1: ' + this.a.toString() + ' b1: ' + this.b.toString() + '  a2: ' + l.a.toString() + ' b2: ' + l.b.toString());
            return new Vector2D(x, y);
        }

    }
    copy()
    {
        return new Line(this.a, this.b, this.aPoint);
    }
}