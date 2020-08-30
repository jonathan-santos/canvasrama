const gameScene = {
    gameLost: false,
    score: 0,
    player: null,
    bullet: null,
    enemies: null,

    start: () => {
        this.score = 0
        this.gameLost = false

        this.player = Game.newElement({
            pos: {
                x: (canvas.width / 2) - 25,
                y: 540
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
            height: -600,
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
                    x: 90 + (i * 150),
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
        ctx.clear()

        if (Game.input.isButtonDown('right')) {
            this.player.velocity.x = 1
        } else if (Game.input.isButtonDown('left')) {
            this.player.velocity.x = -1
        } else {
            this.player.velocity.x = 0
        }

        if (Game.input.isButtonPressed('circle') || Game.input.clickPosition) {
            bullet.shoot()
        }

        this.player.pos.x += this.player.velocity.x * this.player.speed
    
        if(this.player.pos.x < 0) {
            this.player.pos.x = canvas.width - this.player.width
        } 

        if(this.player.pos.x > canvas.width) {
            this.player.pos.x = 0
        }
    
        this.player.draw()
    
        if(this.bullet.enabled) {
            this.bullet.pos.x = this.player.pos.x + (this.player.width / 2)
            this.bullet.draw()
        }
    
        this.enemies.forEach((enemy) => {
            enemy.draw()            

            if(this.gameLost)
                return
    
            if(enemy.pos.y + enemy.height >= canvas.height) {
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
    
        ctx.drawLine(0, 595, canvas.width, 595)
    
        ctx.drawText('Move with the A and S keys and shoot with the space key or right-clicking with the mouse', 10, 20)
    
        ctx.drawText(`Score: ${this.score}`, 10, 40, { color: 'rgb(200, 0, 0)'})

        if(this.gameLost) {
            gameScene.gameOver()
        }
    },

    gameOver: () => {
        Game.loadScene(gameOverScene)
    }
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

        ctx.drawText('You lose!', 290, restartButton.pos.y - 100, { color: 'rgb(200, 0, 0)', font: '60px serif' })

        this.restartButton.draw()
    },

    restartGame: () => {
        Game.loadScene(gameScene)
    },

    update: () => {
        if (Game.input.isButtonPressed('circle')) {
            gameOverScene.restartGame()
        }
    }
}

Game.loadScene(gameScene)
