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
  const sortedHand = [...hand].sort((a, b) => a.value - b.value)

  return sortedHand.reduce((acc, card) => {
    if (card.name !== 'A') {
      return card.value + acc
    } else if (acc + card.value > 21) {
      return acc + 1
    } else {
      return acc + card.value
    }
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
console.log(
  handTotal([
    { value: 11, suit: 'hearts', name: 'A' },
    { value: 10, suit: 'diamonds', name: 'Jack' },
    { value: 5, suit: 'diamonds', name: '5' },
    { value: 10, suit: 'diamonds', name: '10' },
    { value: 11, suit: 'diamonds', name: 'A' },
  ]) === 27
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
    return Array.from({ length: amount * 13 }, (_, index) => {
      const valueIndex = index % 13
      return {
        id: nanoid(),
        value: valueIndex <= 8 ? 2 + valueIndex : royalCards[valueIndex - 9] === 'A' ? 11 : 10,
        name: valueIndex <= 8 ? (2 + valueIndex).toString() : royalCards[valueIndex - 9],
        suit: suit,
      }
    })
  }
  return suits.flatMap((suit) => createSuitedCards(suit))
}

console.log(buildDecks(2))
