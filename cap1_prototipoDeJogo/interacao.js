const boxSize = 50
const velocity = 5
let x = (canvas.width / 2) - (boxSize / 2)
let y = (canvas.height / 2) - (boxSize / 2)

let xVelocity = 0
let yVelocity = 0

const game = () => {
    x += velocity * xVelocity
    y += velocity * yVelocity

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Quadrado
    ctx.fillStyle = 'rgb(0,0,200)'
    ctx.fillRect(x, y, boxSize, boxSize)

    // Texto
    ctx.fillStyle = '#333'
    ctx.font = '20px serif'
    ctx.fillText(`A caixa está na posição x: ${x}, y: ${y}`, 30, 50)
}

gameLib.inputEvents = [
    {
        event: 'keydown',
        eventType: 'keyboard',
        values: [
            { key: 'd', action: () => xVelocity = 1 },
            { key: 'a', action: () => xVelocity = -1 },
            { key: 'w', action: () => yVelocity = -1 },
            { key: 's', action: () => yVelocity = 1 },
        ]
    },
    {
        event: 'keyup',
        eventType: 'keyboard',
        values: [
            { key: 'd', action: () => {
                if(xVelocity == 1)
                    xVelocity = 0
            }},
            { key: 'a', action: () => {
                if(xVelocity == -1)
                    xVelocity = 0
            }},
            { key: 'w', action: () => {
                if(yVelocity == -1)
                    yVelocity = 0
            }},
            { key: 's', action: () => {
                if(yVelocity == 1)
                    yVelocity = 0
            }}
        ]
    }
]

gameLib.initGame(game)