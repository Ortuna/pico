const defaults = {
  zoom: 0,
  center: [0, 0],
  waterColor: '#b3d1ff',
  landColor: '#fff'
}

export default class {
  constructor(element, width, height) {
    this.width = width
    this.height = height
    this.map = this._createMap(width, height)
    this.context = this.map.getContext('2d')
    this.element = element

    this.element.appendChild(this.map)
  }

  _createMap(width, height) {
    let map = document.createElement('canvas')
    map.width = width
    map.height = height
    map.style.top = 0
    map.style.left = 0
    map.style.position = 'absolute'
    return map
  }

  draw() {
    this.context.fillStyle = defaults.waterColor
    this.context.fillRect(0, 0, this.width, this.height)
  }
}
