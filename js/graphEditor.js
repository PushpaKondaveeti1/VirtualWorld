class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas
    this.graph = graph
    this.ctx = this.canvas.getContext('2d')
    this.#addEventListeners()
    this.selected = null
    this.hovered = null
    this.drag = null
  }
  #addEventListeners() {
    this.canvas.addEventListener('mousedown', (evt) => {
      if (evt.button == 2) {
        //right click
        console.log(evt.button)
        if (this.hovered) {
          this.#removePoint(this.hovered)
        } else {
          this.selected = null
        }
      }
      if (evt.button == 0) {
        // left click
        console.log(evt.button)
        const mousePoint = new Point(evt.offsetX, evt.offsetY)
        if (this.hovered) {
          this.#selectPoint(this.hovered)
          this.dragging = true
          return
        }
        this.graph.addPoint(mousePoint)
        this.#selectPoint(mousePoint)
        this.selected = mousePoint
      }
    })

    this.canvas.addEventListener('contextmenu', (evt) => {
      evt.preventDefault()
    })
    this.canvas.addEventListener('mouseup', () => {
      this.dragging = false
    })

    this.canvas.addEventListener('mousemove', (evt) => {
      const mousePoint = new Point(evt.offsetX, evt.offsetY)
      this.hovered = getNearestPoint(mousePoint, this.graph.points, 10)
      if (this.dragging) {
        this.selected.x = mousePoint.x
        this.selected.y = mousePoint.y
      }
    })
  }
  #selectPoint(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point))
    }
    this.selected = point
  }
  #removePoint(point) {
    this.graph.removePoint(point)
    this.hovered = null
    if (this.selected == point) {
      this.selected = null
    }
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.hovered) {
      this.hovered.draw(this.ctx, { outline: false, fill: true })
    }
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true })
    }
  }
}
