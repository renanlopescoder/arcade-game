const ui = {
    start: document.querySelector('.start'),
    newGame: document.querySelector('.new-game'),
    scorePanel: document.querySelector('.score-panel'),
    stars: document.querySelectorAll(".stars"),
    score: document.querySelector(".score"),
    lives: document.querySelectorAll(".lives"),
    restart: document.querySelector('.restart'),
}

// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = [300, 400, 500][Math.floor(Math.random() * 3)];
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        this.x > 500 ? allEnemies.delete(this) : null;
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}
// Now write your own player class
class Player {
    constructor() {
        this.x = 200;
        this.y = 400;
        this.lives = 3
        this.char = 'images/char-boy.png';
    }
    // This class requires an update(), render() and
    // a handleInput() method.
    update(dt) { }
    render() {
        ctx.drawImage(Resources.get(this.char), this.x, this.y);
    };
    handleInput({ key, x, y } = {}) {
        // Keyboard input(Arrow keys)
        switch (key) {
            case 'left': this.x > 0 ? this.x -= 101 : null;
                break;
            case 'right': this.x < 400 ? this.x += 101 : null;
                break;
            case 'up': this.y > 0 ? this.y -= 83 : null;
                break;
            case 'down': this.y < 400 ? this.y += 83 : null;
                break;
        };

        // Mouse input(click)
        if (x < this.x && (y - 65 > this.y && this.y + 145 > y)) {
            this.x > 0 ? this.x -= 101 : null;
        } else if (x - 100 > this.x && (y - 65 > this.y && this.y + 145 > y)) {
            this.x < 400 ? this.x += 101 : null;
        } else if (y - 65 < this.y && (x > this.x && this.x + 100 > x)) {
            this.y > 0 ? this.y -= 83 : null;
        } else if (y - 145 > this.y && (x > this.x && this.x + 100 > x)) {
            this.y < 400 ? this.y += 83 : null;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = new Set();

// Place the player object in a variable called player
var player = new Player();
