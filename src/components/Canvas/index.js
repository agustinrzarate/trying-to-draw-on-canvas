import useCanvas from '../../hooks/useCanvas'

const Canvas = ({ draw, options, ...rest }) => {
  const { context } = options
  const canvasRef = useCanvas(draw, { context })

  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas
