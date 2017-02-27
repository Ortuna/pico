import Immutable from 'immutable'

import System from './Utils/System'
import Coordinate from './Systems/Coordinate'
import Canvas from './Systems/Canvas'
import Map from './Systems/Map'
import Player from './Systems/Player'

import WorldMap from '../../maps/world.json'
import Buildings from '../../maps/buildings.json'

const defaultState = Immutable.fromJS({
  features: Buildings.features,
  systems: [Coordinate, Map, Canvas, Player],
  center: [0, 0],
  waterColor: '#b3d1ff',
  landColor: '#fff',
  width: 475,
  height: 500,
  scale: 2.5
})

export default class {
  systems(state) { return System.getSystem(state) }

  constructor(element) {
    this.state = this.init(defaultState.set('element', element))
  }

  init(initState) {
    return this.systems(initState).reduce((state, system) => {
      return system.init(state)
    }, initState)
  }

  draw() {
    this.state = this.systems(this.state).reduce((state, system) => {
      return system.tick(state)
    }, this.state)
  }
}
