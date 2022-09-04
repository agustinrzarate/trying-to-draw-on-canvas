
import useCanvas from '../../hooks/useCanvas'

const Particles = ({ height = 200, width = 200, densityPercentage = 0, colors }) => {
  const mousePosition = {
    x: undefined,
    y: undefined
  }
  const maxRadius = 35
  const numOfParticles = width * height * densityPercentage * 2.7 / 360000

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
      if (x + radius > width || x - radius < 0) {
        dx = -dx
      }
      if (y + radius > height || y - radius < 0) {
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

  const createEntities = (context, entities) => {
    for (let cant = 0; cant < numOfParticles; cant++) {
      const radius = Math.random() * 5
      const x = Math.random() * (width - radius * 2) + radius
      const y = Math.random() * (height - radius * 2) + radius
      const dx = Math.random() - 0.5
      const dy = Math.random() - 0.5
      const fillColor = colors[Math.floor(Math.random() * 4)]
      entities.push(new Circle(x, y, dx, dy, radius, context, fillColor))
    }
  }

  const animation = (entities) => {
    for (let i = 0; i < entities.length; i++) {
      entities[i].update()
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

  const canvasRef = useCanvas(createEntities, animation, width, height)

  return (
    <div>
      <canvas
        style={{ background: '#16213E' }}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
      />
    </div>
  )
}

export default Particles
