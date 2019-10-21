class Circle extends GameObject{
    constructor(transform) {
        super(transform);
        this.colliders.add(new CircleCollider(this.transform, 50));
    }
}