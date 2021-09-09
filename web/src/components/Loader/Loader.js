import { useSpring, animated, config } from 'react-spring'

const Loader = () => {
  const [flip, set] = React.useState(false)
  const props = useSpring({
    to: { height: '10rem' },
    from: { height: '12rem' },
    reset: true,
    // config: config.molasses,
    reverse: flip,
    onRest: () => set(!flip),
  })
  return <animated.img style={props} src="/logo.png" />

  return (
    <Spring
      from={{
        // Start invisible and offscreen
        opacity: 0,
        marginTop: -1000,
      }}
      to={{
        // End fully visible and in the middle of the screen
        opacity: 1,
        marginTop: 0,
      }}
      reset={true}
      duration={3000}
    >
      {(props) => (
        // The actual box that slides down
        <div style={props}></div>
      )}
    </Spring>
  )
}

export default Loader
