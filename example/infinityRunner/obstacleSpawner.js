class ObstacleSpawner extends GameObject{
    constructor(transform) {
        super(transform);
        this.timeSinceLastSpawn = 0;
    }
    update(scene)
    {
        this.timeSinceLastSpawn += scene.dt;
        if(this.timeSinceLastSpawn > 2)
        {
            this.timeSinceLastSpawn = 0;
            scene.instantiate(new Obstacle(this.transform.copy()));
        }
    }
}