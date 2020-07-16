const animacaoScene = {
    start: () => {
        this.count = 0
    },

    update: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        // Quadrado não preenchido
        ctx.strokeStyle = '#000'
        ctx.strokeRect(20, 50 + this.count, 30, 30)
    
        // Círculo não preenchido
        ctx.drawOval(80 + this.count, 65, 30, false)
    
        // Linha tracejada vertical
        ctx.setLineDash([4, 2])
        ctx.drawLine(canvas.width / 2, 0 + this.count, canvas.width / 2, canvas.height + this.count)
    
        // Linha normal horizontal
        ctx.setLineDash([0])
        ctx.drawLine(0 - this.count, canvas.height / 2, canvas.width - this.count, canvas.height / 2)
    
        ctx.fillStyle = '#ff0'
    
        // Quadrado preenchido
        ctx.fillRect(250, 180, 200 - this.count, 200 - this.count)
    
        // Círculo preenchido
        ctx.drawOval(700, 520, 200 - this.count)
    
        // Texto
        ctx.fillStyle = '#f00'
        ctx.font = '20px serif'
        ctx.fillText('Eu seria uma ótima Score! ' + this.count, 10, 20)
    
        this.count++
    }
}

Game.loadScene(animacaoScene)