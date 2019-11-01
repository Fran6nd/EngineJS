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

class HitPoint {
    constructor(point, triangle, transform, dtransform, pointMoved = true) {
        /* Base on https://martin-thoma.com/how-to-check-if-two-line-segments-intersect/ */
        /* If one of the moved points is inside a triangle: */
        this.pos = null;
        var previousPoint;
        if (pointMoved) {
            /* Let's get the previous point position: */
            previousPoint = point.copy().decrement(dtransform.position).decrementArg(dtransform.rotation);
        }
        else {
            previousPoint = point.copy().increment(dtransform.position).incrementArg(dtransform.rotation);
            var tmp = previousPoint.copy();
            previousPoint = point.copy();
            point = tmp;
        }
        if (previousPoint) {
            var crossingSegmentDir = pointMoved ? point.sub(previousPoint) : point.sub(previousPoint).mul(-1);
            crossingSegmentDir = crossingSegmentDir.normalize();
            crossingSegmentDir = point.sub(previousPoint);
            var crossingSegment;
            crossingSegment = new Segment(previousPoint.sub(crossingSegmentDir), point.add(crossingSegmentDir)).round();
            var segments = new Array();
            segments.push(new Segment(triangle.p1, triangle.p2).round());
            segments.push(new Segment(triangle.p2, triangle.p3).round());
            segments.push(new Segment(triangle.p3, triangle.p1).round());
            for (const s of segments) {
                var intersection = s.isIntersectingOther(crossingSegment);
                //console.log(s);

                if(intersection)
                {
                    this.intersection = intersection;
                    this.segment = s;
                    this.incomingVector = new Vector2D(point.x - previousPoint.x, point.y - previousPoint.y);
                    var furthestPoint = s.p1.sub(intersection).getModule() <= s.p1.sub(intersection).getModule() ? s.p1 : s.p2;
                    var closestPoint = s.p1.sub(intersection).getModule() > s.p1.sub(intersection).getModule() ? s.p1 : s.p2;
                    var newMovement = intersection.sub(furthestPoint).normalize();
                    this.angle = newMovement.getArg() + this.incomingVector.getArg();
                    this.angle = crossingSegmentDir.getArg();
                    return;
                }
            }
           console.log("PROBLEM");
        }
    }
    draw(ctx) {
        if (this.pos)
            Drawing.drawCross(ctx, this.pos);
    }
}
