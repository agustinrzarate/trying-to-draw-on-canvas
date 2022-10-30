import { useRef, useEffect } from 'react'

const useCanvas = (createEntities, animation, width, height) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    let animationFrameId
    const entities = []
    createEntities(context, entities)

    const render = () => {
      animationFrameId = window.requestAnimationFrame(render)
      context.clearRect(0, 0, innerWidth, innerHeight)
      animation(entities)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [width, height])
  return canvasRef
}
export default useCanvas
