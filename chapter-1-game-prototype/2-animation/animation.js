Game.loadScene({
    start: () => {
        this.count = 0
    },

    update: () => {
        let { count } = this

        ctx.clear()
    
        // Not filled box
        ctx.strokeStyle = '#000'
        ctx.strokeRect(20, 50 + count, 30, 30)
    
        // Not filled circle
        ctx.drawOval(80 + count, 65, 30, false)
    
        // Dashed vertical line
        ctx.setLineDash([4, 2])
        ctx.drawLine(canvas.width / 2, 0 + count, canvas.width / 2, canvas.height + count)
    
        // Horizontal line
        ctx.setLineDash([0])
        ctx.drawLine(0 - count, canvas.height / 2, canvas.width - count, canvas.height / 2)
    
        ctx.fillStyle = '#ff0'
    
        // Filled box
        ctx.fillRect(100, 180, 200 - count, 200 - count)
    
        // Filled circle
        ctx.drawOval(590, 390, 200 - count)
    
        // Text
        ctx.fillStyle = '#f00'
        ctx.font = '20px serif'
        ctx.fillText('I would be a great text! ' + count, 10, 20)
    
        this.count += 1
    }
})
