import System from '../Utils/System'
import Coordinate from '../Utils/Coordinate'

class CoordinateSystem extends System {
  static get namespace() { return 'cordinate' }

  static init(state) {
    console.log(Coordinate.getBounds(state))
    return state.set('bounds', Coordinate.getBounds(state))
  }

  static tick(state) {
    return state
  }
}

export default CoordinateSystem
