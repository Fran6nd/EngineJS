class Obstacle extends GameObject {
    constructor(transform) {
        super(transform);
        this.colliders.add(new QuadCollider(this.transform, new Vector2D(-20, 14), new Vector2D(20, 14), new Vector2D(-20, -14), new Vector2D(20, -14)));
        this.lifetime = 0;
    }
    update(scene) {
        this.transform.velocity = Vector2D.left().mul(300);
        this.lifetime += scene.dt;
        if(this.lifetime > 10)
        {
            scene.delete(this.id);
        }
    }
    onCollision(scene, obj) {
    }
}