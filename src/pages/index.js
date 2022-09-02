import { useEffect, useRef } from 'react'

const Home = (props) => {
  const canvasRef = useRef(null)

  const draw = (ctx) => {
    //                Rectangle
    //           position     size
    //            x    y  width height
    ctx.fillStyle = '#533483'
    ctx.fillRect(100, 100, 100, 100)
    ctx.fillStyle = '#E94560'
    ctx.fillRect(400, 100, 100, 100)
    ctx.fillStyle = '#16213E'
    ctx.fillRect(300, 300, 100, 100)

    // Line
    ctx.beginPath()
    // starting line point
    ctx.moveTo(50, 300)
    // end point of the line
    ctx.strokeStyle = '#533483'
    ctx.lineTo(300, 100) //
    ctx.lineTo(300, 300) // these three points form a triangle
    ctx.lineTo(50, 300) //
    ctx.stroke()

    /* Arc / circle
    ctx.beginPath()
    ctx.arc(300, 300, 50, 2 * Math.PI, false)
    ctx.stroke()
    */

    // some circles
    for (let i = 0; i < 50; i++) {
      const positionX = Math.random() * innerWidth
      const positionY = Math.random() * innerHeight

      ctx.beginPath()
      ctx.strokeStyle = '#7FB77E'
      ctx.arc(positionX, positionY, Math.random() * 50, 2 * Math.PI, false)
      ctx.stroke()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const context = canvas.getContext('2d')

    // Our draw come here
    draw(context)
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      {...props}
      style={{
      }}
    />
  )
}

export default Home
