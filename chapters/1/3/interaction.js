Game.loadScene({
    start: () => {
        const playerSize = 50

        this.player = Game.newElement({
            pos: {
                x: (canvas.width / 2) - (playerSize / 2),
                y: (canvas.height / 2) - (playerSize / 2)
            },
            width: playerSize,
            height: playerSize,
            speed: 10,
            velocity: {
                x: 0,
                y: 0
            }
        })
    },

    update: () => {
        const { player } = this
        
        ctx.clear()

        if (Game.input.isButtonDown('right'))
            player.velocity.x = 1
        else if (Game.input.isButtonDown('left'))
            player.velocity.x = -1
        else
            player.velocity.x = 0

        if (Game.input.isButtonDown('down'))
            player.velocity.y = 1
        else if (Game.input.isButtonDown('up'))
            player.velocity.y = -1
        else
            player.velocity.y = 0

        Game.utils.moveElementInsideViewport(player, {
            x: player.pos.x + player.speed * player.velocity.x,
            y: player.pos.y + player.speed * player.velocity.y
        })

        if (Game.input.clickPosition) {
            Game.utils.moveElementInsideViewport(player, {
                x: Game.input.clickPosition.x - player.width / 2,
                y: Game.input.clickPosition.y - player.height / 2
            })
        }
            
        player.draw()
    
        ctx.drawText('Move with WASD keys or with a mouse click', 10, 20)
        
        ctx.drawText(`The player is in position x: ${player.pos.x}, y: ${player.pos.y}`, 10, 40, { color: 'rgb(200, 0, 0)' })
    }
})
