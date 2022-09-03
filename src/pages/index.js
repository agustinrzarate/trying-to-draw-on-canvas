import { useEffect, useRef, useState } from 'react'

const Home = (props) => {
  const canvasRef = useRef(null)
  const maxRadius = 35

  function Circle (x, y, dx, dy, radius, ctx) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius

    this.draw = function () {
      ctx.beginPath()
      ctx.strokeStyle = '#7FB77E'
      ctx.arc(x, y, radius, 2 * Math.PI, false)
      ctx.strokeStyle = 'blue'
      ctx.stroke()
      ctx.fill()
    }

    this.update = function () {
      if (x + radius > innerWidth || x - 50 < 0) {
        dx = -dx
      }
      if (y + 50 > innerHeight || y - 50 < 0) {
        dy = -dy
      }

      x = x + dx
      y = y + dy

      this.draw()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const context = canvas.getContext('2d')
    let animationFrameId
    const array = []
    for (let cant = 0; cant < 600; cant++) {
      const radius = 3
      const x = Math.random() * (innerWidth - radius * 2) + radius
      const y = Math.random() * (innerHeight - radius * 2) + radius

      const dx = Math.random() - 0.5
      const dy = Math.random() - 0.5

      array.push(new Circle(x, y, dx, dy, radius, context))
    }

    const render = () => {
      context.clearRect(0, 0, innerWidth, innerHeight)
      animationFrameId = window.requestAnimationFrame(render)
      for (let i = 0; i < array.length; i++) {
        array[i].update()
      }
    }

    render(animationFrameId)

    return () => window.cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      {...props}

      style={{
        width: '100%',
        height: '100%'
      }}
    />
  )
}

export default Home
