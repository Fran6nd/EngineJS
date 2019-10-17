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
        var pt = new Vector2D(10, 0);
        pt.setArg(this.transform.rotation);
        ctx.arc(this.transform.position.x, this.transform.position.y, 5, 0, Math.PI * 2);
        //ctx.arc(this.pos.x + pt.x, this.pos.y + pt.y, 10, 0, Math.PI * 2);
        ctx.moveTo(this.transform.position.x, this.transform.position.y);
        ctx.lineTo(this.transform.position.x + pt.x, this.transform.position.y + pt.y);
        ctx.fillStyle = "#FF0000";
        ctx.stroke(); 
        ctx.fill();
        ctx.closePath();
    }
    update(dt)
    {
        this.transform.velocity = this.transform.forward().mul(1000);
    }
    updateTransform(dt)
    {
        this.transform.rotation += this.transform.angularVelocity * dt;
        this.transform.position = this.transform.position.add(this.transform.velocity.mul(dt));
    }
}