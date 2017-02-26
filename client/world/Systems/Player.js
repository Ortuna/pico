import System from '../Utils/System'

class Player extends System {
  static get namespace() { return 'coordinate' }
  static init(state) {
    const player = {
      size: 5,
      x: 150,
      y: 200
    }

    return state.set('player', player)
  }

  static tick(state) {
    const {
      playerColor,
      player: { x, y, size },
      canvas: { context }
    } = state

    context.fillStyle = playerColor
    context.fillRect(x, y, size, size)

    return state
  }
}

export default Player
