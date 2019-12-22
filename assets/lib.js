const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const gameLib = {
    preGame: (keyboardEvents) => {
        document.addEventListener('keydown', (e) => {
            keyboardEvents.filter(k => k.event == 'keydown')
                .map(k => {
                    if(e.key == k.key) {
                        k.action()
                    }
                });
        })
        
        document.addEventListener('keyup', (e) => {
            keyboardEvents.filter(k => k.event == 'keyup')
                .map(k => {
                    if(e.key == k.key) {
                        k.action()
                    }
                });
        })
    },

    initGame: (game, fps = 1000 / 30) => {
        gameLib.preGame()
    
        const loop = setInterval(game, fps)
        return loop
    }
}

ctx.drawOval = (x, y, size, fill = true) => {
    if(size < 0)
        size = 0

    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2, false)

    if(fill)
        ctx.fill()
    else
        ctx.stroke()
}

ctx.drawLine = (x, y, endX, endY) => {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(endX, endY)
    ctx.stroke()
}