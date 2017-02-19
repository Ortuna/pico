const RADIUS = 6378137
const MAX = 85.0511287798
const RADIANS = Math.PI / 180

const mercator = (latitude, longitude) => {
  let point = {}

  point.x = RADIUS * longitude * RADIANS
  point.y = Math.max(Math.min(MAX, latitude), -MAX) * RADIANS
  point.y = RADIUS * Math.log(Math.tan((Math.PI / 4) + (point.y / 2)))

  return point;
}

export default mercator
