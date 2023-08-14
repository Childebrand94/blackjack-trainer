// hit:: -> Array -> [Object, Array]
const hit = (deckCards) => {
  const randomIndex = Math.floor(Math.random() * deckCards.length)
  const newDeck = [...deckCards.filter((_, index) => index !== randomIndex)]
  return [deckCards[randomIndex], newDeck]
}

console.log('hit')
console.log(hit(Array.from({ length: 100 }, (_, index) => ({ id: index + 1 }))))

// handTotal:: -> Array -> Number
const handTotal = (hand) => {
  return hand.reduce((acc, card) => {
    return card.value + acc
  }, 0)
}

console.log()
console.log('handTotal')
console.log(
  handTotal([
    { value: 10, suit: 'hearts' },
    { value: 3, suit: 'diamonds' },
  ]) === 13
)

// getHandType:: Array -> String
const getHandType = (hand) => {
  if (hand.some((card) => card.value === 'A')) {
    return 'soft'
  } else if (hand[0].value === hand[1].value) {
    return 'pairs'
  }
  return 'hard'
}

console.log()
console.log('getHandType')
console.log(getHandType([{ value: 10 }, { value: 'A' }]) === 'soft')
console.log(getHandType([{ value: 10 }, { value: 10 }]) === 'pairs')
console.log(getHandType([{ value: 10 }, { value: 5 }]) === 'hard')

// checkBust:: Array -> Boolean
const checkBust = (hand) => {
  return handTotal(hand) > 21
}
console.log()
console.log('checkBust')
console.log(checkBust([{ value: 10 }, { value: 10 }]) === false)
console.log(checkBust([{ value: 10 }, { value: 10 }, { value: 5 }]) === true)
