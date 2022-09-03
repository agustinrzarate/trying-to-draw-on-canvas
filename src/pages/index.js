import { useEffect, useRef, useState } from 'react'

const Home = (props) => {
  const canvasRef = useRef(null)
  const mousePosition = {
    x: undefined,
    y: undefined
  }
  const colors = ['#127369', '#BFBFBF', '#8AA6A3', '#4C5958']
  const maxRadius = 35

  const [screen, setScreen] = useState(null)

  function Circle (x, y, dx, dy, radius, ctx, fillColor) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.fillColor = fillColor
    const originalRadius = this.radius
    this.draw = function () {
      ctx.beginPath()
      ctx.arc(x, y, radius, 2 * Math.PI, false)
      ctx.fillStyle = fillColor
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

      const distanceX = x - mousePosition.x
      const distanceY = y - mousePosition.y
      const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
      if (distance < 50 && radius < maxRadius) {
        radius = radius + 1
      } else if (distance > 50 && radius > originalRadius && radius > 2) {
        radius = radius - 1
      }
      if (!mousePosition.x && radius !== originalRadius && radius > 2) {
        radius = radius - 1
      }
      this.draw()
    }
  }

  const handleMouseMove = (event) => {
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
  }

  const handleMouseLeave = () => {
    mousePosition.x = undefined
    mousePosition.y = undefined
  }

  useEffect(() => {
    console.log('ref', canvasRef)
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const context = canvas.getContext('2d')
    let animationFrameId
    const array = []
    for (let cant = 0; cant < 600; cant++) {
      const radius = Math.random() * 5
      const x = Math.random() * (innerWidth - radius * 2) + radius
      const y = Math.random() * (innerHeight - radius * 2) + radius
      const dx = Math.random() - 0.5
      const dy = Math.random() - 0.5
      const fillColor = colors[Math.floor(Math.random() * 4)]
      array.push(new Circle(x, y, dx, dy, radius, context, fillColor))
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
    <div>
      <canvas
        style={{ background: '#10403B', overflow: 'hidden' }}
         onMouseLeave={handleMouseLeave}
         onMouseMove={handleMouseMove}
        ref={canvasRef}
        {...props}
      />
    </div>
  )
}

export default Home
