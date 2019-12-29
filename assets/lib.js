const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const Game = {
    currentScene: null,
    eventsHandlers: null,

    loadScene: function(scene, fps = 1000 / 30) {
        if(scene == null)
            return

        if(this.currentScene != null) {
            this.removeInputEvents(this.currentScene.inputEvents)
            clearInterval(this.currentScene.loopID)
        }

        this.currentScene = scene

        Game.registerInputEvents.bind(scene)
        this.registerInputEvents(scene.inputEvents)

        if(scene.start != null) {
            scene.start.bind(scene)
            scene.start()
        }

        if(scene.update != null) {
            scene.update.bind(scene)
            scene.loopID = setInterval(
                handler = () => scene.update(),
                timeout = fps
            )
        }
    },

    newElement: (params) => ({
        pos: { x: 0, y: 0},
        width: 0,
        height: 0,
        enabled: true,
        speed: 0,
        velocity: {
            x: 0,
            y: 0
        },
        ...params
    }),

    removeInputEvents: (inputEvents) => {
        if(inputEvents == null)
            return

        inputEvents.map(inputEvent => {
            document.removeEventListener(inputEvent.event, inputEvent.eventHandler)
        })
    },

    registerInputEvents: (inputEvents) => {
        if(inputEvents == null)
            return

        const createEventListener = (inputEvent) => {
            inputEvent.eventHandler = (eventParam) => {
                handleInputEventValues(inputEvent, eventParam)
            }

            document.addEventListener(inputEvent.event, inputEvent.eventHandler)
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

            const mousePosElement = Game.newElement({ pos: mousePos })
            if(!inputEventValue.canGetOutOfViewport && Game.utils.isElementOutOfViewport(mousePosElement))
                return

            inputEventValue.action(eventParam, mousePos)
        }
        
        inputEvents.map(inputEvent => createEventListener(inputEvent))
    },

    utils: {
        detectCollision: (element1, element2) => (
            element1.pos.x > element2.pos.x
            && (element1.pos.x + element1.width) < (element2.pos.x + element2.width)
            && element1.pos.y > element2.pos.y
            && (element1.pos.y + element1.height)  < (element2.pos.y + element2.height)
        ),

        isElementOutOfViewport: (element) => (
            element.pos.x < 0
            || (element.pos.x + element.width) > canvas.width
            || element.pos.y < 0
            || (element.pos.y + element.height) > canvas.height
        ),
    
        changeElementPosInViewport: (element, newPos) => {
            if(newPos.x < 0) {
                newPos.x = 0
            } else if((newPos.x + element.width) > canvas.width) {
                newPos.x = canvas.width - element.width
            }

            if(newPos.y < 0) {
                newPos.y = 0
            } else if((newPos.y + element.height) > canvas.height) {
                newPos.y = canvas.height - element.height
            }
    
            element.pos = newPos
        }
    }
}

ctx.drawButton = (x, y, width, height, text, style) => {
    style = {
        borderColor: '#333',
        backgroundColor: '#eee',
        color: '#333',
        font: '20px serif',
        ...style
    }

    ctx.strokeStyle = style.borderColor
    ctx.fillStyle = style.backgroundColor

    ctx.strokeRect(x, y, width, height)
    ctx.fillRect(x + 1, y + 1, width - 1, height - 1)

    ctx.fillStyle = style.color
    ctx.font = style.font

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