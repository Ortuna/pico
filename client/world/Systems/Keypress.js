import System from '../Utils/System'
import keyboardJS from 'keyboardjs'

let localState = []

class Keypress extends System {
  static get namespace() { return 'keyboard' }

  static addListeners(state) {
    keyboardJS.bind('', function(e) {
      localState.push(e)
    })
  }

  static init(state) {
    this.addListeners()

    localState = []
    return state.set('keys', [])
  }

  static tick(state) {
    localState = []
    return state.set('keys', localState)
  }
}

export default Keypress
