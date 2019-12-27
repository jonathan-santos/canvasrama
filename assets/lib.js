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
                    handleMouseInput(inputEventValue, eventParam)
                }    
            })
        }

        const handleKeyboardInput = (inputEventValue, eventParam) => {
            if(eventParam.key == inputEventValue.key)
                inputEventValue.action(eventParam)
        }

        const handleMouseInput = (inputEventValue, eventParam) => {
            const canvasRect = canvas.getBoundingClientRect()
            const mousePos = {
                x: Math.floor(eventParam.clientX - canvasRect.left),
                y: Math.floor(eventParam.clientY - canvasRect.top)
            }

            if(!inputEventValue.canGetOutOfViewport && gameLib.isPosOutOfGameViewport(mousePos))
                return

            inputEventValue.action(eventParam, mousePos)
        }
        
        gameLib.inputEvents.map(inputEvent => createEventListener(inputEvent))
    },

    isPosOutOfGameViewport: (pos, elementWidth = 0, elementHeight = 0) => {
        return (
            pos.x < 0
            || (pos.x + elementWidth) > canvas.width
            || pos.y < 0
            || (pos.y + elementHeight) > canvas.height
        )
    },

    getPosInsideOfGameViewport: (pos, elementWidth = 0, elementHeight = 0) => {
        if(pos.x < 0) {
            pos.x = 0
        } else if((pos.x + elementWidth) > canvas.width) {
            pos.x = canvas.width - elementWidth
        }
        if(pos.y < 0) {
            pos.y = 0
        } else if((pos.y + elementHeight) > canvas.height) {
            pos.y = canvas.height - elementHeight
        }

        return pos
    },

    initGame: (game, fps = 1000 / 30) => {
        gameLib.preGame()
    
        const loop = setInterval(game, fps)
        return loop
    }
}

ctx.drawButton = (x, y, width, height, text, borderColor = '#333', backgroundColor = '#eee', textColor = '#333') => {
    ctx.strokeStyle = borderColor
    ctx.fillStyle = backgroundColor

    ctx.strokeRect(x, y, width, height)
    ctx.fillRect(x + 1, y + 1, width - 1, height - 1)

    ctx.fillStyle = textColor
    ctx.font = '20px serif'
    const textPositionX = x + (width / 2) - (text.length * 4)
    ctx.fillText(text, textPositionX, y + height / 2 + 5)
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