import System from '../Utils/System'

const RADIUS = 6378137
const MAX = 85.0511287798
const RADIANS = Math.PI / 180

window.scale = 1

class Coordinate extends System {
  static get namespace() { return 'coordinate' }
  static init(state) {
    const bounds = this.bounds(state)
    return state.set('bounds', bounds)
  }

  static tick(state) {
     return state
  }

  static mercator(latitude, longitude) {
    let point = {}
    point.x = RADIUS * longitude * RADIANS
    point.y = Math.max(Math.min(MAX, latitude), -MAX) * RADIANS
    point.y = RADIUS * Math.log(Math.tan((Math.PI / 4) + (point.y / 2)))

    return point;
  }

  static projectCoordinate(scale, latitude, longitude) {
    let point = this.mercator(latitude, longitude)

    point.x = point.x * scale
    point.y = point.y * scale
    return point
  }

  static bounds(state) {
    const { features, scale } = state
    let bounds = {}
    features.map((feature) => {
      feature.get('geometry').get('coordinates').map((polygon) => {
        polygon.map((rawCoords, index) => {
          const coords = rawCoords.toJS()
          const point = this.projectCoordinate(scale, coords[1], coords[0])
          bounds.xMin = bounds.xMin < point.x ? bounds.xMin : point.x
          bounds.xMax = bounds.xMax > point.x ? bounds.xMax : point.x
          bounds.yMin = bounds.yMin < point.y ? bounds.yMin : point.y
          bounds.yMax = bounds.yMax > point.y ? bounds.yMax : point.y
        })
      })
    })

    return bounds
  }

  static coordinateToPoint(state, latitude, longitude) {
    const { bounds, height, width, scale: mapScale } = state

    const point = this.projectCoordinate(mapScale, latitude, longitude)

    // const xScale = width / Math.abs(bounds.xMax - bounds.xMin)
    // const yScale = height / Math.abs(bounds.yMax - bounds.yMin)
    // const scale = xScale < yScale ? xScale : yScale

    // console.log(scale);return
    return {
      x: (point.x - bounds.xMin),
      y: (bounds.yMax - point.y)
    };
  }

}

export default Coordinate
