import System from '../Utils/System'

const draw = (state) => {
  const {
    features,
    waterColor,
    landColor,
    width,
    height,
    canvas: { canvas },
    buffer: { context },
    bounds
  } = state

  const cs = System.getSystem(state, 'coordinate')

  context.fillStyle = waterColor
  context.fillRect(0, 0, width, height)

  features.map((feature) => {
    feature.get('geometry').get('coordinates').map((polygon) => {
      polygon.map((rawCoords, index) => {
        const coords = rawCoords.toJS()
        const point = cs.coordinateToPoint(state, coords[1], coords[0])

        // context.fillStyle = landColor
        context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16)
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
    if (state.get('redraw') == false)
      return state

    draw(state)
    return state.set('redraw', false)
  }
}

export default Map
