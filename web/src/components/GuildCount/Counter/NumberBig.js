import styled from 'styled-components'
import { space, color, typography, compose } from 'styled-system'

const BLACK = 'black'

const BOLD = 'bold'
const NORMAL = 'normal'
const MEDIUM = 'medium'
const SEMI_BOLD = 'semiBold'

const NumberBig = styled(styled.span(compose(color, space, typography)))`
  font-style: normal;
  font-size: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (min-width: '1024px') {
    font-size: 80px;
  }
`

export default NumberBig
