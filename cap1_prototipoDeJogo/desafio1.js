ctx.fillStyle = '#fff'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Quadrado não preenchido
ctx.strokeStyle = '#000'
ctx.strokeRect(20, 50, 30, 30)

// Círculo não preenchido
ctx.beginPath()
ctx.arc(80, 65, 30, 0, Math.PI * 2, true)
ctx.stroke()

// Linha tracejada vertical
ctx.setLineDash([4, 2])
ctx.beginPath()
ctx.moveTo(canvas.width / 2, 0)    
ctx.lineTo(canvas.width / 2, canvas.height)
ctx.stroke()

// Linha normal horizontal
ctx.setLineDash([0])
ctx.beginPath()
ctx.moveTo(0, canvas.height / 2)
ctx.lineTo(canvas.width, canvas.height / 2)
ctx.stroke()

ctx.fillStyle = '#ff0'

// Quadrado preenchido
ctx.fillRect(250, 180, 200, 200)

// Círculo preenchido
ctx.beginPath()
ctx.arc(700, 520, 200, 0, Math.PI * 2, true)
ctx.fill()

// Texto
ctx.fillStyle = '#f00'
ctx.font = '20px serif'
ctx.fillText('Eu seria uma ótima Score!', 10, 20)