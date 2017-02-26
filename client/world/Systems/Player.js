import System from '../Utils/System'

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}

const randomlyMove = (player) => {
  if (player.x < 500) {
    player.x += 3
  } else {
    player.x = 0
  }

  player.y += getRandom(1, 3)
  player.y -= getRandom(1, 3)

  return player
}

const drawPlayer = (context, player) => {
  const { x, y, size, playerColor } = player
  context.fillStyle = playerColor
  context.fillRect(x, y, size, size)
}

class Player extends System {
  static get namespace() { return 'coordinate' }
  static init(state) {
    const player = {
      playerColor: '#ff0000',
      size: 5,
      x: 150,
      y: 200
    }

    return state.set('player', player)
  }

  static tick(state) {
    const {
      player,
      canvas: { context }
    } = state

    drawPlayer(context, player)

    return state
      .set('player', randomlyMove(player))
  }
}

export default Player
