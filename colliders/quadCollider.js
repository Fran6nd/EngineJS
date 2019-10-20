class QuadCollider extends Collider{
    constructor(transform, p1, p2, p3, p4)
    {
        super(transform);
        this.add(new Triangle(transform.position, p1, p2, p3));
        this.add(new Triangle(transform.position, p3, p2, p4));
    }
}