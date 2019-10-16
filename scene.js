class Scene {
    constructor(canvas, ctx) {
        this.id = 0;
        this.objects = new Map();
        this.canvas = canvas;
        this.ctx = ctx;
        this.t1 = new Date().getTime();
        this.t2 = new Date().getTime();
    }
    instantiate(obj) {
        obj.id = this.id.toString(10);
        this.objects.set(obj.id, obj)
        this.id++;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const [key, value] of this.objects.entries()) {
            value.draw(this.canvas, this.ctx);
        }
        this.ctx.font = "15px Arial";
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText("Score: " + new Date().getTime().toString(10), 0, 20);
    }
    update() {
        this.t2 = new Date().getTime();
        var dt = 1 / (this.t2 - this.t1);
        for (const [key, value] of this.objects.entries()) {
            value.update(dt);
        }
        this.t1 = this.t2;
    }
    delete(id) {
        this.objects.delete(id);
    }
    run()
    {
        this.update();
        this.draw();
    }
    start()
    {
        setInterval(this.run, 10);
    }
}