const gameScene = {
    gameLost: false,
    score: 0,
    player: {},
    bullet: {},
    enemies: {},

    start: () => {
        this.score = 0
        this.gameLost = false

        this.player = Game.newElement({
            pos: {
                x: (canvas.width / 2) - 25,
                y: 640
            },
            width: 50,
            height: 50,
            speed: 10,
        })
    
        this.bullet = Game.newElement({
            enabled: false,
            pos: {
                x: player.pos.x + (player.width / 2),
                y: player.pos.y
            },
            width: 1,
            height: -700,
            color: 'rgb(200, 0, 0)',
            force: 30,
            shoot: () => {
                bullet.enabled = true
                setTimeout(() => bullet.enabled = false, 100)
            }
        })
        
        this.enemies = []
        for(let i = 0; i < 5; i++) {
            this.enemies.push(Game.newElement({
                pos: {
                    x: 90 + (i * 256),
                    y: -60 - (i * 10)
                },
                width: 50,
                height: 50,
                speed: Math.floor(Math.random() * 1.5 + 1),
                color: 'rgb(0, 200, 0)'
            }))
        }
    },

    update: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.player.pos.x += this.player.velocity.x * this.player.speed
    
        if(this.player.pos.x < 0)
            this.player.pos.x = canvas.width - this.player.width
        if(this.player.pos.x > canvas.width)
            this.player.pos.x = 0
    
        // Player
        this.player.draw()
    
        // Bullet
        if(this.bullet.enabled) {
            this.bullet.pos.x = this.player.pos.x + (this.player.width / 2)
            this.bullet.draw()
        }
    
        // Enemies
        this.enemies.forEach((enemy) => {
            enemy.draw()            

            if(this.gameLost)
                return
    
            if(enemy.pos.y + enemy.height >= 700) {
                this.gameLost = true
                return
            }
            
            enemy.pos.y += enemy.speed
    
            if(Game.utils.detectCollision(this.bullet, enemy)) {
                ctx.clearRect(enemy.pos.x, 0, enemy.width, enemy.pos.y)

                this.score += 10
                enemy.pos.y -= this.bullet.force
                this.bullet.enabled = false
            }
        })
    
        // Line
        ctx.drawLine(0, 700, canvas.width, 700)
    
        // Controls
        ctx.drawText('Move with the A and S keys and shoot with the space key or right-clicking with the mouse', 10, 20)
    
        // Score
        ctx.drawText(`Score: ${this.score}`, 10, 40, { color: 'rgb(200, 0, 0)'})

        if(this.gameLost)
            gameScene.gameOver()
    },

    gameOver: () => {
        Game.loadScene(gameOverScene)
    },

    inputEvents: [
        {
            event: 'keydown',
            eventType: 'keyboard',
            values: [
                { key: 'd', action: (e) => this.player.velocity.x = 1 },
                { key: 'a', action: (e) => this.player.velocity.x = -1 },
            ]
        }, {
            event: 'keyup',
            eventType: 'keyboard',
            values: [
                { key: ' ', action: (e) => bullet.shoot() },
                { key: 'd', action: (e) => {
                    if(this.player.velocity.x == 1)
                        this.player.velocity.x = 0
                }},
                { key: 'a', action: (e) => {
                    if(this.player.velocity.x == -1)
                        this.player.velocity.x = 0
                }}
            ]
        }, {
            event: 'click',
            eventType: 'mouse',
            values: [
                { action: (e, mousePos) => bullet.shoot() },
            ]
        }
    ],
}

const gameOverScene = {
    restartButton: null,

    start: () => {
        this.restartButton = Game.newElement({
            pos: {
                x: canvas.width / 2 - 90,
                y: canvas.height / 2 + 100,
            },
            width: 180,
            height: 60,
            text: 'Play Again?',
            renderer: 'button'
        })

        ctx.drawBackdrop(0.35)

        ctx.drawText('You lose!', 520, restartButton.pos.y - 100, { color: 'rgb(200, 0, 0)', font: '60px serif' })

        this.restartButton.draw()
    },

    restartGame: () => {
        Game.loadScene(gameScene)
    },

    inputEvents: [
        {
            event: 'keyup',
            eventType: 'keyboard',
            values: [
                { key: ' ', action: (e) => gameOverScene.restartGame()}
            ]
        },
        {
            event: 'click',
            eventType: 'mouse',
            values: [
                { action: (e, mousePos) => {
                    if(Game.utils.detectCollision(Game.newElement({ pos: mousePos }), this.restartButton))
                        gameOverScene.restartGame()
                }}
            ]
        }
    ]
}

Game.loadScene(gameScene)