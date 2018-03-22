const game = {
    ui: {
        start: document.querySelector('.start'),
        newGame: document.querySelector('.new-game'),
        container: document.querySelector('.container'),
        canvas: document.createElement('canvas'),
        scorePanel: document.querySelector('.score-panel'),
        stars: document.querySelector(".stars"),
        star: `<img src="images/Star.png" alt="">`,
        score: document.querySelector(".score"),
        lives: document.querySelector(".lives"),
        heart: `<img src="images/Heart.png" alt="">`,
        restart: document.querySelector('.restart'),
        update() {
            game.ui.lives.innerHTML = game.ui.heart.repeat(player.lives);
            game.ui.score.innerHTML = player.score;

        }
    },
    checkPos() {
        allEnemies.forEach(enemy => {
            if ((enemy.x > player.x - 30 && enemy.x < player.x + 70) && enemy.y === player.y) {
                player.x = [100, 200, 300][Math.floor(Math.random() * 3)];
                player.y = 390;
                player.lives > 0 ? player.lives-- : null;
                game.ui.update();
            }
        });
        if(player.y===-25) {
            player.x = [100, 200, 300][Math.floor(Math.random() * 3)];
            player.y = 390;
            player.score +=100;
            game.ui.update();
        }
    },

    start() {
        // generate enemies
        setInterval(() => allEnemies.add(new Enemy(-100, [58, 141, 224][Math.floor(Math.random() * 3)])), 600);
        // Update ui
        game.ui.update();
        game.ui.container.appendChild(game.ui.canvas);
        game.ui.start.style.display = 'none';
        game.ui.scorePanel.style.display = 'flex';
        // Keyboard event listner
        document.addEventListener('keyup', function (e) {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };
            player.handleInput({ key: allowedKeys[e.keyCode] });
        });
        // Mouse event listner
        game.ui.canvas.addEventListener('click', function (e) {
            var rect = this.getBoundingClientRect();
            player.handleInput({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        });

    }
};
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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lives = 3;
        this.score = 0;
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
        if (x < this.x && (y - 70 > this.y && this.y + 155 > y)) {
            this.x > 0 ? this.x -= 101 : null;
        } else if (x - 100 > this.x && (y - 70 > this.y && this.y + 155 > y)) {
            this.x < 400 ? this.x += 101 : null;
        } else if (y - 70 < this.y && (x > this.x && this.x + 100 > x)) {
            this.y > 0 ? this.y -= 83 : null;
        } else if (y - 155 > this.y && (x > this.x && this.x + 100 > x)) {
            this.y < 400 ? this.y += 83 : null;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = new Set();

// Place the player object in a variable called player
var player = new Player(200, 390);
