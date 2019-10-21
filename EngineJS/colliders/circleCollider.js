class CircleCollider extends Collider {
    constructor(transform, radius, triangles = 20) {
        super(transform);
        var step = 2 * Math.PI / triangles;
        var previousPoint = new Vector2D(radius, 0);
        for (var arg = step; arg <= 2 * Math.PI + step; arg += step) {
            var point = new Vector2D(radius, 0).setArg(arg);
            this.add(new Triangle(transform.position, new Vector2D(0, 0), previousPoint.copy(), point.copy()));
            previousPoint = point;
        }
    }
}