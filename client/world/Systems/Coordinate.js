import System from '../Utils/System'
import Coordinate from '../Utils/Coordinate'

class CoordinateSystem extends System {
  static get namespace() { return 'cordinate' }

  static init(state) {
    return state.set('bounds', Coordinate.getBounds(state))
  }

  static tick(state) {
    return state
    // return state.set('bounds', Coordinate.getBounds(state))
  }
}

export default CoordinateSystem
