class Player extends GameObject {
    constructor(transform) {
        super(transform);
        this.colliders.add(new QuadCollider(this.transform, new Vector2D(-20, 14), new Vector2D(20, 14), new Vector2D(-20, -14), new Vector2D(20, -14)));
        this.flying = true;
        this.jumpHeight = 100;
        this.groundHeight = null;

    }
    update(scene) {
        var dt = scene.dt;
        if (this.groundHeight != null) {
            
            if (InputManager.get(' ').pressed && !this.flying) {
                this.flying = true;
                this.transform.velocity = Vector2D.up().mul(300);
            }
            if(this.flying)
            {
                if (this.jumpHeight - this.groundHeight < -this.transform.position.y) {
                    this.transform.velocity = Vector2D.down().mul(300);
                }
            }
        }
        else{
            this.transform.velocity = Vector2D.down().mul(300);
        }
    }
    onCollision(scene, obj) {
        if (obj.hasTag('ground')) {
            //this.transform.velocity.y = this.transform.velocity.y * -1;
            this.flying = false;
            this.groundHeight = this.transform.position.y
        }
        else {
            scene.buildMap();
        }
    }
}