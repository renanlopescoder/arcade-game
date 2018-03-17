// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}
// Now write your own player class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.char = 'images/char-boy.png';
    }
    // This class requires an update(), render() and
    // a handleInput() method.
    update(dt) { }
    render() {
        ctx.drawImage(Resources.get(this.char), this.x, this.y);
    };
    handleInput(key) {
        switch (key) {
            case 'left': this.x > 0 ? this.x -= 100 : null;
                break;
            case 'up': this.y > 0 ? this.y -= 85: null;
                break;
            case 'right': this.x < 400 ? this.x += 100 : null;
                break;
            case 'down':this.y < 400 ? this.y += 85: null;
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(300, 230)];

// Place the player object in a variable called player
var player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
