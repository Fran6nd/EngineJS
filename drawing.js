class Drawing {
    static rotateAndPaintImage(context, image, angleInRad, position, offset = 0) {
        var axis = new Vector2D(image.width / 2, image.height / 2);
        angleInRad += offset;
        context.translate(position.x, position.y);
        context.rotate(angleInRad);
        context.drawImage(image, -axis.x, -axis.y);
        context.rotate(-angleInRad);
        context.translate(-position.x, -position.y);
    }
    static drawArrow(ctx, startTransform, end, width = 10) {
        var module = startTransform.position.sub(end).getModule();
        var up = new Vector2D(80 / 100 * module, width / 2).incrementArg(startTransform.rotation).add(startTransform.position);
        var down = new Vector2D(80 / 100 * module, -width / 2).incrementArg(startTransform.rotation).add(startTransform.position);
        Drawing.drawLine(ctx, startTransform.position, end);
        Drawing.drawLine(ctx, up, end);
        Drawing.drawLine(ctx, down, end);
    }
    static drawLine(ctx, p1, p2) {
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
    }
    static drawCross(ctx, center, radius = 10) {
        var up = Vector2D.up().mul(radius).add(center);
        var down = Vector2D.down().mul(radius).add(center);
        var right = Vector2D.right().mul(radius).add(center);
        var left = Vector2D.left().mul(radius).add(center);
        Drawing.drawLine(ctx, up, down);
        Drawing.drawLine(ctx, right, left);
    }
    static drawTriangle(ctx, p1, p2, p3) {
        Drawing.drawLine(ctx, p1, p2);
        Drawing.drawLine(ctx, p3, p2);
        Drawing.drawLine(ctx, p1, p3);
    }
}