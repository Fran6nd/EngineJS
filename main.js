import {hello} from 'hello';
function run(canvas, ctx) {
    monModule.hello();
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var DIR_UP = 0;
    var DIR_DOWN = 1;
    var DIR_RIGHT = 2;
    var DIR_LEFT = 3;
    var BALL_SPEED = 5 / 4;
    var BALL_RADIUS = 25;
    var PLAYER_RADIUS = 15;
    var timeouts = [];
    time = 0;
    score = 0;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function isPosValid(x, y) {
        if (x >= 0 + BALL_RADIUS && x <= canvas.width - BALL_RADIUS && y >= 0 + BALL_RADIUS && y <= canvas.width - BALL_RADIUS) {
            return true;
        }
        return false;
    }


    class Instantiator {
        constructor() {
            this.id = 0;
            this.objects = new Map();
        }
        instantiate(obj) {
            obj.id = this.id.toString(10);
            this.objects.set(obj.id, obj)
            this.id++;
        }
        draw() {
            for (const [key, value] of this.objects.entries()) {
                value.draw();
            }
        }
        update() {
            for (const [key, value] of this.objects.entries()) {
                value.update();
            }
        }
        delete(id) {
            this.objects.delete(id);
        }
        isBallCollidingAnother(obj) {
            for (const [key, value] of this.objects.entries()) {
                if (key != obj.id) {
                    if (Math.sqrt(Math.pow((value.x - obj.x), 2) + Math.pow((value.y - obj.y), 2)) < BALL_RADIUS + PLAYER_RADIUS) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    class EnnemyBall {
        constructor(x, y, dir) {
            this.x = x;
            this.y = y;
            this.dir = dir;
            this.id = "";

        }
        update() {
            var y = this.y;
            var x = this.x;
            if (this.dir == DIR_UP) {
                y -= BALL_SPEED;
            }
            else if (this.dir == DIR_DOWN) {
                y += BALL_SPEED;
            }
            else if (this.dir == DIR_LEFT) {
                x -= BALL_SPEED;
            }
            else if (this.dir == DIR_RIGHT) {
                x += BALL_SPEED;
            }
            if (isPosValid(x, y)) {
                this.x = x;
                this.y = y;
            }
            else {
                if (this.dir == DIR_LEFT || this.dir == DIR_RIGHT) {
                    this.dir = this.dir == DIR_LEFT ? DIR_RIGHT : DIR_LEFT;
                }
                else if (this.dir == DIR_UP || this.dir == DIR_DOWN) {
                    this.dir = this.dir == DIR_DOWN ? DIR_UP : DIR_DOWN;
                }
            }

        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
        }
    }
    class Player {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.id = "";
            this.color = "#FF0000";
            this.speedFactor = 1.8;
            this.prevX = 0;
            this.prevY = 0;
        }
        update() {
            var y = 0;
            var x = 0;
            if (upPressed) {
                y -= BALL_SPEED * this.speedFactor;
            }
            if (downPressed) {
                y += BALL_SPEED * this.speedFactor;
            }
            if (leftPressed) {
                x -= BALL_SPEED * this.speedFactor;
            }
            if (rightPressed) {
                x += BALL_SPEED * this.speedFactor;
            }
            if (x != 0 || y != 0) {
                this.prevX = x;
                this.prevY = y;
            }
            if ((x == 0 && y == 0)) {
                x = this.prevX;
                y = this.prevY;
            }
            if (isPosValid(this.x, this.y + y)) {
                this.y += y;
            }
            else {
                this.prevY = 0;
            }
            if (isPosValid(x + this.x, this.y)) {
                this.x += x;
            }
            else {
                this.prevX = 0;
            }
            if (inst.isBallCollidingAnother(this)) {
                alert("You finally lost...\nYou score is: " + score.toString());
                reInit();
                inst.delete(this);
                this.prevX = 0;
                this.prevY = 0;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, PLAYER_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }
    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
        else if (e.key == "Up" || e.key == "ArrowUp") {
            upPressed = true;
        }
        else if (e.key == "Down" || e.key == "ArrowDown") {
            downPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
        else if (e.key == "Up" || e.key == "ArrowUp") {
            upPressed = false;
        }
        else if (e.key == "Down" || e.key == "ArrowDown") {
            downPressed = false;
        }
    }

    function addEnnemies() {
        function addBall(x, y, dir) {
            b = new EnnemyBall(x, y, dir);
            inst.instantiate(b);
        }

        var i;
        for (i = 0; i < 20; i += 2) {
            timeouts.push(setTimeout(addBall, 750 * i, BALL_RADIUS, BALL_RADIUS + i * BALL_RADIUS, DIR_RIGHT));
        }
        delay = i;
        for (i = 0; i < 20; i += 2) {

            timeouts.push(setTimeout(addBall, 750 * (i + delay), BALL_RADIUS + i * BALL_RADIUS, BALL_RADIUS, DIR_DOWN));

        }

    }
    inst = new Instantiator();
reInit();

function abortTimedOutedActions()
{
    for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
}
    function reInit() {
        score = 0;
        upPressed = false;
        downPressed = false;
        rightPressed = false;
        leftPressed = false;
        abortTimedOutedActions();
        inst = new Instantiator();
        inst.instantiate(new Player(canvas.width/2, canvas.height/2));
        alert("Ready to go?");
        addEnnemies();
        
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        inst.draw();
        inst.update();
        score += 1;
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Score: " + score.toString(10), 0, 20);
    }

    setInterval(draw, 10);
}