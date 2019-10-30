class Main extends Scene {
    buildMap() {
        super.buildMap();
        this.instantiate(new Circle(new Transform(new Vector2D(300, 300), 0)));
        this.instantiate(new Tank(new Transform(new Vector2D(100, 100), Math.PI/2 * 1, new Vector2D(0, 0), 0)));
        this.instantiate(new Crate(new Transform(new Vector2D(80, 300), 0)));
        this.instantiate(new Crate(new Transform(new Vector2D(300, 80), 0)));
        this.instantiate(new Crate(new Transform(new Vector2D(0, 80), Math.PI/4)));

    }
}