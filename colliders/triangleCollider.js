class TriangleCollider extends Collider {
    constructor(transform, p1, p2, p3) {
        super(transform);
        this.add(new Triangle(transform.position, p1, p2, p3));
    }
}