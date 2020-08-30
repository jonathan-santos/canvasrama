const gameScene = {
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
        const { player, bullet, enemies } = this
        let { score, gameLost } = this
        
        ctx.clear()

        if (Game.input.isButtonDown('right')) {
            player.velocity.x = 1
        } else if (Game.input.isButtonDown('left')) {
            player.velocity.x = -1
        } else {
            player.velocity.x = 0
        }

        if (Game.input.isButtonPressed('circle') || Game.input.clickPosition) {
            bullet.shoot()
        }

        player.pos.x += player.velocity.x * player.speed
    
        if(player.pos.x < 0) {
            player.pos.x = canvas.width - player.width
        } 

        if(player.pos.x > canvas.width) {
            player.pos.x = 0
        }
    
        player.draw()
    
        if(bullet.enabled) {
            bullet.pos.x = player.pos.x + (player.width / 2)
            bullet.draw()
        }
    
        enemies.forEach((enemy) => {
            enemy.draw()            

            if(gameLost)
                return
    
            if(enemy.pos.y + enemy.height >= canvas.height) {
                gameLost = true
                return
            }
            
            enemy.pos.y += enemy.speed
    
            if(Game.utils.detectCollision(bullet, enemy)) {
                ctx.clearRect(enemy.pos.x, 0, enemy.width, enemy.pos.y)

                score += 10
                enemy.pos.y -= bullet.force
                bullet.enabled = false
            }
        })
    
        ctx.drawLine(0, 595, canvas.width, 595)
    
        ctx.drawText('Move with the A and S keys and shoot with the space key or right-clicking with the mouse', 10, 20)
    
        ctx.drawText(`Score: ${score}`, 10, 40, { color: 'rgb(200, 0, 0)'})

        if(gameLost) {
            gameScene.gameOver()
        }

        this.score = score
        this.gameLost = gameLost
    },

    gameOver: () => {
        Game.loadScene(gameOverScene)
    }
}

const gameOverScene = {
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

    update: function() {
        if (Game.input.isButtonPressed('circle')) {
            this.restartGame()
        }
    },

    restartGame: () => {
        Game.loadScene(gameScene)
    }
}

Game.loadScene(gameScene)
