import React, { useEffect, useRef, useState } from 'react'
import NumberBig from './NumberBig'
import PropTypes from 'prop-types'
import useOdometer from 'use-odometer'
import Wrapper from './Wrapper'

const fromExponential = (x) => {
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split(`e-`)[1])
    if (e) {
      x *= Math.pow(10, e - 1)
      x = '0.' + new Array(e).join('0') + x.toString().substring(2)
    }
  } else {
    let e = parseInt(x.toString().split('+')[1])
    if (e > 20) {
      e -= 20
      x /= Math.pow(10, e)
      x += new Array(e + 1).join('0')
    }
  }
  return x
}

const isTooSmall = (num) => num.toString().includes('e')

const getFormats = (decimals) => {
  let formats = {
    0: `(,ddd)`,
  }
  for (let i = 1; i <= decimals + 1; i++) {
    formats = { ...formats, [i]: `(,ddd).${`d`.repeat(i + 1)}` }
  }
  return formats
}
const calculateVelocity = (amount) => {
  let decimals = 0
  let floatPart
  const intPart = Math.trunc(amount)

  if (isTooSmall(amount)) {
    floatPart = fromExponential(amount).substring(2).split('')
  } else {
    floatPart = (amount - intPart).toString().substring(2).split('')
  }

  for (let i = 0; i <= floatPart.length; i++) {
    if (floatPart[i] != 0 && floatPart[i] < 4) {
      decimals++
      break
    }
    if (floatPart[i] != 0) break
    if (floatPart[i] == 0) decimals++
  }
  if (decimals > 6) decimals = 6
  return decimals
}

const toFixedNoRounding = (num, decimals) => {
  // eslint-disable-next-line i18next/no-literal-string
  const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + decimals + '})?', 'g')
  const a = num.toString().match(reg)[0]
  const dot = a.indexOf('.')
  if (dot === -1) {
    return a + '.' + '0'.repeat(decimals)
  }
  const b = decimals - (a.length - dot) + 1
  return b > 0 ? a + '0'.repeat(b) : a
}

const addGhostNumbers = (num, decimals, isLoading) => {
  if (isTooSmall(num) || num === 0) return 10
  let digitsAmount = parseInt(num).toString().split('').length

  if (isLoading) return 100
  if (decimals === 0) {
    if (isNaN(num)) num = 0
    if (digitsAmount < 1) {
      return parseFloat(`1${num}`)
    }
  }
  if (isNaN(num)) num = parseFloat(`0.${'0'.repeat(decimals + 1)}6`)
  if (num < 1) num = parseFloat(`1${num}`)
  return num
}

const decimalsAdjust = (num) => {
  let splitted = num.split('')
  if (splitted[splitted.length - 1] == 0) {
    splitted[splitted.length - 1] = 1
  }
  return parseFloat(splitted.join(''))
}

const Odometer = ({
  textColor,
  backgroundColor,
  rate: interestRate,
  currentAmount,
  totalAmount,
  textComponent,
  isLoading: _isLoading,
  decimals: _decimals,
  isMinimal,
}) => {
  const [rate, setRate] = useState(interestRate)
  // Interest earned per 2 seconds
  const earnedInterestIn2Seconds =
    (totalAmount * (rate / 100)) / 12 / 30 / 24 / 60 / 30
  const decimals =
    typeof _decimals === 'undefined'
      ? calculateVelocity(earnedInterestIn2Seconds)
      : _decimals

  const isLoading = _isLoading || isNaN(currentAmount)

  const [count, setCount] = useState(addGhostNumbers(currentAmount, decimals))
  const [counterValue, setCounterValue] = useState(
    parseFloat(count.toFixed(decimals + 1))
  )

  const targetRef = useRef(null)
  const impactRef = useRef(count)
  impactRef.current = count
  const counterRef = useRef(counterValue)
  counterRef.current = counterValue

  const TextComponent = textComponent
  const formats = getFormats(decimals)

  const firstDigitHidden = (currentAmount < 1 && decimals > 0) || rate === 0
  const lastDigitHidden = decimals > 0 || (isNaN(currentAmount) && decimals > 0)

  useOdometer(targetRef, counterRef.current, {
    theme: isMinimal ? `minimal` : `spendless`,
    format: formats[decimals],
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(parseFloat(impactRef.current) + earnedInterestIn2Seconds)
    }, 2000)
    return () => clearTimeout(timer)
  })

  useEffect(() => {
    if (isNaN(count)) return
    setCounterValue(
      decimalsAdjust(toFixedNoRounding(impactRef.current, decimals + 1))
    )
  }, [count])

  useEffect(() => {
    totalAmount ? setRate(interestRate) : setRate(0)
  }, [totalAmount])

  useEffect(() => {
    currentAmount && setCount(addGhostNumbers(currentAmount, decimals))
  }, [currentAmount])

  // When NumberBig text component is used
  const isBig = textComponent.target === `span`

  return (
    <Wrapper
      textColor={textColor}
      backgroundColor={isMinimal ? `transparent` : backgroundColor}
      isLoading={isLoading}
      currentAmount={currentAmount}
      firstDigitHidden={firstDigitHidden}
      lastDigitHidden={lastDigitHidden}
      isBig={isBig}
    >
      <TextComponent
        style={{ overflow: `hidden` }}
        ref={targetRef}
      ></TextComponent>
    </Wrapper>
  )
}

Odometer.defaultProps = {
  textColor: '',
  backgroundColor: '',
  textComponent: NumberBig,
  isLoading: false,
  decimals: undefined,
  isMinimal: false,
  rate: 0,
}
Odometer.propTypes = {
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  backgroundColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rate: PropTypes.number,
  currentAmount: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  textComponent: PropTypes.object,
  isLoading: PropTypes.bool,
  isMinimal: PropTypes.bool,
  decimals: PropTypes.number,
}

export default Odometer
