import { nanoid } from 'nanoid'

// hit:: -> Card[] -> [Card, Card[]]
const hit = (deckCards) => {
  const randomIndex = Math.floor(Math.random() * deckCards.length)
  const newDeck = [...deckCards.filter((_, index) => index !== randomIndex)]
  return [deckCards[randomIndex], newDeck]
}

console.log('hit')
console.log(hit(Array.from({ length: 100 }, (_, index) => ({ id: index + 1 }))))

// handTotal:: -> Card[] -> Number
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

// getHandType:: Card[] -> String
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

// checkBust:: Card[] -> Boolean
const checkBust = (hand) => {
  return handTotal(hand) > 21
}
console.log()
console.log('checkBust')
console.log(checkBust([{ value: 10 }, { value: 10 }]) === false)
console.log(checkBust([{ value: 10 }, { value: 10 }, { value: 5 }]) === true)

// buildDecks:: Number -> Card[]
const buildDecks = (amount) => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
  const royalCards = ['Jack', 'Queen', 'King', 'A']

  const createSuitedCards = (suit) => {
    return Array.from({ length: amount * 13 }, (_, index) => ({
      id: nanoid(),
      value: index <= 8 ? 2 + index : royalCards[index - 9] === 'A' ? 11 : 10,
      name: index <= 8 ? (2 + index).toString() : royalCards[index - 9],
      suit: suit,
    }))
  }
  return suits.flatMap((suit) => createSuitedCards(suit))
}

console.log(buildDecks(1))
