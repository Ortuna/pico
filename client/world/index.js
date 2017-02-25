import WorldMap from '../../maps/world.json'
import Mercator from './Mercator'

const features = WorldMap.features
const defaults = {
  zoom: 1,
  center: [5, 0],
  waterColor: '#b3d1ff',
  landColor: '#fff',
  width: 400,
  height: 300,
  pixelationSize: 25
}

defaults.scale = Math.pow(2, parseInt(defaults.zoom))

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

const createCanvas = (width, height) => {
  let canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  return  { canvas, context }
}

let pixelationBuffer = createCanvas(defaults.width, defaults.height)

const swapBuffers = (from, to) => {
  const { canvas, context } = from
  const width  = canvas.width  * defaults.pixelationSize * 0.01
  const height = canvas.height * defaults.pixelationSize * 0.01

  pixelationBuffer.context.drawImage(canvas, 0, 0, width, height)
  to.context.drawImage(pixelationBuffer.canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height)
}

export default class {
  constructor(element) {
    this.map    = createCanvas(defaults.width, defaults.height)
    this.buffer = createCanvas(defaults.width, defaults.height)
    this.bounds = getBounds()

    this.element = element
    this.element.appendChild(this.map.canvas)
    // this.element.appendChild(this.buffer.canvas)

    this.map.context.mozImageSmoothingEnabled = false
    this.map.context.webkitImageSmoothingEnabled = false
    this.map.context.imageSmoothingEnabled = false

    this.context = this.buffer.context
  }

  draw() {
    let context = this.context

    context.fillStyle = defaults.waterColor
    context.fillRect(0, 0, defaults.width, defaults.height)

    for (let i = 0; i < features.length; i++) {
      const coords = features[i].geometry.coordinates[0];

      // this.context.fillStyle = defaults.landColor
      context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16)

      for (let j = 0; j < coords.length; j++) {
        const point = coordinateToPoint(this.bounds, coords[j][1], coords[j][0])

        if (j === 0) {
          context.beginPath()
          context.moveTo(point.x, point.y)
        } else {
          context.lineTo(point.x, point.y)
        }
      }
      context.fill()
    }

    swapBuffers(this.buffer, this.map)
  }
}
