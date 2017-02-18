import World from 'world'
import WorldFeatures from '../maps/world.json'

const el = document.getElementById('root')
const world = new World(el, 800, 600)

world.draw()
// console.log(world.features[0])
