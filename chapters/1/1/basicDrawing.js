ctx.clear()

// Not filled box
ctx.strokeStyle = '#000'
ctx.strokeRect(20, 50, 30, 30)

// Not filled circle
ctx.drawOval(80, 65, 30, false)

// Dashed vertical line
ctx.setLineDash([4, 2])
ctx.drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height)

// Horizontal line
ctx.setLineDash([0])
ctx.drawLine(0, canvas.height / 2, canvas.width, canvas.height / 2)

ctx.fillStyle = '#ff0'

// Filled Box
ctx.fillRect(100, 180, 200, 200)

// Filled Circle
ctx.drawOval(590, 390, 200)

// Text
ctx.fillStyle = '#f00'
ctx.font = '20px serif'
ctx.fillText('I would be a great score!', 10, 20)
