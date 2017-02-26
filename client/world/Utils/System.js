import Immutable from 'immutable'

class System {
  static get namespace() { throw 'A System must implement the namespace getter' }
  static init() { throw 'A system must implement init'}
  static tick() { throw 'A system must implement tick'}

  static getSystem(state, name) {
    const systems = state.get('systems')

    if (!name) { return systems }

    return systems
      .find((system) => system.namespace == name) || null
  }
}

export default System
