const gameScene = {
    gameLost: false,
    score: 0,
    player: {},
    bullet: {},
    enemies: {},
    scoreLoopID: 0,

    start: () => {
        this.score = 0
        this.gameLost = false

        this.scoreLoopID = setInterval((() => {
            this.score += 10
        }).bind(this), 1000)
    
        this.player = {
            pos: {
                x: (canvas.width / 2) - 25,
                y: 640
            },
            velocity: {
                x: 0,
                y: 0
            },
            velocityValue: 10,
            width: 50,
            height: 50
        }
    
        this.bullet = {
            enabled: false,
            pos: {
                x: player.pos.x + (player.width / 2),
                y: player.pos.y
            },
            force: 25,
            shoot: () => {
                bullet.enabled = true
                setTimeout(() => bullet.enabled = false, 100)
            }
        }
        
        this.enemies = []
        for(let i = 0; i < 5; i++) {
            this.enemies.push({
                pos: {
                    x: 90 + (i * 256),
                    y: -60 - (i * 10)
                },
                width: 50,
                height: 50,
                velocity: Math.floor(Math.random() * 2 + 1)
            })
        }
    },

    update: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.player.pos.x += this.player.velocity.x * this.player.velocityValue
    
        if(this.player.pos.x < 0)
            this.player.pos.x = canvas.width - this.player.width
        if(this.player.pos.x > canvas.width)
            this.player.pos.x = 0
    
        // Player
        ctx.fillStyle = 'rgb(0,0,200)'
        ctx.fillRect(this.player.pos.x, this.player.pos.y, this.player.width, this.player.height)
    
        ctx.strokeStyle = 'rgb(200, 0, 0)'
    
        // Bullet
        if(this.bullet.enabled) {
            this.bullet.pos.x = this.player.pos.x + (this.player.width / 2)
            ctx.drawLine(this.bullet.pos.x, this.bullet.pos.y, this.bullet.pos.x, 0)
        }
    
        ctx.fillStyle = 'rgb(0,200,0)'

        // Enemies
        this.enemies.forEach((enemy) => {
            ctx.fillRect(enemy.pos.x, enemy.pos.y, enemy.width, enemy.height)

            if(this.gameLost)
                return
    
            if(enemy.pos.y + enemy.height >= 700) {
                this.gameLost = true
                return
            }
            
            enemy.pos.y += enemy.velocity
    
            if(this.bullet.enabled
                && this.bullet.pos.x >= enemy.pos.x
                && this.bullet.pos.x <= enemy.pos.x + enemy.width)
                    enemy.pos.y -= this.bullet.force
        })
    
        // Line
        ctx.strokeStyle = '#333'
        ctx.drawLine(0, 700, canvas.width, 700)
    
        // Controles
        ctx.fillStyle = '#333'
        ctx.font = '20px serif'
        ctx.fillText('Movimente-se com o A ou S e atire com o clique do mouse ou espaço', 10, 20)
    
        // Pontos
        ctx.fillStyle = 'rgb(200, 0, 0)'
        ctx.font = '20px serif'
        ctx.fillText(`Pontos: ${this.score}`, 10, 40)

        if(this.gameLost)
            gameScene.gameOver()
    },

    gameOver: () => {
        clearInterval(this.scoreLoopID)
        gameLib.loadScene(gameOverScene)
    },

    inputEvents: [
        {
            event: 'keydown',
            eventType: 'keyboard',
            values: [
                { key: 'd', action: (e) => player.velocity.x = 1 },
                { key: 'a', action: (e) => player.velocity.x = -1 },
            ]
        }, {
            event: 'keyup',
            eventType: 'keyboard',
            values: [
                { key: ' ', action: (e) => bullet.shoot() },
                { key: 'd', action: (e) => {
                    if(player.velocity.x == 1)
                        player.velocity.x = 0
                }},
                { key: 'a', action: (e) => {
                    if(player.velocity.x == -1)
                        player.velocity.x = 0
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
        this.restartButton = {
            pos: {
                x: canvas.width / 2 - 90,
                y: canvas.height / 2 + 100,
            },
            width: 180,
            height: 60,
            text: 'Jogar de novo?'
        }

        ctx.fillStyle = 'rgb(0, 0, 0, 0.35)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.font = '60px serif'
        ctx.fillStyle = 'rgb(200, 0, 0)'
        ctx.fillText('Você perdeu!', 480, restartButton.pos.y - 100)

        ctx.drawButton(
            x = restartButton.pos.x,
            y = restartButton.pos.y,
            width = restartButton.width,
            height = restartButton.height,
            text = restartButton.text
        )
    },

    restartGame: () => {
        gameLib.loadScene(gameScene)
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
                    if(gameLost) {
                        if(mousePos.x > restartButton.pos.x
                            && mousePos.x < restartButton.pos.x + restartButton.width
                            && mousePos.y > restartButton.pos.y
                            && mousePos.y < restartButton.pos.y + restartButton.height
                        )
                            gameOverScene.restartGame()
                    }
                }}
            ]
        }
    ]
}

gameLib.loadScene(gameScene)