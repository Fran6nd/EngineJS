class Transform {
    constructor(position, rotation, velocity = new Vector2D(0,0), angularVelocity = 0)
    {
        this.position = position;
        this.rotation = rotation;
        this.velocity = velocity;
        this.angularVelocity = angularVelocity;
    }
}