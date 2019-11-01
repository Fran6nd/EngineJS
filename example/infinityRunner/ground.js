class Ground extends GameObject{
    constructor(transform, tags) {
        super(transform, tags);
        this.colliders.add(new QuadCollider(this.transform, new Vector2D(-500, 25), new Vector2D(500, 25), new Vector2D(-500, -25), new Vector2D(500, -25)))
    }
}