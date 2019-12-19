const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const initGame = (game, fps = 1000 / 30) => {
    const loop = setInterval(game, fpsp)
    return loop
}
