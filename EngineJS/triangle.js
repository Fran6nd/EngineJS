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
            return new HitPoint(this.p3, t, transform, dtransform, false);
        }
        if (this.isPointInside(t.p2)) {
            return new HitPoint(this.p3, t, transform, dtransform, false);
        }
        if (this.isPointInside(t.p3)) {
            return new HitPoint(this.p3, t, transform, dtransform, false);
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
            this.a = 0;
            this.b = null;
            this.vertical = true;
        }
        else {
            this.a = (p1.y - p2.y) / (p1.x - p2.x);
            if (this.a == 0) {
                this.horizontal = true;
                this.b = p1.x;
            }
            else {
                this.b = p1.y - p1.x * this.a;
            }
        }
    }
    getLine() {
        return new Line(this.a, this.b);
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
            previousPoint = point.copy().decrement(dtransform.position);
        }
        else {
           previousPoint = point.copy().increment(dtransform.position);
        }
        if (previousPoint) {
            var crossingSegment = new Segment(previousPoint, point);
            var segments = new Array();
            segments.push(new Segment(triangle.p1, triangle.p2));
            segments.push(new Segment(triangle.p2, triangle.p3));
            segments.push(new Segment(triangle.p3, triangle.p1));
            var segmentsWithCrossingBoundingBoxes = new Array();
            var crossingSegmentBoundingbox = crossingSegment.getBoundingBox();
            for (const s of segments) {
                var bbox = s.getBoundingBox();
                if (crossingSegmentBoundingbox.intersectOther(bbox)) {
                    var intersection = s.getLine().isIntersectingLine(crossingSegment.getLine())
                    if (intersection) {
                        if (crossingSegmentBoundingbox.isPointInside(intersection) && bbox.isPointInside(intersection)) {
                            /* We know wich segment we are intesecting, at wich point... */
                            console.log('okay')
                            this.pos = intersection;
                            this.segmentHit = s;
                        }
                    }
                }
            }
        }
    }
}
class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    isPointOnMe(point) {
        var expectedValue = this.a * point.x + this.b;
        return expectedValue == point.y;
    }
    isIntersectingLine(l) {
        if (l.a == this.a) {
            return false;

        }
        else {
            var x = (this.b - l.b) / (l.a - this.a);
            var y = this.a * x + this.b;
            return new Vector2D(x, y);
        }

    }
}