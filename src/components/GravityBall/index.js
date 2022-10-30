
import React from 'react'
import useCanvas from '../../hooks/useCanvas'

const GravityBall = ({ height, width, color, friction, gravity = 1 }) => {
  function Ball (x, y, dy, radius, ctx, fillColor) {
    this.x = x
    this.y = y
    this.dy = dy
    this.radius = radius
    this.fillColor = fillColor

    this.draw = function () {
      ctx.beginPath()
      ctx.arc(x, y, radius, 2 * Math.PI, false)
      ctx.fillStyle = fillColor
      ctx.fill()
    }

    this.update = function () {
      if (y + radius + dy > height) {
        dy = -dy * friction
      } else {
        dy += gravity
      }
      y += dy
      this.draw()
    }
  }

  const createEntitie = (context, entitie) => {
    const ball = new Ball(300, 300, 2, 30, context, color)
    entitie.push(ball)
  }

  const animation = (entitie) => {
    entitie[0].update()
  }
  const canvasRef = useCanvas(createEntitie, animation, width, height)

  return (
    <canvas
    style={{ background: '#16213E' }}
    ref={canvasRef}
    ></canvas>
  )
}

export default GravityBall
