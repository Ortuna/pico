import World from 'world'

window.onload = () => {
  const el = document.getElementById('root')
  const world = new World(el)

  const loop = () => {
    world.draw()
    // window.requestAnimationFrame(loop)
  }

  loop()
}
// console.log(world.features[0])
