import System from '../Utils/System'

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}

const movePlayer = (keys, player) => {
  if (keys.length === 0) return player

  keys.map((event) => {
    switch(event.key) {
      case 'ArrowUp':
        player.y -= 5
        break
      case 'ArrowDown':
        player.y += 5
        break
      case 'ArrowLeft':
        player.x -= 5
        break
      case 'ArrowRight':
        player.x += 5
        break
    }
  })

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
      keys,
      canvas: { context }
    } = state

    drawPlayer(context, player)

    return state
      .set('player', movePlayer(keys, player))
  }
}

export default Player
