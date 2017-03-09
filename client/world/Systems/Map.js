import System from '../Utils/System'
import Coordinate from '../Utils/Coordinate'
import Seedrandom from 'seedrandom'

const rng = new Math.seedrandom('hello.')

const draw = (state) => {
  const {
    features,
    waterColor,
    landColor,
    width,
    height,
    canvas: { canvas },
    buffer: { context },
    bounds,
    player,
  } = state

  context.fillStyle = waterColor
  context.fillRect(0, 0, width, height)

  features.map((feature) => {
    feature.get('geometry').get('coordinates').map((polygon) => {
      polygon.map((rawCoords, index) => {
        const coords = rawCoords.toJS()
        const point =
          Coordinate.coordinateToPoint(
            state,
            coords[1] + player.y,
            coords[0] - player.x
          )

        // context.fillStyle = landColor
        context.fillStyle = '#'+Math.floor(rng()*16777215).toString(16)
        if (index === 0) {
          context.beginPath()
          context.moveTo(point.x, point.y)
        } else {
          context.lineTo(point.x, point.y)
        }
      })
      context.fill()
    })
  })
}

class Map extends System {
  static init(state) {
    return state
  }

  static tick(state) {
    if (state.get('redraw') == false) return state

    draw(state)

    return state.set('redraw', false)
  }
}

export default Map
