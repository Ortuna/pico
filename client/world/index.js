import WorldMap from '../../maps/world.json'
import Mercator from './Mercator'

const features = WorldMap.features
const defaults = {
  zoom: 0,
  center: [0, 0],
  waterColor: '#b3d1ff',
  landColor: '#fff',
  width: 600,
  height: 400,
  scale:  Math.pow(2, parseInt(0))
}

const projectCoordinate = (latitude, longitude) => {
  let point = Mercator(latitude, longitude)
  point.x = point.x * defaults.scale
  point.y = point.y * defaults.scale
  return point
}

const coordinateToPoint = (bounds, latitude, longitude) => {
  const point = projectCoordinate(latitude, longitude)
  const xScale = defaults.width / Math.abs(bounds.xMax - bounds.xMin)
  const yScale = defaults.height / Math.abs(bounds.yMax - bounds.yMin)
  const scale = xScale < yScale ? xScale : yScale

  return {
    x: (point.x - bounds.xMin) * scale,
    y: (bounds.yMax - point.y) * scale
  };
}

const getBounds = () => {
  let bounds = {}

  for (let i = 0; i < features.length; i++) {
    const coords = features[i].geometry.coordinates[0]

    for (let j = 0; j < coords.length; j++) {
      const point = projectCoordinate(coords[j][1], coords[j][0])
      bounds.xMin = bounds.xMin < point.x ? bounds.xMin : point.x
      bounds.xMax = bounds.xMax > point.x ? bounds.xMax : point.x
      bounds.yMin = bounds.yMin < point.y ? bounds.yMin : point.y
      bounds.yMax = bounds.yMax > point.y ? bounds.yMax : point.y
    }
  }
  return bounds
}

const createMap = () => {
  let map = document.createElement('canvas')
  map.width = defaults.width
  map.height = defaults.height
  map.style.top = 0
  map.style.left = 0
  map.style.position = 'absolute'
  return map
}

export default class {
  constructor(element) {
    this.map = createMap()
    this.bounds = getBounds()

    console.log(this.bounds)

    this.context = this.map.getContext('2d')
    this.element = element
    this.element.appendChild(this.map)
  }

  draw() {
    this.context.fillStyle = defaults.waterColor
    this.context.fillRect(0, 0, defaults.width, defaults.height)

    this.context.fillStyle = defaults.landColor

    for (let i = 0; i < features.length; i++) {
      const coords = features[i].geometry.coordinates[0];

      for (let j = 0; j < coords.length; j++) {
        const point = coordinateToPoint(this.bounds, coords[j][1], coords[j][0])

        if (j === 0) {
          this.context.beginPath()
          this.context.moveTo(point.x, point.y)
        } else {
          this.context.lineTo(point.x, point.y)
        }
      }
      this.context.fill()
    }
  }
}
