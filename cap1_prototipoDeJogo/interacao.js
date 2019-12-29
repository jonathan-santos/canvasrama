const interacaoScene = {
    player: null,
    newMousePos: 0,

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

        this.newMousePos = null
    },

    update: () => {
        let newPos = {
            x: this.player.pos.x + this.player.speed * this.player.velocity.x,
            y: this.player.pos.y + this.player.speed * this.player.velocity.y
        }
    
        if(this.newMousePos) {
            newPos = this.newMousePos
            this.newMousePos = null
        }

        Game.utils.changeElementPosInViewport(this.player, newPos)
    
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        // Quadrado
        ctx.fillStyle = 'rgb(0,0,200)'
        ctx.fillRect(this.player.pos.x, this.player.pos.y, this.player.width, this.player.height)
    
        // Controles
        ctx.fillStyle = '#333'
        ctx.font = '20px serif'
        ctx.fillText('Movimente-se com o WASD ou com o clique do mouse', 10, 20)
    
        // Posição do quadrado
        ctx.fillStyle = 'rgb(200, 0, 0)'
        ctx.font = '20px serif'
        ctx.fillText(`O jogador está na posição x: ${this.player.pos.x}, y: ${this.player.pos.y}`, 10, 40)
    },

    inputEvents: [
        {
            event: 'keydown',
            eventType: 'keyboard',
            values: [
                { key: 'd', action: (e) => this.player.velocity.x = 1 },
                { key: 'a', action: (e) => this.player.velocity.x = -1 },
                { key: 'w', action: (e) => this.player.velocity.y = -1 },
                { key: 's', action: (e) => this.player.velocity.y = 1 },
            ]
        }, {
            event: 'keyup',
            eventType: 'keyboard',
            values: [
                { key: 'd', action: (e) => {
                    if(this.player.velocity.x == 1)
                        this.player.velocity.x = 0
                }},
                { key: 'a', action: (e) => {
                    if(this.player.velocity.x == -1)
                        this.player.velocity.x = 0
                }},
                { key: 'w', action: (e) => {
                    if(this.player.velocity.y == -1)
                        this.player.velocity.y = 0
                }},
                { key: 's', action: (e) => {
                    if(this.player.velocity.y == 1)
                        this.player.velocity.y = 0
                }}
            ]
        }, {
            event: 'click',
            eventType: 'mouse',
            values: [
                { canGetOutOfViewport: false, action: (e, mousePos) => {
                    this.newMousePos = {
                        x: mousePos.x - (this.player.width / 2),
                        y: mousePos.y - (this.player.height / 2)
                    }
                }}
            ]
        }
    ]
}

Game.loadScene(interacaoScene)