class Tank extends GameObject {
    constructor(transform) {
        super(transform);
        this.skin = new Image();
        this.skin.src = "example/tank/tank.png";
        this.colliders.add(new QuadCollider(this.transform, new Vector2D(-20, 14), new Vector2D(20, 14), new Vector2D(-20, -14), new Vector2D(20, -14)))
    }
    draw(canvas, ctx) {
        Drawing.rotateAndPaintImage(ctx, this.skin, this.transform.rotation, this.transform.position, -Math.PI / 2);
    }
    update(scene) {
        var dt = scene.dt;
        var velocity = Vector2D.zero();
        var angularVelocity = 0;
        if (InputManager.get('z').pressed) {
            velocity.increment(this.transform.forward().mul(150));
        }
        if (InputManager.get('s').pressed) {
            velocity.increment(this.transform.velocity = this.transform.backward().mul(150));
        }
        if (InputManager.get('d').pressed) {
            angularVelocity += 3;
        }
        if (InputManager.get('q').pressed) {
            angularVelocity -= 3;
        }
        this.transform.velocity = velocity;
        this.transform.angularVelocity = angularVelocity;
    }
}