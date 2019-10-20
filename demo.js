class Collider {
    constructor(transform, enable = true) {
        this.transform = transform;
        this.triangles = new Array();
        this.enabled = enable;
    }
    add(triangle) {
        this.triangles.push(triangle);
    }
    setTransform(transform) {
        this.transform = transform;
        for (const t1 of this.triangles) {
            t1.setTransform(transform);
        }
    }
    isIntersectingCollider(col) {
        if (col.enabled) {
            for (const t1 of col.triangles) {
                for (const t2 of this.triangles) {
                    if (t1.isIntersectingTriangle(t2)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    isPointInside(point) {
        for (const t2 of this.triangles) {
            if (t1.isPointInside(point)) {
                return true;
            }
        }
        return false;
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    draw(ctx) {
        for (const t1 of this.triangles) {
            t1.draw(ctx);
        }
    }
}class Colliders {
    constructor() {
        this.colliders = new Map();
        this.instantiateId = 0;
    }
    isIntersectingColliders(col) {
        for (const [k1, c1] of this.colliders.entries()) {
            for (const [k2, c2] of col.colliders.entries()) {
                if (c1.isIntersectingCollider(c2)) {
                    return true;
                }
            }
        }
        return false;
    }
    isPointInside(point)
    {
        for (const [k1, c1] of this.colliders.entries()) {
            if (c1.isPointInside(p))
            {
                return true;
            }
        }
        return false;
    }
    add(collider) {
        this.instantiateId++;
        var id = this.instantiateId.toString(10);
        this.colliders.set(id, collider);
        return id;
    }
    remove(id) {
        this.colliders.delete(id);
    }
    enable(id) {
        this.colliders.get(id).enable();
    }
    disable(id) {
        this.colliders.get(id).disable();
    }
    enableAll() {
        for (const [key, value] of this.colliders.entries()) {
            value.enable();
        }
    }
    disableAll() {
        for (const [key, value] of this.colliders.entries()) {
            value.disable();
        }
    }
    draw(ctx) {
        for (const [key, value] of this.colliders.entries()) {
            value.draw(ctx);
        }
    }
    update(transform) {
        for (const [key, value] of this.colliders.entries()) {
            value.setTransform(transform);
        }
    }
}class Drawing {
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
}class GameObject {
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
    updateTransform(scene) {
        var dt = scene.dt;
        var deltaRotation = this.transform.angularVelocity * dt;
        var deltaPosition = this.transform.velocity.mul(dt);

        this.transform.rotation += deltaRotation;
        this.colliders.update(this.transform);
        if (!scene.canBeHere(this)) {
            this.transform.rotation -= deltaRotation;
        }
        this.transform.position.x += deltaPosition.x;
        this.colliders.update(this.transform);
        if (!scene.canBeHere(this)) {
            this.transform.position.x -= deltaPosition.x;
        }
        this.transform.position.y += deltaPosition.y;
        this.colliders.update(this.transform);
        if (!scene.canBeHere(this)) {
            this.transform.position.y -= deltaPosition.y;
        }
        this.colliders.update(this.transform);
    }
}class InputManager {
    static init(){
        document.addEventListener("keydown", InputManager.keyDownHandler, false);
        document.addEventListener("keyup", InputManager.keyUpHandler, false);
        InputManager.inputs = new Map();
    }
    static keyDownHandler(event)
    {
        InputManager.inputs.set(event.key.toString(), new Key(true));
    }
    static keyUpHandler(event)
    {
        InputManager.inputs.set(event.key, new Key(false));
    }
    static get(key)
    {
        if (!InputManager.inputs.has(key))
        {
            return new Key(false);
        }
        return InputManager.inputs.get(key);
    }
}class Key {
    constructor(pressed)
    {
        this.pressed = pressed;
    }
}class Scene {
    constructor(canvas, ctx, debug = false) {
        InputManager.init();
        this.id = 0;
        this.layers = new Array(10);
        this.uiLayer = new Map();
        this.debug = debug;
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i] = new Map();
        }
        this.canvas = canvas;
        this.ctx = ctx;
        this.t1 = new Date().getTime();
        this.t2 = new Date().getTime();
    }
    instantiate(obj, layer = 0) {
        obj.id = this.id.toString(10);
        obj.layer = layer;
        this.layers[layer].set(obj.id, obj)
        this.id++;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.layers.length; i++) {
            for (const [key, value] of this.layers[i].entries()) {
                value.draw(this.canvas, this.ctx);
            }
        }
        for (const [key, value] of this.uiLayer.entries()) {
            value.draw(this.canvas, this.ctx);
        }
        this.ctx.font = "15px Arial";
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText("Score: " + new Date().getTime().toString(10), 0, 20);
    }
    debugDraw() {
        for (var i = 0; i < this.layers.length; i++) {
            for (const [key, value] of this.layers[i].entries()) {
                value.debugDraw(this.canvas, this.ctx);
            }
        }
        for (const [key, value] of this.uiLayer.entries()) {
            value.debugDraw(this.canvas, this.ctx);
        }
    }
    update() {
        for (var i = 0; i < this.layers.length; i++) {
            for (const [key, value] of this.layers[i].entries()) {
                value.update(this.dt);
            }
        }
        for (const [key, value] of this.uiLayer.entries()) {
            value.update(this.dt);
        }
    }
    updateTransform() {
        for (var i = 0; i < this.layers.length; i++) {
            for (const [key, value] of this.layers[i].entries()) {
                value.updateTransform(this);
            }
        }

        for (const [key, value] of this.uiLayer.entries()) {
            value.updateTransform(dt);
        }
    }
    delete(id) {
        for (var i = 0; i < this.layers.length; i++) {
            this.objects.delete(id);
        }
    }
    run() {
        this.t2 = new Date().getTime();
        this.dt = 1 / (this.t2 - this.t1) / 1000;
        this.update();
        this.updateTransform();
        this.draw();
        if (this.debug) {
            this.debugDraw();
        }
        this.t1 = this.t2;
    }
    start() {
        setInterval(this.run, 16);
    }
    canBeHere(obj, layer = -1) {
        if (layer == -1) {
            layer = obj.layer;
            var c1 = obj.colliders;
            for (const [key, value] of this.layers[layer].entries()) {
                if (value.colliders.isIntersectingColliders(c1)) {
                    return false;
                }
            }
        }
        else {
            for (var i = 0; i < this.layers.length; i++) {
                for (const [key, value] of this.layers[layer].entries()) {
                    if (value.colliders.isIntersectingColliders(c1)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}class Transform {
    constructor(position, rotation, velocity = new Vector2D(0,0), angularVelocity = 0)
    {
        this.position = position;
        this.rotation = rotation;
        this.velocity = velocity;
        this.angularVelocity = angularVelocity;
    }
    /* Relative direction vectors. */
    forward()
    {
        return Vector2D.forward().setArg(this.rotation);
    }
    backward()
    {
        return Vector2D.forward().setArg(this.rotation).mul(-1);
    }
    up()
    {
        return Vector2D.forward().setArg(this.rotation);
    }
    down()
    {
        return Vector2D.forward().setArg(this.rotation).mul(-1);
    }
    left()
    {
        return Vector2D.forward().setArg(this.rotation + Math.PI);
    }
    right()
    {
        return Vector2D.forward().setArg(this.rotation + Math.PI).mul(-1);
    }
}class Triangle {
    constructor(center, p1, p2, p3) {
        this.center = center;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.baseP1 = p1.copy();
        this.baseP2 = p2.copy();
        this.baseP3 = p3.copy();
    }
    setTransform(transform) {
        this.center = transform.position.copy();
        this.p1 = this.baseP1.copy();
        this.p2 = this.baseP2.copy();
        this.p3 = this.baseP3.copy();
        this.p1.incrementArg(transform.rotation).increment(this.center);
        this.p2.incrementArg(transform.rotation).increment(this.center);
        this.p3.incrementArg(transform.rotation).increment(this.center);
    }
    static sign(point, p1, p2) {
        return (point.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (point.y - p1.y);
    }
    isPointInside(p) {
        var b1 = Triangle.sign(p, this.p1, this.p2) > 0;
        var b2 = Triangle.sign(p, this.p2, this.p3) > 0;
        var b3 = Triangle.sign(p, this.p3, this.p1) > 0;
        return ((b1 == b2) && (b2 == b3));
    }
    isIntersectingTriangle(t) {
        if (this.isPointInside(t.p1)) {
            return true;
        }
        if (this.isPointInside(t.p2)) {
            return true;
        }
        if (this.isPointInside(t.p3)) {
            return true;
        }
        if (t.isPointInside(this.p1)) {
            return true;
        }
        if (t.isPointInside(this.p2)) {
            return true;
        }
        if (t.isPointInside(this.p3)) {
            return true;
        }
    }
    draw(ctx) {
        Drawing.drawTriangle(ctx, this.p1, this.p2, this.p3);
    }
}class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /* Arithmetic operators */
    add(other) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }
    sub(other) {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }
    mul(other) {
        return new Vector2D(this.x * other, this.y * other);
    }
    div(other) {
        return new Vector2D(this.x / other, this.y / other);
    }

    /* Vector2D methods */
    getModule() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    getArg() {
        return Math.atan2(this.y, this.x);
    }
    setArg(arg) {
        var module = this.getModule();
        var y = Math.sin(arg) * module;
        var x = Math.cos(arg) * module;
        this.x = x;
        this.y = y;
        return this;
    }
    normalize() {
        var arg = this.getArg();
        var y = Math.sin(arg);
        var x = Math.cos(arg);
        return new Vector2D(x, y);
    }
    increment(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    incrementArg(i) {
        var arg = this.getArg();
        this.setArg(arg + i);
        return this;
    }
    decrement(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    decrementArg(i) {
        var arg = this.getArg();
        this.setArg(arg - i);
        return this;
    }
    copy() {
        return new Vector2D(this.x, this.y);
    }

    /* Static methods */
    static up() {
        return new Vector2D(0, 1);
    }
    static forward() {
        return new Vector2D(0, 1);
    }
    static down() {
        return new Vector2D(0, -1);
    }
    static backward() {
        return new Vector2D(0, -1);
    }
    static right() {
        return new Vector2D(1, 0);
    }
    static left() {
        return new Vector2D(-1, 0);
    }
    static zero() {
        return new Vector2D(0, 0);
    }
}class QuadCollider extends Collider{
    constructor(transform, p1, p2, p3, p4)
    {
        super(transform);
        this.add(new Triangle(transform.position, p1, p2, p3));
        this.add(new Triangle(transform.position, p3, p2, p4));
    }
}class TriangleCollider extends Collider {
    constructor(transform, p1, p2, p3) {
        super(transform);
        this.add(new Triangle(transform.position, p1, p2, p3));
    }
}class Crate extends GameObject{
    constructor(transform) {
        super(transform);
        this.skin = new Image();
        //this.skin.src = "example/Tank.png";
        this.colliders.add(new QuadCollider(this.transform, new Vector2D(-25, 25), new Vector2D(25, 25), new Vector2D(-25, -25), new Vector2D(25, -25)))
    }
}class Tank extends GameObject {
    constructor(transform) {
        super(transform);
        this.skin = new Image();
        this.skin.src = "example/Tank.png";
        this.colliders.add(new QuadCollider(this.transform, new Vector2D(-20, 14), new Vector2D(20, 14), new Vector2D(-20, -14), new Vector2D(20, -14)))
    }
    draw(canvas, ctx) {
        Drawing.rotateAndPaintImage(ctx, this.skin, this.transform.rotation, this.transform.position, -Math.PI / 2);
    }
    update(dt) {
        var velocity = Vector2D.zero();
        var angularVelocity = 0;
        if (InputManager.get('z').pressed) {
            velocity.increment(this.transform.forward().mul(10000));
        }
        if (InputManager.get('s').pressed) {
            velocity.increment(this.transform.velocity = this.transform.backward().mul(10000));
        }
        if (InputManager.get('d').pressed) {
            angularVelocity += 200;
        }
        if (InputManager.get('q').pressed) {
            angularVelocity -= 200;
        }
        this.transform.velocity = velocity;
        this.transform.angularVelocity = angularVelocity;
    }
}