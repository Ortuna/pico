const RADIUS = 6378137
const MAX = 85.0511287798
const RADIANS = Math.PI / 180

class CoordinateSystem {
  constructor({ width, height, features }) {
    this.width = width
    this.height = height
    this.features = features
    this.zoom = 0
  }

  mercator(latitude, longitude) {
    let point = {}

    point.x = RADIUS * longitude * RADIANS
    point.y = Math.max(Math.min(MAX, latitude), -MAX) * RADIANS
    point.y = RADIUS * Math.log(Math.tan((Math.PI / 4) + (point.y / 2)))

    return point;
  }

  projectCoordinate(latitude, longitude) {
    let point = this.mercator(latitude, longitude)

    point.x = point.x * this.scale
    point.y = point.y * this.scale
    return point
  }

  set zoom(value) {
    this._zoom = value
    this.scale = 1
  }

  get bounds() {
    if (this._bounds) { return this._bounds }

    let bounds = {}

    for (let i = 0; i < this.features.length; i++) {
      const coords = this.features[i].geometry.coordinates[0]

      for (let j = 0; j < coords.length; j++) {
        const point = this.projectCoordinate(coords[j][1], coords[j][0])
        bounds.xMin = bounds.xMin < point.x ? bounds.xMin : point.x
        bounds.xMax = bounds.xMax > point.x ? bounds.xMax : point.x
        bounds.yMin = bounds.yMin < point.y ? bounds.yMin : point.y
        bounds.yMax = bounds.yMax > point.y ? bounds.yMax : point.y
      }
    }
    this._bounds = bounds
    return bounds
  }

  coordinateToPoint(latitude, longitude) {
    const point = this.projectCoordinate(latitude, longitude)
    const xScale = this.width / Math.abs(this.bounds.xMax - this.bounds.xMin)
    const yScale = this.height / Math.abs(this.bounds.yMax - this.bounds.yMin)
    const scale = xScale < yScale ? xScale : yScale

    return {
      x: (point.x - this.bounds.xMin) * scale,
      y: (this.bounds.yMax - point.y) * scale
    };
  }
}

export default CoordinateSystem
