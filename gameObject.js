class GameObject {
    constructor(transform)
    {
        this.transform = transform;
    }
    draw(canvas, ctx)
    {
    }
    static drawLine(ctx, p1, p2)
    {
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);      
    }
    static drawCross(ctx, center, radius = 10)
    {
        var up = Vector2D.up().mul(radius).add(center);
        var down = Vector2D.down().mul(radius).add(center);
        var right = Vector2D.right().mul(radius).add(center);
        var left = Vector2D.left().mul(radius).add(center);
        GameObject.drawLine(ctx, up, down);
        GameObject.drawLine(ctx, right, left);
    }
    static drawArrow(ctx, startTransform, end, width = 10)
    {
        var module = startTransform.position.sub(end).getModule();
        var up = new Vector2D(85/100*module, width/2).incrementArg(startTransform.rotation).add(startTransform.position);
        var down = new Vector2D(85/100*module, -width/2).incrementArg(startTransform.rotation).add(startTransform.position);
        GameObject.drawLine(ctx, startTransform.position, end);  
        GameObject.drawLine(ctx, up, end);  
        GameObject.drawLine(ctx, down, end); 
    }
    debugDraw(canvas, ctx)
    {
        ctx.beginPath();
        var end = new Vector2D(20, 0).setArg(this.transform.rotation).add(this.transform.position);
        GameObject.drawArrow(ctx, this.transform, end, 10);
        GameObject.drawCross(ctx, this.transform.position);
        ctx.strokeStyle  = "#FF0000";
        ctx.stroke(); 
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