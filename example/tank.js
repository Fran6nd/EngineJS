class Tank extends GameObject {
    constructor(transform) {
        super(transform);
        this.skin = new Image();
        this.skin.src = "example/Tank.png";
    }
    draw(canvas, ctx) {
        function rotateAndPaintImage(context, image, angleInRad, position, offset = 0) {
            var axis = new Vector2D(image.width / 2, image.height / 2);
            angleInRad += offset;
            context.translate(position.x, position.y);
            context.rotate(angleInRad);
            context.drawImage(image, -axis.x, -axis.y);
            context.rotate(-angleInRad);
            context.translate(-position.x, -position.y);
        }
        rotateAndPaintImage(ctx, this.skin, this.transform.rotation, this.transform.position, -Math.PI / 2);
        //ctx.drawImage(this.skin, this.transform.position.x - this.skin.width / 2, this.transform.position.y - this.skin.height / 2);
    }
}