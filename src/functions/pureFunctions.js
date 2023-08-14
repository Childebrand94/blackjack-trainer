// hit:: -> Array -> Object
const hit = (deckCards) => {
  const randomIndex = Math.floor(Math.random() * deckCards.length)
  return deckCards[randomIndex]
}

console.log(hit(Array.from({ length: 100 }, (_, index) => ({ id: index + 1 }))))

// handTotal:: -> Array -> Number
const handTotal = (hand) => {
  return hand.reduce((acc, card) => {
    return card.value + acc
  }, 0)
}

console.log(
  handTotal([
    { value: 10, suit: 'hearts' },
    { value: 3, suit: 'diamonds' },
  ])
)
