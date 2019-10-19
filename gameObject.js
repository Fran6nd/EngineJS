class GameObject {
    constructor(transform)
    {
        this.transform = transform;
    }
    draw(canvas, ctx)
    {
    }
    debugDraw(canvas, ctx)
    {
        ctx.beginPath();
        var end = new Vector2D(30, 0).setArg(this.transform.rotation).add(this.transform.position);
        Drawing.drawArrow(ctx, this.transform, end, 10);
        Drawing.drawCross(ctx, this.transform.position);
        ctx.strokeStyle  = "#FF0000";
        ctx.stroke(); 
        ctx.closePath();
    }
    update(dt)
    {
        //this.transform.velocity = this.transform.forward().mul(1000);
    }
    updateTransform(dt)
    {
        this.transform.rotation += this.transform.angularVelocity * dt;
        this.transform.position = this.transform.position.add(this.transform.velocity.mul(dt));
    }
}