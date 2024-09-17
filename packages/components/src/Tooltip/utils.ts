type Point = { x: number; y: number }

export const getCorners = (rect: DOMRect) => {
  return [
    { x: rect.left, y: rect.top },
    { x: rect.right, y: rect.top },
    { x: rect.right, y: rect.bottom },
    { x: rect.left, y: rect.bottom },
  ] as Point[]
}

export const crossProduct = (p1: Point, p2: Point, p3: Point) => {
  return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)
}

// Convex Hull using Gift Wrapping (Jarvis March)
export const convexHull = (points: Point[]) => {
  const n = points.length
  if (n < 3) return points // Convex hull not possible with less than 3 points

  let hull = []
  let leftMost = 0

  // Find the leftmost point
  for (let i = 1; i < n; i++) {
    if (points[i].x < points[leftMost].x) {
      leftMost = i
    }
  }

  let p = leftMost
  do {
    hull.push(points[p])
    let next = (p + 1) % n

    for (let i = 0; i < n; i++) {
      if (crossProduct(points[p], points[next], points[i]) > 0) {
        next = i
      }
    }

    p = next
  } while (p !== leftMost)

  return hull
}

export const isPointInConvexPolygon = (point: Point, polygon: Point[]) => {
  let positive = 0,
    negative = 0
  const n = polygon.length

  for (let i = 0; i < n; i++) {
    let p1 = polygon[i]
    let p2 = polygon[(i + 1) % n]
    let cross = crossProduct(p1, p2, point)

    if (cross > 0) positive++
    if (cross < 0) negative++
    if (positive && negative) return false // Point is outside if signs are different
  }

  return true // Point is inside if all cross-products have the same sign
}
