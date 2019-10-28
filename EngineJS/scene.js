class Scene {
    constructor(canvas, ctx, debug = false) {
        InputManager.init();
        this.debug = debug;
        this.canvas = canvas;
        this.ctx = ctx;
        this.t1 = new Date().getTime();
        this.t2 = new Date().getTime();
        this.updater = null;
        this.buildMap();
    }
    resetMap() {
        this.id = 0;
        this.layers = new Array(10);
        this.uiLayer = new Map();
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i] = new Map();
        }
    }
    buildMap() {
        this.resetMap();
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
                this.moveGameObject(value);
            }
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
        var scene = this;
        this.updater = setInterval(function () { scene.run(); }, 10);
    }
    stop() {
        if (this.updater != null) {
            clearInterval(this.updater);
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    switchScene(target) {
        this.stop();
        target.start();
    }
    moveGameObject(obj) {
        obj.colliders.update(obj.transform);
        if (obj.transform.velocity.x != 0 || obj.transform.velocity.y != 0 || obj.transform.angularVelocity.x != 0) {
            var deltaRotation = obj.transform.angularVelocity * this.dt;
            var deltaPosition = obj.transform.velocity.mul(this.dt);
            var deltaTransform = new Transform(deltaPosition, deltaRotation)
            obj.transform.increment(deltaTransform);
            obj.colliders.update(obj.transform);
            var layer = obj.layer;
            var c1 = obj.colliders;
            for (const [key, value] of this.layers[layer].entries()) {
                if (key != obj.id) {
                    var res = c1.isIntersectingColliders(value.colliders, obj.transform.copy(), deltaTransform.copy());
                    if (res != false) {
                        obj.transform.decrement(deltaTransform);
                        obj.colliders.update(obj.transform);
                        this.instantiate(new GameObject(new Transform(res.intersection, res.angle)));
                        //console.log(res.intersection);
                        break;
                    }
                }
            }

        }
    }
}