class GameObject {
    constructor(pos, angle)
    {
        this.pos = pos;
        this.angle = angle;
    }
    draw(canvas, ctx)
    {
        ctx.beginPath();
        var pt = new Vector2D(10, 0);
        pt.setArg(this.angle);
        ctx.arc(this.pos.x, this.pos.y, 5, 0, Math.PI * 2);
        //ctx.arc(this.pos.x + pt.x, this.pos.y + pt.y, 10, 0, Math.PI * 2);
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + pt.x, this.pos.y + pt.y);
        ctx.fillStyle = "#FF0000";
        ctx.stroke(); 
        ctx.fill();
        ctx.closePath();
    }
    update(dt)
    {
        this.angle += 1*dt;
    }
}