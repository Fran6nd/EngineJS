class GameObject {
    constructor(transform) {
        this.transform = transform;
        this.colliders = new Colliders();
    }
    draw(canvas, ctx) {
    }
    debugDraw(canvas, ctx) {
        ctx.beginPath();
        var end = new Vector2D(30, 0).setArg(this.transform.rotation).add(this.transform.position);
        Drawing.drawArrow(ctx, this.transform, end, 10);
        Drawing.drawCross(ctx, this.transform.position);
        this.colliders.draw(ctx);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
        ctx.closePath();
    }
    update(dt) {
    }
}