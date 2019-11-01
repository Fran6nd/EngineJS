class Vector2D {
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
    round() {
        var decimals = 10000000000;
        return new Vector2D(this.x != null ? Math.round(this.x * decimals) / decimals : null,this.y != null ? Math.round(this.y * decimals) / decimals : null);
    }
    copy() {
        return new Vector2D(this.x, this.y);
    }

    /* Static methods */
    static up() {
        return new Vector2D(0, -1);
    }
    static forward() {
        return new Vector2D(0, 1);
    }
    static down() {
        return new Vector2D(0, 1);
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
}