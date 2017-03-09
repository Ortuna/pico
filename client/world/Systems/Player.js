import System from '../Utils/System'

const SCALE_OFFSET = 0.25
const OFFSET = 0.00001

const setRedraw = (state) => {
  return true
}

const zoomMap = ({ keys, scale }) => {
  if (keys.length === 0) return scale

  keys.map((event) => {
    switch(event.key) {
      case '-':
        scale -= SCALE_OFFSET
        break
      case '=':
        scale += SCALE_OFFSET
        break
    }
  })

  return scale
}

const movePlayer = (state) => {
  const { keys, player } = state
  if (keys.length === 0) return player

  keys.map((event) => {
    switch(event.key) {
      case 'ArrowUp':
        player.y -= OFFSET
        break
      case 'ArrowDown':
        player.y += OFFSET
        break
      case 'ArrowLeft':
        player.x -= OFFSET
        break
      case 'ArrowRight':
        player.x += OFFSET
        break
    }
  })

  return player
}

const drawPlayer = ({ buffer , player, width, height }) => {
  const { context } = buffer
  const { size, playerColor } = player

  context.beginPath()
  context.fillStyle = playerColor
  context.arc(width / 2, height / 2, size, 0, 2 * Math.PI, false)
  context.fill()
}

class Player extends System {
  static get namespace() { return 'coordinate' }
  static init(state) {
    const player = {
      playerColor: '#ff0000',
      size: 10,
      x: 0,
      y: 0
    }

    return state.set('player', player)
  }

  static tick(state) {
    drawPlayer(state)

    return state
      .set('player', movePlayer(state))
      .set('scale', zoomMap(state))
      .set('redraw', setRedraw(state))
  }
}

export default Player
