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
            speed: 20,
            velocity: {
                x: 0,
                y: 0
            }
        })
    },

    update: () => {
        if (Game.input.isButtonDown('right')) {
            this.player.velocity.x = 1
        } else if (Game.input.isButtonDown('left')) {
            this.player.velocity.x = -1
        } else {
            this.player.velocity.x = 0
        }

        if (Game.input.isButtonDown('down')) {
            this.player.velocity.y = 1
        } else if (Game.input.isButtonDown('up')) {
            this.player.velocity.y = -1
        } else {
            this.player.velocity.y = 0
        }

        Game.utils.moveElementInsideViewport(this.player, {
            x: this.player.pos.x + this.player.speed * this.player.velocity.x,
            y: this.player.pos.y + this.player.speed * this.player.velocity.y
        })
    
        ctx.clear()
    
        this.player.draw()
    
        ctx.drawText('Move with WASD keys or with a mouse click', 10, 20)
    
        ctx.drawText(`The player is in position x: ${this.player.pos.x}, y: ${this.player.pos.y}`, 10, 40, { color: 'rgb(200, 0, 0)' })
    }
})
