class Main extends Scene {
    buildMap() {
        super.buildMap();
        this.instantiate(new Player(new Transform(new Vector2D(50, 300), 0)));
        this.instantiate(new Ground(new Transform(new Vector2D(300, 500), 0), ["ground"]));
        this.instantiate(new ObstacleSpawner(new Transform(new Vector2D(600, 475 - 25), 0), ["ground"]));
    }
}