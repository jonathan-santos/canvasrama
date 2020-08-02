const interactionScene = {
    player: null,
    newMousePos: null,

    start: () => {
        const playerSize = 50
        this.player = Game.utils.newElement({
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
            },
        })

        this.newMousePos = null
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

        const newPos = {
            x: this.player.pos.x + this.player.speed * this.player.velocity.x,
            y: this.player.pos.y + this.player.speed * this.player.velocity.y
        }

        Game.utils.changeElementPosInViewport(this.player, newPos)
    
        ctx.clear()
    
        // Box
        this.player.draw()
    
        // Controls text
        ctx.drawText('Move with WASD keys or with a mouse click', 10, 20)
    
        // Box position text
        ctx.drawText(`The player is in position x: ${this.player.pos.x}, y: ${this.player.pos.y}`, 10, 40, { color: 'rgb(200, 0, 0)' })
    }
}

Game.loadScene(interactionScene)