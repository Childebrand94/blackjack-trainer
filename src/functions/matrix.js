// Aces will be represented as 11 in the matrix to keep argument types for check strategy
// consistent

export const decisionMatrix = {
  // hand type
  hard: {
    // dear up card
    2: {
      // player range and choice
      '5-9': 'H',
      '10-11': 'D',
      12: 'H',
      '13-20': 'S',
    },
    3: {
      '5-8': 'H',
      '9-11': 'D',
      12: 'H',
      '13 -20': 'S',
    },
    4: {
      '5-8': 'H',
      '9-11': 'D',
      '12-20': 'S',
    },
    5: {
      '5-8': 'H',
      '9-11': 'D',
      '12-20': 'S',
    },
    6: {
      '5-8': 'H',
      '9-11': 'D',
      '12-20': 'S',
    },
    7: {
      '5-9': 'H',
      '10-11': 'D',
      '12-16': 'H',
      '17-20': 'S',
    },
    8: {
      '5-9': 'H',
      '10-11': 'D',
      '12-16': 'H',
      '17-20': 'S',
    },
    9: {
      '5-9': 'H',
      '10-11': 'D',
      '12-16': 'H',
      '17-20': 'S',
    },
    10: {
      '5-10': 'H',
      11: 'D',
      '12-16': 'H',
      '17-20': 'S',
    },
    11: {
      '5-16': 'H',
      '17-20': 'S',
    },
  },
  soft: {
    2: {
      '13-17': 'H',
      '18-20': 'S',
    },
    3: {
      '13-16': 'H',
      '17-18': 'D',
      '19-20': 'S',
    },
    4: {
      '13-14': 'H',
      '15-18': 'D',
      '19-20': 'S',
    },
    5: {
      '13-18': 'D',
      '19-20': 'S',
    },
    6: {
      '13-18': 'D',
      '19-20': 'S',
    },
    7: {
      '13-17': 'H',
      '18-20': 'S',
    },
    8: {
      '13-17': 'H',
      '18-20': 'S',
    },
    9: {
      '13-18': 'H',
      '19-20': 'S',
    },
    10: {
      '13-18': 'H',
      '19-20': 'S',
    },
    11: {
      '13-18': 'H',
      '19-20': 'S',
    },
  },
  pairs: {
    2: {
      '2-3': 'SP',
      4: 'H',
      5: 'D',
      '6-9': 'SP',
      10: 'S',
      11: 'SP',
    },
    3: {
      '2-3': 'SP',
      4: 'H',
      5: 'D',
      '6-9': 'SP',
      10: 'S',
      11: 'SP',
    },
    4: {
      '2-3': 'SP',
      4: 'H',
      5: 'D',
      '6-9': 'SP',
      10: 'S',
      11: 'SP',
    },
    5: {
      '2-5': 'SP',
      5: 'D',
      '6-9': 'SP',
      10: 'S',
      11: 'SP',
    },
    6: {
      '2-5': 'SP',
      5: 'D',
      '6-9': 'SP',
      10: 'S',
      11: 'SP',
    },
    7: {
      '2-3': 'SP',
      4: 'H',
      5: 'D',
      6: 'H',
      '7-8': 'SP',
      '9-10': 'S',
      11: 'SP',
    },
    8: {
      '2-4': 'H',
      5: 'D',
      '6-7': 'H',
      '8-9': 'SP',
      10: 'S',
      11: 'SP',
    },
    9: {
      '2-4': 'H',
      5: 'D',
      '6-7': 'H',
      '8-9': 'SP',
      10: 'S',
      11: 'SP',
    },
    10: {
      '2-7': 'H',
      8: 'SP',
      '9-10': 'S',
      11: 'SP',
    },
    11: {
      '2-7': 'H',
      8: 'SP',
      '9-10': 'S',
      11: 'SP',
    },
  },
}

// checkStrategy :: String -> Int -> Int -> String
export const strategyCheck = (handType, dealerCardTotal, playerCardTotal) => {
  // if playerCardTotal exceeds upper range, keep it at 20
  const playerCardTotalLimited = () => {
    if (handType === 'pairs') {
      return playerCardTotal / 2
    } else {
      return playerCardTotal > 20 ? 20 : playerCardTotal
    }
  }

  // get player options as list
  const playerCardRanges = Object.keys(decisionMatrix[handType][dealerCardTotal])

  // if player options are a single value return choice
  const rangeMatch = playerCardRanges.find((range) => {
    if (range === playerCardTotalLimited().toString()) {
      return true
    }

    // parse player card range into a integers represented by min and max
    const [min, max] = range.split('-').map(Number)
    return playerCardTotalLimited() >= min && playerCardTotalLimited() <= max
  })

  // if a match was found return choice
  if (rangeMatch) {
    return decisionMatrix[handType][dealerCardTotal][rangeMatch]
  }
  // if error
  return ''
}

// strategyCheck(handType, dealerCardTotal, playerCardTotal)
// console.log(strategyCheck('hard', 11, 9))
// console.log(strategyCheck('hard', 6, 9) === 'D')
// console.log(strategyCheck('hard', 9, 13) === 'H')
// console.log(strategyCheck('hard', 10, 17) === 'S')
// console.log(strategyCheck('hard', 2, 12) === 'H')

// console.log(strategyCheck('soft', 2, 13) === 'H')
// console.log(strategyCheck('soft', 7, 16) === 'H')
// console.log(strategyCheck('soft', 6, 18) === 'D')
// console.log(strategyCheck('soft', 11, 19) === 'S')
// console.log(strategyCheck('soft', 6, 18) === 'D')

// When passing in the value for pairs, a function will omit one of the
// cards and only transmit the value of the single card, as long as the hand type
// is classified as a pair.
// console.log(strategyCheck('pairs', 2, 2) === 'SP')
// console.log(strategyCheck('pairs', 7, 5) === 'D')
// console.log(strategyCheck('pairs', 4, 4) === 'H')
// console.log(strategyCheck('pairs', 11, 8) === 'SP')
// console.log(strategyCheck('pairs', 6, 10) === 'S')
