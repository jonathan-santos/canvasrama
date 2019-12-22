const boxSize = 50
const velocity = 20

let pos = {
    x: (canvas.width / 2) - (boxSize / 2),
    y: (canvas.height / 2) - (boxSize / 2)
}

newPosMouse = null

let xVelocity = 0
let yVelocity = 0

const game = () => {
    let newPos = {
        x: pos.x + velocity * xVelocity,
        y: pos.y + velocity * yVelocity
    }

    if(newPosMouse) {
        newPos = newPosMouse
        newPosMouse = null
    }

    pos = gameLib.getPosInsideOfGameViewport(newPos, boxSize, boxSize)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Quadrado
    ctx.fillStyle = 'rgb(0,0,200)'
    ctx.fillRect(pos.x, pos.y, boxSize, boxSize)

    // Controles
    ctx.fillStyle = '#333'
    ctx.font = '20px serif'
    ctx.fillText('Movimente-se com o WASD ou com o clique do mouse', 10, 20)

    // Posição do quadrado
    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.font = '20px serif'
    ctx.fillText(`A caixa está na posição x: ${pos.x}, y: ${pos.y}`, 10, 40)
}

gameLib.inputEvents = [
    {
        event: 'keydown',
        eventType: 'keyboard',
        values: [
            { key: 'd', action: (e) => xVelocity = 1 },
            { key: 'a', action: (e) => xVelocity = -1 },
            { key: 'w', action: (e) => yVelocity = -1 },
            { key: 's', action: (e) => yVelocity = 1 },
        ]
    }, {
        event: 'keyup',
        eventType: 'keyboard',
        values: [
            { key: 'd', action: (e) => {
                if(xVelocity == 1)
                    xVelocity = 0
            }},
            { key: 'a', action: (e) => {
                if(xVelocity == -1)
                    xVelocity = 0
            }},
            { key: 'w', action: (e) => {
                if(yVelocity == -1)
                    yVelocity = 0
            }},
            { key: 's', action: (e) => {
                if(yVelocity == 1)
                    yVelocity = 0
            }}
        ]
    }, {
        event: 'click',
        eventType: 'mouse',
        values: [
            { canGetOutOfViewport: false, action: (e, mousePos) => {
                newPosMouse = {
                    x: mousePos.x - (boxSize / 2),
                    y: mousePos.y - (boxSize / 2)
                }
            }}
        ]
    }
]

gameLib.initGame(game)