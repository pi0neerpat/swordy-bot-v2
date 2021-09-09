import { useSpring, animated } from 'react-spring'

const Loader = () => {
  const [flip, set] = React.useState(false)
  const props = useSpring({
    to: { height: '10rem' },
    from: { height: '12rem' },
    reset: true,
    reverse: flip,
    onRest: () => set(!flip),
  })
  return <animated.img style={props} src="/logo.png" />
}

export default Loader
