import Particles from '../components/Particles'
import useWindowDimensions from '../hooks/useWindowDimensions'

const Home = (props) => {
  const colors = ['#0F3460', '#BFBFBF', '#E94560', '#533483']
  const { height, width } = useWindowDimensions()

  return <Particles width={width} height={height} densityPercentage={20} colors={colors}/>
}

export default Home
