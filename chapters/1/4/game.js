const gameScene = {
    start: (state) => {
        state.score = 0
        state.gameLost = false

        state.player = Game.newElement({
            pos: {
                x: (canvas.width / 2) - 25,
                y: 540
            },
            width: 50,
            height: 50,
            speed: 10,
        })
    
        state.bullet = Game.newElement({
            enabled: false,
            pos: {
                x: state.player.pos.x + (state.player.width / 2),
                y: state.player.pos.y
            },
            width: 1,
            height: -600,
            color: 'rgb(200, 0, 0)',
            force: 30,
            shoot: () => {
                state.bullet.enabled = true
                setTimeout(() => state.bullet.enabled = false, 100)
            }
        })
        
        state.enemies = []
        for(let i = 0; i < 5; i++) {
            state.enemies.push(Game.newElement({
                pos: {
                    x: 90 + (i * 150),
                    y: -60 - (i * 10)
                },
                width: 50,
                height: 50,
                speed: Math.floor(Math.random() * 0.5 + 1),
                color: 'rgb(0, 200, 0)'
            }))
        }
    },

    update: (state) => {
        let { player, bullet, enemies, gameLost } = state

        ctx.clear()

        if (Game.input.isButtonDown('right'))
            player.velocity.x = 1
        else if (Game.input.isButtonDown('left'))
            player.velocity.x = -1
        else
            player.velocity.x = 0

        if (Game.input.isButtonPressed('circle') || Game.input.clickPosition)
            bullet.shoot()

        player.pos.x += player.velocity.x * player.speed
    
        if(player.pos.x < 0)
            player.pos.x = canvas.width - player.width

        if(player.pos.x > canvas.width)
            player.pos.x = 0
    
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

                state.score += 10
                enemy.pos.y -= bullet.force
                bullet.enabled = false
            }
        })
    
        ctx.drawLine(0, 595, canvas.width, 595)
    
        ctx.drawText('Move with the A and S keys and shoot with the space key or right-clicking with the mouse', 10, 20)
    
        ctx.drawText(`Score: ${state.score}`, 10, 40, { color: 'rgb(200, 0, 0)'})

        if(gameLost)
            Game.loadScene(gameOverScene)
    }
}

const gameOverScene = {
    start: (state) => {
        state.restartButton = Game.newElement({
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

        ctx.drawText('You lose!', 255, state.restartButton.pos.y - 100, { color: 'rgb(225, 0, 0)', font: '5rem serif' })

        state.restartButton.draw()
    },

    update: ({ restartButton }) => {
        if (Game.input.isButtonPressed('circle')
            || Game.input.hasClickedInside(restartButton))
            Game.loadScene(gameScene)
    }
}

Game.loadScene(gameScene)
