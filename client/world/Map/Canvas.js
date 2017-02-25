const PIXELATIONSIZE = 17

const createCanvas = ({ width, height }) => {
  let canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  return  { canvas, context }
}

class Canvas {
  constructor(width, height) {
    this.width  = width
    this.height = height

    this.pixelationBuffer = createCanvas(this.width, this.height)
    this.map = createCanvas(this.width, this.height)
    this.buffer = createCanvas(this.width, this.height)

    this.map.context.mozImageSmoothingEnabled = false
    this.map.context.webkitImageSmoothingEnabled = false
    this.map.context.imageSmoothingEnabled = false
  }

  draw() {
    this.pixelateAndSwap(this.buffer, this.map)
  }

  pixelateAndSwap(from, to) {
    const { canvas, context } = from
    const width  = canvas.width  * PIXELATIONSIZE * 0.01
    const height = canvas.height * PIXELATIONSIZE * 0.01

    this.pixelationBuffer.context.drawImage(canvas, 0, 0, width, height)
    to.context.drawImage(this.pixelationBuffer.canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height)
  }

  get canvasElement() {
    return this.map.canvas
  }

  get context() {
    return this.buffer.context
  }
}

export default Canvas
