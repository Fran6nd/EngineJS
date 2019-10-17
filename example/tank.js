class Tank extends GameObject {
    constructor(transform) {
        super(transform);
        this.skin = new Image();
        this.skin.src = "example/Tank.png";
    }
    draw(canvas, ctx) {
        Drawing.rotateAndPaintImage(ctx, this.skin, this.transform.rotation, this.transform.position, -Math.PI / 2);
        //ctx.drawImage(this.skin, this.transform.position.x - this.skin.width / 2, this.transform.position.y - this.skin.height / 2);
    }
}