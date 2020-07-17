import Konva from 'konva'

export const Arr = (stage, layer) => {
  let isPaint = false
  let arrow

  stage.on('contentMousedown', function() {
    isPaint = true
    var pos = stage.getPointerPosition()
    arrow = new Konva.Arrow({
      points: [pos.x, pos.y, pos.x, pos.y],
      pointerLength: 20,
      pointerWidth: 20,
      fill: 'black',
      stroke: 'black',
      strokeWidth: 4
    })
    layer.add(arrow)
  })

  stage.on('contentMouseup', function() {
    isPaint = false
  })

  stage.on('contentMousemove', function() {
    if (!isPaint) {
      return
    }

    let pos = stage.getPointerPosition()
    let oldPoints = arrow.points()
    arrow.points([oldPoints[0], oldPoints[1], pos.x, pos.y])
    layer.draw()
  })
}
