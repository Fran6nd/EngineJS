class Scene {
    constructor(canvas, ctx) {
        this.id = 0;
        this.layers = new Array(10);
        this.uiLayer = new Map();
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
    update() {
        this.t2 = new Date().getTime();
        var dt = 1 / (this.t2 - this.t1);
        for (var i = 0; i < this.layers.length; i++) {
            for (const [key, value] of this.layers[i].entries()) {
                value.update(dt);
            }
        }
        for (const [key, value] of this.uiLayer.entries()) {
            value.update(dt);
        } 
        this.t1 = this.t2;
    }
    updateTransform() {
        this.t2 = new Date().getTime();
        var dt = 1 / (this.t2 - this.t1);
        for (var i = 0; i < this.layers.length; i++) {
            for (const [key, value] of this.layers[i].entries()) {
                value.updateTransform(dt);
            }
        }
        for (const [key, value] of this.uiLayer.entries()) {
            value.updateTransform(dt);
        } 
        this.t1 = this.t2;
    }
    delete(id) {
        for (var i = 0; i < this.layers.length; i++) {
            this.objects.delete(id);
        }
    }
    run() {
        this.update();
        this.updateTransform();
        this.draw();
    }
    start() {
        setInterval(this.run, 10);
    }
}