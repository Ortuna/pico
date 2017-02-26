import expect from 'expect.js'
import Immutable from 'immutable'
import System from 'world/Utils/System'

class MockSystem extends System {
  static get namespace() { return 'mock_system' }
}

class AnotherMockSystem extends System {
  static get namespace() { return 'another_mock_system' }
}

class BrokenSystem extends System {
  /* no namespace */
}

const mockState = Immutable.fromJS({
  systems: [MockSystem, AnotherMockSystem]
})

describe('System', () => {
  describe('.getSystem', () => {
    it('returns null when cant find a system', () => {
      const system = System.getSystem(mockState, 'unk')
      expect(system).to.equal(null)
    })

    it('gets the right system', () => {
      const system = System.getSystem(mockState, 'mock_system')
      expect(system).to.equal(MockSystem)
    })

    it('gets all the systems when empty name', () => {
      const systems = System.getSystem(mockState)
      expect(systems.count()).to.equal(2)
    })
  })
})
