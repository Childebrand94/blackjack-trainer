// Aces will be represented as 11 in the matrix to keep argument types for check strategy

import { playerChoices } from './types'

// consistent
export const decisionMatrix = {
  // hand type
  hard: {
    // dear up card
    2: {
      // player range and choice
      '5-9': playerChoices.hit,
      '10-11': playerChoices.double,
      12: playerChoices.hit,
      '13-20': playerChoices.stand,
    },
    3: {
      '5-8': playerChoices.hit,
      '9-11': playerChoices.double,
      12: playerChoices.hit,
      '13 -20': playerChoices.stand,
    },
    4: {
      '5-8': playerChoices.hit,
      '9-11': playerChoices.double,
      '12-20': playerChoices.stand,
    },
    5: {
      '5-8': playerChoices.hit,
      '9-11': playerChoices.double,
      '12-20': playerChoices.stand,
    },
    6: {
      '5-8': playerChoices.hit,
      '9-11': playerChoices.double,
      '12-20': playerChoices.stand,
    },
    7: {
      '5-9': playerChoices.hit,
      '10-11': playerChoices.double,
      '12-16': playerChoices.hit,
      '17-20': playerChoices.stand,
    },
    8: {
      '5-9': playerChoices.hit,
      '10-11': playerChoices.double,
      '12-16': playerChoices.hit,
      '17-20': playerChoices.stand,
    },
    9: {
      '5-9': playerChoices.hit,
      '10-11': playerChoices.double,
      '12-16': playerChoices.hit,
      '17-20': playerChoices.stand,
    },
    10: {
      '5-10': playerChoices.hit,
      11: playerChoices.double,
      '12-16': playerChoices.hit,
      '17-20': playerChoices.stand,
    },
    11: {
      '5-16': playerChoices.hit,
      '17-20': playerChoices.stand,
    },
  },
  soft: {
    2: {
      '13-17': playerChoices.hit,
      '18-20': playerChoices.stand,
    },
    3: {
      '13-16': playerChoices.hit,
      '17-18': playerChoices.double,
      '19-20': playerChoices.stand,
    },
    4: {
      '13-14': playerChoices.hit,
      '15-18': playerChoices.double,
      '19-20': playerChoices.stand,
    },
    5: {
      '13-18': playerChoices.double,
      '19-20': playerChoices.stand,
    },
    6: {
      '13-18': playerChoices.double,
      '19-20': playerChoices.stand,
    },
    7: {
      '13-17': playerChoices.hit,
      '18-20': playerChoices.stand,
    },
    8: {
      '13-17': playerChoices.hit,
      '18-20': playerChoices.stand,
    },
    9: {
      '13-18': playerChoices.hit,
      '19-20': playerChoices.stand,
    },
    10: {
      '13-18': playerChoices.hit,
      '19-20': playerChoices.stand,
    },
    11: {
      '13-18': playerChoices.hit,
      '19-20': playerChoices.stand,
    },
  },
  pairs: {
    2: {
      '2-3': playerChoices.split,
      4: playerChoices.hit,
      5: playerChoices.double,
      '6-9': playerChoices.split,
      10: playerChoices.stand,
      11: playerChoices.split,
    },
    3: {
      '2-3': playerChoices.split,
      4: playerChoices.hit,
      5: playerChoices.double,
      '6-9': playerChoices.split,
      10: playerChoices.stand,
      11: playerChoices.split,
    },
    4: {
      '2-3': playerChoices.split,
      4: playerChoices.hit,
      5: playerChoices.double,
      '6-9': playerChoices.split,
      10: playerChoices.stand,
      11: playerChoices.split,
    },
    5: {
      '2-5': playerChoices.split,
      5: playerChoices.double,
      '6-9': playerChoices.split,
      10: playerChoices.stand,
      11: playerChoices.split,
    },
    6: {
      '2-5': playerChoices.split,
      5: playerChoices.double,
      '6-9': playerChoices.split,
      10: playerChoices.stand,
      11: playerChoices.split,
    },
    7: {
      '2-3': playerChoices.split,
      4: playerChoices.hit,
      5: playerChoices.double,
      6: playerChoices.hit,
      '7-8': playerChoices.split,
      '9-10': playerChoices.stand,
      11: playerChoices.split,
    },
    8: {
      '2-4': playerChoices.hit,
      5: playerChoices.double,
      '6-7': playerChoices.hit,
      '8-9': playerChoices.split,
      10: playerChoices.stand,
      11: playerChoices.split,
    },
    9: {
      '2-4': playerChoices.hit,
      5: playerChoices.double,
      '6-7': playerChoices.hit,
      '8-9': playerChoices.split,
      10: playerChoices.stand,
      11: playerChoices.split,
    },
    10: {
      '2-7': playerChoices.hit,
      8: playerChoices.split,
      '9-10': playerChoices.stand,
      11: playerChoices.split,
    },
    11: {
      '2-7': playerChoices.hit,
      8: playerChoices.split,
      '9-10': playerChoices.stand,
      11: playerChoices.split,
    },
  },
}
