import System from '../Utils/System'

const PIXELATIONSIZE = 25

const createCanvas = (width, height) => {
  let canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  return  { canvas, context }
}

const pixelateAndSwap = (pixelBuffer, from, to) => {
  const { canvas, context } = from
  const width  = canvas.width  * PIXELATIONSIZE * 0.01
  const height = canvas.height * PIXELATIONSIZE * 0.01

  pixelBuffer.context.drawImage(canvas, 0, 0, width, height)
  to.context.drawImage(pixelBuffer.canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height)
}

class Canvas extends System {
  static get namespace() { return 'canvas' }
  static init(state) {
    const { width, height, element } = state

    const pixelBuffer = createCanvas(width, height),
          buffer = createCanvas(width, height),
          canvas = createCanvas(width, height)

    canvas.context.mozImageSmoothingEnabled = false
    canvas.context.webkitImageSmoothingEnabled = false
    canvas.context.imageSmoothingEnabled = false

    element.appendChild(canvas.canvas)

    return state
      .set('buffer', buffer)
      .set('canvas', canvas)
      .set('pixelBuffer', pixelBuffer)
  }

  static tick(state) {
    const { pixelBuffer, buffer, canvas } = state

    pixelateAndSwap(pixelBuffer, buffer, canvas)
    return state
  }
}

export default Canvas
