const animacaoScene = {
    start: () => {
        this.count = 0
    },

    update: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        // Not filled box
        ctx.strokeStyle = '#000'
        ctx.strokeRect(20, 50 + this.count, 30, 30)
    
        // Not filled circle
        ctx.drawOval(80 + this.count, 65, 30, false)
    
        // Dashed vertical line
        ctx.setLineDash([4, 2])
        ctx.drawLine(canvas.width / 2, 0 + this.count, canvas.width / 2, canvas.height + this.count)
    
        // Horizontal line
        ctx.setLineDash([0])
        ctx.drawLine(0 - this.count, canvas.height / 2, canvas.width - this.count, canvas.height / 2)
    
        ctx.fillStyle = '#ff0'
    
        // Filled box
        ctx.fillRect(250, 180, 200 - this.count, 200 - this.count)
    
        // Filled circle
        ctx.drawOval(700, 520, 200 - this.count)
    
        // Text
        ctx.fillStyle = '#f00'
        ctx.font = '20px serif'
        ctx.fillText('I would be a great text! ' + this.count, 10, 20)
    
        this.count++
    }
}

Game.loadScene(animacaoScene)