
export const actions = {
  standBy: 'standBy',
  dealPlayer: 'dealPlayer',
  dealDealer: 'dealDealer',
  hit: 'hit',
  split: 'split',
  stand: 'stand',
  double: 'double',
  checkInsurance: 'checkInsurance',
  checkStrategy: 'checkStrategy',
  dealSplitHand: 'dealSplitHand',
  surrender: 'surrender',
  checkBust: 'checkBust',
  checkDealerTurn: 'checkDealerTurn',
  checkBlackjack: 'checkBlackjack',
  dealerTurn: 'dealerTurn',
  dealerTotalCheck: 'dealerTotalCheck',
  insuranceAccepted: 'insuranceAccepted',
  insuranceDeclined: 'insuranceDeclined',
  startNextRound: 'startNextRound',
  callPlayerAction: 'callPlayerAction',
  getCount: 'getCount',
  reshuffle: 'reshuffle',
  test: 'test',
  animation: 'animation',
}

export const playerChoices = {
  stand: 'S',
  split: 'SP',
  hit: 'H',
  double: 'D',
}

export const handTypes = {
  pairs: 'pairs',
  soft: 'soft',
  hard: 'hard',
}

export const userFeedBackResponse = {
  correct: 'Correct',
  incorrect: 'Incorrect',
  tryAgain: 'Try agin',
  reshuffle: 'No More Cards Reshuffling Shoe',
  default: '',
}

export const gameModes = {
  speedCounting: 'speedCounting',
  countingStrategy: 'countingStrategy',
  strategy: 'strategy',
}
