class Main extends Scene {
    buildMap() {
        super.buildMap();
        this.instantiate(new Circle(new Transform(new Vector2D(300, 300), 0)));
        this.instantiate(new Tank(new Transform(new Vector2D(100, 100), 0, new Vector2D(0, 0), 0)));
        this.instantiate(new Crate(new Transform(new Vector2D(80, 300), 0)));

    }
}