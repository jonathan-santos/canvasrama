const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const gameLib = {
    inputEvents: null,

    preGame: () => {
        gameLib.registerInputEvents()
    },

    registerInputEvents: () => {
        if(gameLib.inputEvents == null)
            return
            
        const createEventListener = (inputEvent) => {
            document.addEventListener(inputEvent.event, (eventParam) => {
                handleInputEventValues(inputEvent, eventParam)
            })
        }

        const handleInputEventValues = (inputEvent, eventParam) => {
            inputEvent.values.map((inputEventValue) => {
                if(inputEvent.eventType == 'keyboard') {
                    handleKeyboardInput(inputEventValue, eventParam)
                } else if(inputEvent.eventType == 'mouse') {
                    handleMouseINput(inputEventValue, eventParam)
                }    
            })
        }

        const handleKeyboardInput = (inputEventValue, eventParam) => {
            if(eventParam.key == inputEventValue.key)
                inputEventValue.action()
        }
        
        gameLib.inputEvents.map(inputEvent => createEventListener(inputEvent))
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