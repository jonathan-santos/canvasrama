const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const Game = {
    loadScene: (scene) => {
        if(!scene)
            throw new Error('No scene to be loaded')

        if(Game.currentScene)
            cancelAnimationFrame(Game.loop)

        Game.currentScene = scene
        Game.currentScene.state = {}

        if(scene.start)
            scene.start(scene.state)

        if(scene.update)
            Game.loop = requestAnimationFrame(Game.mainLoop)
    },

    mainLoop: () => {
        Game.currentScene.update(Game.currentScene.state)
        Game.input.resetPressedEvents()
        requestAnimationFrame(Game.mainLoop)
    },

    newElement: (params) => {
        return {
            pos: { x: 0, y: 0 },
            width: 0,
            height: 0,
            enabled: true,
            speed: 0,
            velocity: {
                x: 0,
                y: 0
            },
            color: 'blue',
            renderer: 'boxColor',
            draw: function () {
                if(this.enabled)
                    Game.renderers[this.renderer](this)
                },
            ...params
        }
    },
    
    input: {
        buttons: [
            { type: 'move', name: 'up', keys: ['w', 'ArrowUp'], state: 'idle', element: null },
            { type: 'move', name: 'right', keys: ['d', 'ArrowRight'], state: 'idle', element: null },
            { type: 'move', name: 'down', keys: ['s', 'ArrowDown'], state: 'idle', element: null },
            { type: 'move', name: 'left', keys: ['a', 'ArrowLeft'], state: 'idle', element: null },
            { type: 'action', name: 'circle', keys: ['j', ' '], state: 'idle', element: null },
            { type: 'action', name: 'square', keys: ['k'], state: 'idle', element: null }
        ],

        clickPosition: null,

        hasClickedInside: (element) => {
            const { clickPosition } = Game.input

            return clickPosition != null
                && clickPosition.x > element.pos.x && clickPosition.x < element.pos.x + element.width
                && clickPosition.y > element.pos.y && clickPosition.y < element.pos.y + element.height
        },

        findButton: (test, callback) => {
            Game.input.buttons.forEach(button => {
                if (test(button))
                    callback(button)
            })
        },

        resetPressedEvents: () => {
            Game.input.buttons.forEach(button => {
                if (button.state == 'pressed')
                    button.state = 'idle'
            })

            Game.input.clickPosition = null
        },
        
        isButtonDown: (buttonName) => {
            const button = Game.input.buttons.find(b => b.name == buttonName)
            return button && button.state === 'down'
        },

        isButtonPressed: (buttonName) => {
            const button = Game.input.buttons.find(b => b.name == buttonName)
            return button && button.state === 'pressed'
        },
    },

    utils: {
        detectCollision: (element1, element2) => {
            if(!element1.enabled || !element2.enabled)
                return false
            
            return (
                element1.pos.x > element2.pos.x
                && (element1.pos.x + element1.width) < (element2.pos.x + element2.width)
                && element1.pos.y > element2.pos.y
                && (element1.pos.y + element1.height)  < (element2.pos.y + element2.height)
            )
        },

        isOutOfViewport: (element) => (
            element.pos.x < 0
            || (element.pos.x + element.width) > canvas.width
            || element.pos.y < 0
            || (element.pos.y + element.height) > canvas.height
        ),
    
        moveElementInsideViewport: (element, newPos) => {
            if(newPos.x < 0)
                newPos.x = 0
            else if((newPos.x + element.width) > canvas.width)
                newPos.x = canvas.width - element.width

            if(newPos.y < 0)
                newPos.y = 0
            else if((newPos.y + element.height) > canvas.height)
                newPos.y = canvas.height - element.height
    
            element.pos = newPos
        }
    },

    renderers: {
        boxColor: (element) => {
            ctx.fillStyle = element.color
            ctx.fillRect(element.pos.x, element.pos.y, element.width, element.height)
        },

        circleColor: (element) => {
            ctx.fillStyle = element.color
            ctx.drawOval(element.pos.x, element.pos.y, element.width)
        },

        button: ({ pos, width, height, text, style}) => {
            const { x, y } = pos

            style = {
                borderColor: '#333',
                backgroundColor: '#eee',
                color: '#333',
                fontSize: 1.4,
                font: 'serif',
                borderWidth: 2,
                ...style
            }
        
            ctx.strokeStyle = style.borderColor
            ctx.lineWidth = style.borderWidth
            ctx.fillStyle = style.backgroundColor
        
            ctx.strokeRect(x, y, width + style.borderWidth, height + style.borderWidth)
            ctx.fillRect(x + style.borderWidth, y + style.borderWidth, width - style.borderWidth, height - style.borderWidth)
        
            ctx.fillStyle = style.color
            ctx.font = `${style.fontSize}rem ${style.font}`
        
            const textSize = ctx.measureText(text)
            const textPositionX = x + (width / 2) - (textSize.width / 2.25)
            const textPositionY = y + (style.fontSize * 16 / 2.75) + (height / 2)
            ctx.fillText(text, textPositionX, textPositionY)
        }
    },

    config: {
        run: () => {
            canvas.width = 800
            canvas.height = 600
            canvas.innerHTML = 'Unfortunely your Browser doesn\'t support canvas :('

            Game.config.createButtons()
            Game.config.registerInputEvents()
            Game.config.extendCtxFunctions()
        },

        createButtons: () => {
            const canvasrama = document.querySelector('.canvasrama')
    
            const createButton = (button) => {
                const newButton = document.createElement('button')
                newButton.className = `${button.type} ${button.name}`
                newButton.innerHTML += `<i class='icon-${button.name}'></i>`
                if (button.type == 'move')
                    newButton.innerHTML += `<span class='arrow arrow-button-${button.name}'></span>`
                canvasrama.appendChild(newButton)

                button.element = newButton
            }
        
            const createCenter = () => {
                const center = document.createElement('div')
                center.className = 'center'
                canvasrama.appendChild(center)
            }
        
            Game.input.buttons.forEach(button => createButton(button))
            createCenter()
        },

        registerInputEvents: () => {
            const isButtonPressed = (e, callback) => {
                const findButton = (button) =>  button.keys.find(key => key == e.key)
                Game.input.findButton(findButton, callback)
            }
    
            const buttonDown = (button) => {
                button.element.classList.add('active')
                button.state = 'down'
            }
    
            const buttonUp = (button) => {
                button.element.classList.remove('active')
                button.state = 'pressed'
            }
            
            Game.input.buttons.forEach((button) => {
                button.element.addEventListener('pointerdown', (e) => {
                    window.navigator.vibrate(40)
                    buttonDown(button)
                })
    
                button.element.addEventListener('pointerup', (e) => {
                    buttonUp(button)
                })

                button.element.addEventListener('pointerout', (e) => {
                    buttonUp(button)
                })
    
                button.element.addEventListener('pointercancel', (e) => {
                    buttonUp(button)
                })
            })
    
            document.addEventListener('keydown', (e) => {
                isButtonPressed(e, (button) => buttonDown(button))
            })
    
            document.addEventListener('keyup', (e) => {
                isButtonPressed(e, (button) => buttonUp(button))
            })

            canvas.addEventListener('pointerdown', (e) => {
                const clickPos = {
                    x: e.offsetX * canvas.width / canvas.clientWidth | 0,
                    y: e.offsetY * canvas.height / canvas.clientHeight | 0
                }
            
                Game.input.clickPosition = clickPos
            })
        },

        extendCtxFunctions: () => {
            ctx.clear = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
            }
            
            ctx.drawBackdrop = (opacity) => {
                ctx.fillStyle = `rgb(0, 0, 0, ${opacity})`
                ctx.fillRect(0, 0, canvas.width, canvas.height)
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
            
            ctx.drawLine = (x, y, endX, endY, color = '#333') => {
                ctx.strokeStyle = color
            
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.lineTo(endX, endY)
                ctx.stroke()
            }
            
            ctx.drawText = (text, x, y, style) => {
                style = {
                    color: '#333',
                    font: '20px serif',
                    ...style
                }
            
                ctx.font = style.font
                ctx.fillStyle = style.color
            
                ctx.fillText(text, x, y, style.maxWidth)
            }
        }
    }
}

Game.config.run()
