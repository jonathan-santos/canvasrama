let count = 0

const game = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Quadrado não preenchido
    ctx.strokeStyle = '#000'
    ctx.strokeRect(20, 50 + count, 30, 30)

    // Círculo não preenchido
    ctx.drawOval(80 + count, 65, 30, false)

    // Linha tracejada vertical
    ctx.setLineDash([4, 2])
    ctx.drawLine(canvas.width / 2, 0 + count, canvas.width / 2, canvas.height + count)

    // Linha normal horizontal
    ctx.setLineDash([0])
    ctx.drawLine(0 - count, canvas.height / 2, canvas.width - count, canvas.height / 2)

    ctx.fillStyle = '#ff0'

    // Quadrado preenchido
    ctx.fillRect(250, 180, 200 - count, 200 -count)

    // Círculo preenchido
    ctx.drawOval(700, 520, 200 - count)

    // Texto
    ctx.fillStyle = '#f00'
    ctx.font = '20px serif'
    ctx.fillText('Eu seria uma ótima Score! ' + count, 10, 20)

    count++
}

initGame(game)