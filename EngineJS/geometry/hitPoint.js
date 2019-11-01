
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