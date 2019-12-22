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

const keyboardEvents = [
    { key: 'd', event: 'keydown', action: () => xVelocity = 1 },
    { key: 'd', event: 'keyup', action: () => xVelocity = 0 },
    { key: 'a', event: 'keydown', action: () => xVelocity = -1 },
    { key: 'a', event: 'keyup', action: () => xVelocity = 0 },
    { key: 'w', event: 'keydown', action: () => yVelocity = -1 },
    { key: 'w', event: 'keyup', action: () => yVelocity = 0 },
    { key: 's', event: 'keydown', action: () => yVelocity = 1 },
    { key: 's', event: 'keyup', action: () => yVelocity = 0 },
]

gameLib.preGame(keyboardEvents)
gameLib.initGame(game)