import styled, { keyframes, css } from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import tinyColor from 'tinycolor2'

const movementSmall = keyframes`
  0% {
    left: -60%;
  }
  30%, 100% {
    left: 140%;
  }
`
const movementBig = keyframes`
  0% {
    left: -45%;
  }
  30%, 100% {
    left: 155%;
  }
`

const Wrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition-timing-function: linear;
  --animationDuration: ${({ currentAmount }) =>
    isNaN(currentAmount) ? `5s` : `1s`};
  /* Minimal theme */
  .odometer.odometer-auto-theme,
  .odometer.odometer-theme-minimal {
    font-weight: 700;
    font-family: 'AvertaCy', Helvetica Neue, Helvetica, Arial, sans-serif;
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    *zoom: 1;
    *display: inline;
    position: relative;
  }
  .odometer.odometer-auto-theme .odometer-digit,
  .odometer.odometer-theme-minimal .odometer-digit {
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    *zoom: 1;
    *display: inline;
    position: relative;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-digit-spacer,
  .odometer.odometer-theme-minimal .odometer-digit .odometer-digit-spacer {
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    *zoom: 1;
    *display: inline;
    visibility: hidden;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-digit-inner,
  .odometer.odometer-theme-minimal .odometer-digit .odometer-digit-inner {
    text-align: left;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-ribbon,
  .odometer.odometer-theme-minimal .odometer-digit .odometer-ribbon {
    display: block;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-ribbon-inner,
  .odometer.odometer-theme-minimal .odometer-digit .odometer-ribbon-inner {
    display: block;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-value,
  .odometer.odometer-theme-minimal .odometer-digit .odometer-value {
    display: block;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
  .odometer.odometer-auto-theme
    .odometer-digit
    .odometer-value.odometer-last-value,
  .odometer.odometer-theme-minimal
    .odometer-digit
    .odometer-value.odometer-last-value {
    position: absolute;
  }
  .odometer.odometer-auto-theme.odometer-animating-up .odometer-ribbon-inner,
  .odometer.odometer-theme-minimal.odometer-animating-up
    .odometer-ribbon-inner {
    transition: transform var(--animationDuration);
  }
  .odometer.odometer-auto-theme.odometer-animating-up.odometer-animating
    .odometer-ribbon-inner,
  .odometer.odometer-theme-minimal.odometer-animating-up.odometer-animating
    .odometer-ribbon-inner {
    transform: translateY(-100%);
  }
  .odometer.odometer-auto-theme.odometer-animating-down .odometer-ribbon-inner,
  .odometer.odometer-theme-minimal.odometer-animating-down
    .odometer-ribbon-inner {
    transform: translateY(-100%);
  }
  .odometer.odometer-auto-theme.odometer-animating-down.odometer-animating
    .odometer-ribbon-inner,
  .odometer.odometer-theme-minimal.odometer-animating-down.odometer-animating
    .odometer-ribbon-inner {
    transition: transform var(--animationDuration);
  }
  /* Spendless theme */
  .odometer.odometer-auto-theme,
  .odometer.odometer-theme-spendless {
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    *zoom: 1;
    *display: inline;
    position: relative;
  }
  .odometer.odometer-auto-theme .odometer-digit,
  .odometer.odometer-theme-spendless .odometer-digit {
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    *zoom: 1;
    *display: inline;
    position: relative;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-digit-spacer,
  .odometer.odometer-theme-spendless .odometer-digit .odometer-digit-spacer {
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    *zoom: 1;
    *display: inline;
    visibility: hidden;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-digit-inner,
  .odometer.odometer-theme-spendless .odometer-digit .odometer-digit-inner {
    text-align: left;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    text-align: center;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-ribbon,
  .odometer.odometer-theme-spendless .odometer-digit .odometer-ribbon {
    display: block;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-ribbon-inner,
  .odometer.odometer-theme-spendless .odometer-digit .odometer-ribbon-inner {
    display: block;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    background-color: transparent;
    position: relative;
  }
  .odometer.odometer-auto-theme .odometer-digit .odometer-value,
  .odometer.odometer-theme-spendless .odometer-digit .odometer-value {
    display: block;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 12px 0px 8px 0px;
    position: relative;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
  }
  .odometer.odometer-auto-theme
    .odometer-digit
    .odometer-value.odometer-last-value,
  .odometer.odometer-theme-spendless
    .odometer-digit
    .odometer-value.odometer-last-value {
    position: absolute;
  }
  .odometer.odometer-auto-theme.odometer-animating-up .odometer-ribbon-inner,
  .odometer.odometer-theme-spendless.odometer-animating-up
    .odometer-ribbon-inner {
    transition: transform var(--animationDuration);
  }
  .odometer.odometer-auto-theme.odometer-animating-up.odometer-animating
    .odometer-ribbon-inner,
  .odometer.odometer-theme-spendless.odometer-animating-up.odometer-animating
    .odometer-ribbon-inner {
    transform: translateY(-100%);
  }
  .odometer.odometer-auto-theme.odometer-animating-down .odometer-ribbon-inner,
  .odometer.odometer-theme-spendless.odometer-animating-down
    .odometer-ribbon-inner {
    transform: translateY(-100%);
  }
  .odometer.odometer-auto-theme.odometer-animating-down.odometer-animating
    .odometer-ribbon-inner,
  .odometer.odometer-theme-spendless.odometer-animating-down.odometer-animating
    .odometer-ribbon-inner {
    transition: transform var(--animationDuration);
    transform: translateY(0);
  }

  .odometer.odometer-auto-theme,
  .odometer.odometer-theme-spendless {
    font-family: 'AvertaCy', Helvetica Neue, Helvetica, Arial, sans-serif;
    margin: 0 auto;
    color: #000000;
  }
  .odometer.odometer-auto-theme .odometer-digit,
  .odometer.odometer-theme-spendless .odometer-digit {
    position: relative;
    color: #000000;
    padding: 8px 4px;
    border-radius: 8px;
    text-align: center;
    margin: ${({ isBig }) => (isBig ? '4px' : '2px')};
    box-shadow: 0px 15px 45px rgba(31, 33, 79, 0.1),
      inset 0px 2px 2px rgba(255, 255, 255, 0.5);
  }
  .odometer .odometer-inside {
    overflow: hidden;
    border-radius: 12px;
    padding: ${({ isBig }) => (isBig ? '4px' : '2px')};
  }
  .odometer .odometer-inside .odometer-formatting-mark {
    background-color: transparent !important;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      .odometer-inside {
        ::before {
          transform: rotate(18deg);
          display: block;
          position: absolute;
          content: '';
          background: ${themeGet('colors.bg')};
          min-width: 7%;
          opacity: 0.2;
          height: 130%;
          top: -15%;
          animation: ${movementSmall} 4.5s linear infinite;
          z-index: 0;
        }
        ::after {
          transform: rotate(18deg);
          display: block;
          opacity: 0.2;
          position: absolute;
          content: '';
          filter: blur(1.5px);
          background: ${themeGet('colors.bg')};
          min-width: 15%;
          height: 130%;
          top: -15%;
          animation: ${movementBig} 4.5s linear infinite;
          z-index: 0;
        }
      }
      .odometer-digit {
        opacity: 0;
      }
      .odometer-formatting-mark {
        opacity: 0;
      }
    `}
  .odometer-formatting-mark {
    backface-visibility: hidden;
    color: ${({ textColor }) =>
      textColor || themeGet('colors.black')} !important;
  }
  .odometer-inside {
    background: ${({ backgroundColor, theme }) =>
      tinyColor(backgroundColor || '#fff')
        .darken(4)
        .toString()};
  }
  .odometer-digit {
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ textColor }) => textColor || '#000'} !important;
  }
  .odometer
    .odometer-inside
    .odometer-radix-mark
    ~ .odometer-digit
    .odometer-value {
    opacity: 0.7;
  }
  * {
    font-family: Averta, Helvetica Neue, Helvetica, Arial, sans-serif;
  }
  ${({ firstDigitHidden }) =>
    firstDigitHidden &&
    css`
      .odometer .odometer-inside .odometer-digit:first-child,
      .odometer .odometer-inside .odometer-formatting-mark:nth-child(2) {
        display: none;
      }
    `}
  ${({ lastDigitHidden }) =>
    lastDigitHidden &&
    css`
      .odometer .odometer-inside .odometer-digit:last-child {
        display: none;
      }
    `}
`

export default Wrapper
