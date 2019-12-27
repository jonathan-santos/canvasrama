let pontos
let gameLoop
let gameLost
let player
let bullet
let enemies
let restartButton

const prepareGame = () => {
    pontos = 0
    gameLost = false

    player = {
        pos: {
            x: (canvas.width / 2) - 25,
            y: 640
        },
        velocity: {
            x: 0,
            y: 0
        },
        velocityValue: 10,
        width: 50,
        height: 50
    }

    bullet = {
        enabled: false,
        pos: {
            x: player.pos.x + (player.width / 2),
            y: player.pos.y
        },
        force: 30,
        shoot: () => {
            bullet.enabled = true
            setTimeout(() => bullet.enabled = false, 100)
        }
    }
    
    enemies = []
    for(let i = 0; i < 5; i++) {
        enemies.push({
            pos: {
                x: 90 + (i * 256),
                y: -60 - (i * 10)
            },
            width: 50,
            height: 50,
            velocity: Math.floor(Math.random() * 2 + 1)
        })
    }
    
    restartButton = {
        pos: {
            x: canvas.width / 2 - 90,
            y: canvas.height / 2 + 100,
        },
        width: 180,
        height: 60,
        text: 'Jogar de novo?'
    }
}

const game = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.pos.x += player.velocity.x * player.velocityValue

    if(player.pos.x < 0)
        player.pos.x = canvas.width - player.width
    if(player.pos.x > canvas.width)
        player.pos.x = 0

    // Player
    ctx.fillStyle = 'rgb(0,0,200)'
    ctx.fillRect(player.pos.x, player.pos.y, player.width, player.height)

    ctx.strokeStyle = 'rgb(200, 0, 0)'

    // Bullet
    if(bullet.enabled) {
        bullet.pos.x = player.pos.x + (player.width / 2)
        ctx.drawLine(bullet.pos.x, bullet.pos.y, bullet.pos.x, 0)
    }

    ctx.fillStyle = 'rgb(0,200,0)'
    // Enemies
    enemies.map((enemy) => {
        ctx.fillRect(enemy.pos.x, enemy.pos.y, enemy.width, enemy.height)

        if(enemy.pos.y + enemy.height >= 700) {
            gameLose()
            return
        }
        
        enemy.pos.y += enemy.velocity

        if(bullet.enabled && bullet.pos.x >= enemy.pos.x && bullet.pos.x <= enemy.pos.x + enemy.width) {
            enemy.pos.y -= bullet.force
        }
    })

    // Line
    ctx.strokeStyle = '#333'
    ctx.drawLine(0, 700, canvas.width, 700)

    // Controles
    ctx.fillStyle = '#333'
    ctx.font = '20px serif'
    ctx.fillText('Movimente-se com o A ou S e atire com o clique do mouse ou espaço', 10, 20)

    // Pontos
    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.font = '20px serif'
    ctx.fillText(`Pontos: ${pontos}`, 10, 40)
}

const gameLose = () => {
    gameLost = true

    clearInterval(gameLoop)

    ctx.fillStyle = 'rgb(0, 0, 0, 0.35)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = '60px serif'
    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.fillText('Você perdeu!', 480, restartButton.pos.y - 100)

    ctx.drawButton(
        x = restartButton.pos.x,
        y = restartButton.pos.y,
        width = restartButton.width,
        height = restartButton.height,
        text = restartButton.text
    )
}

const restartGame = () => {
    prepareGame()
    gameLoop = gameLib.initGame(game)
}

gameLib.inputEvents = [
    {
        event: 'keydown',
        eventType: 'keyboard',
        values: [
            { key: 'd', action: (e) => player.velocity.x = 1 },
            { key: 'a', action: (e) => player.velocity.x = -1 },
        ]
    }, {
        event: 'keyup',
        eventType: 'keyboard',
        values: [
            { key: ' ', action: (e) => {
                if(!gameLost)
                    bullet.shoot()
                else
                    restartGame()
            }},
            { key: 'd', action: (e) => {
                if(player.velocity.x == 1)
                    player.velocity.x = 0
            }},
            { key: 'a', action: (e) => {
                if(player.velocity.x == -1)
                    player.velocity.x = 0
            }}
        ]
    }, {
        event: 'click',
        eventType: 'mouse',
        values: [
            { action: (e, mousePos) => bullet.shoot() },
            { action: (e, mousePos) => {
                if(gameLost) {
                    if(mousePos.x > restartButton.pos.x
                        && mousePos.x < restartButton.pos.x + restartButton.width
                        && mousePos.y > restartButton.pos.y
                        && mousePos.y < restartButton.pos.y + restartButton.height
                    )
                        restartGame()
                }
            }}
        ]
    }
]

setInterval(() => {
    if(!gameLost)
        pontos += 10
}, 1000)

prepareGame()

gameLoop = gameLib.initGame(game)