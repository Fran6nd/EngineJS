class Vector2D {
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
    add(other){
        return new Vector2D(this.x + other.x, this.y + other.y);
    }
    sub(other){
        return new Vector2D(this.x - other.x, this.y - other.y);
    }
    mul(other){
        return new Vector2D(this.x * other, this.y * other);
    }
    div(other){
        return new Vector2D(this.x / other, this.y / other);
    }
    getModule(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    getArg()
    {
        return Math.atan2(this.y, this.x);
    }
    setArg(arg){
        var module = this.getModule();
		var y = Math.sin(arg) * module;
		var x = Math.cos(arg) * module;
        this.x = x;
        this.y = y;
    }
    normalize(){
        var arg = this.getArg();
		var y = Math.sin(arg);
		var x = Math.cos(arg);
		return new Vector2D(x, y);
    }
}