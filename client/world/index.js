import WorldMap from '../../maps/world.json'
import CS from './Map/CoordinateSystem'
import Canvas from './Map/Canvas'

const state = {
  center: [0, 0],
  waterColor: '#b3d1ff',
  landColor: '#fff',
  width: 550,
  height: 500,
  features: WorldMap.features
}

export default class {
  constructor(element) {
    this.element = element
    this.canvas = new Canvas(state)
    this.cs = new CS(state)

    this.element.appendChild(this.canvas.canvasElement)
  }

  get context() {
    return this.canvas.context
  }

  draw() {
    const { features } = state
    this.context.fillStyle = state.waterColor
    this.context.fillRect(0, 0, state.width, state.height)

    for (let i = 0; i < features.length; i++) {
      const coords = features[i].geometry.coordinates[0];

      this.context.fillStyle = state.landColor
      // this.context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16)

      for (let j = 0; j < coords.length; j++) {
        const point = this.cs.coordinateToPoint(coords[j][1], coords[j][0])

        if (j === 0) {
          this.context.beginPath()
          this.context.moveTo(point.x, point.y)
        } else {
          this.context.lineTo(point.x, point.y)
        }
      }
      this.context.fill()
    }

    this.canvas.draw()
  }
}
