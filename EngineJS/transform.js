class Transform {
    constructor(position = new Vector2D(0,0), rotation = 0, velocity = new Vector2D(0,0), angularVelocity = 0)
    {
        this.position = position;
        this.rotation = rotation;
        this.velocity = velocity;
        this.angularVelocity = angularVelocity;
    }
    increment(t){
        this.position.increment(t.position);
        this.rotation += t.rotation;
        return this;
    }
    decrement(t){
        this.position.decrement(t.position);
        this.rotation -= t.rotation;
        return this;
    }
    copy()
    {
        return new Transform(this.position.copy(), this.rotation, this.velocity.copy(), this.angularVelocity);
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
        return Vector2D.forward().incrementArg(Math.PI);
    }
    right()
    {
        return Vector2D.forward().decrementArg(Math.PI);
    }
}