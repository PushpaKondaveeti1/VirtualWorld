function getNearestPoint(mouseLoc, points, threshold = MAX_SAFE_INTEGER) {
  let minDistance = Number.MAX_SAFE_INTEGER
  let nearest = null
  for (const point of points) {
    const dist = distance(mouseLoc, point)
    if (dist < minDistance && dist < threshold) {
      minDistance = dist
      nearest = point
    }
  }
  return nearest
}
function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}