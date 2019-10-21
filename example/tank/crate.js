class Crate extends GameObject{
    constructor(transform) {
        super(transform);
        this.colliders.add(new QuadCollider(this.transform, new Vector2D(-25, 25), new Vector2D(25, 25), new Vector2D(-25, -25), new Vector2D(25, -25)))
    }
}