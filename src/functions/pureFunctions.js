// buildDecks:: Number -> Card[]
export const buildDecks = (amount) => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
  const royalCards = ['J', 'Q', 'K', 'A']

  const createSuitedCards = (suit) => {
    return Array.from({ length: amount * 13 }, (_, index) => {
      const valueIndex = index % 13
      return {
        // potentially remove value key and calculate on the fly
        value: valueIndex <= 8 ? 2 + valueIndex : royalCards[valueIndex - 9] === 'A' ? 11 : 10,
        name: valueIndex <= 8 ? (2 + valueIndex).toString() : royalCards[valueIndex - 9],
        suit: suit,
        // faceUp: true,
      }
    })
  }
  return suits.flatMap((suit) => createSuitedCards(suit))
}
const testDeck = Array.from({ length: 50 }, (_) => {
  return {
    value: 11,
    name: 'A',
    suit: 'Hearts',
  }
})

export const buildStackedDeck1 = (amount) => {
  const suits = ['Spades']

  const createSuitedCards = (suit) => {
    return Array.from({ length: amount / 2 }, (_, index) => {
      if (index % 2 === 0) {
        // dealers hand
        return [
          { name: 'A', value: 11, suit: 'Spades' },
          { name: 10, value: 10, suit: 'Spades' },
        ]
      } else {
        // players hand
        return [
          { name: 5, value: 5, suit: 'Spades' },
          { name: 'A', value: 11, suit: 'Spades' },
        ]
      }
    }).flat()
  }
  return suits.flatMap((suit) => createSuitedCards(suit))
}

// drawCard:: -> Card[] -> [Card, Card[]]
export const drawCard = (deckCards, stackedDeck = false) => {
  if (!stackedDeck) {
    const randomIndex = Math.floor(Math.random() * deckCards.length)
    const newDeck = [...deckCards.filter((_, index) => index !== randomIndex)]
    return [deckCards[randomIndex], newDeck]
  } else {
    const newDeck = [...deckCards.filter((_, index) => index !== 0)]
    return [deckCards[0], newDeck]
  }
}

// dealOrder :: array -> array -> Card -> [[],[]]
export const dealOrder = (playerHand, dealerHand, card) => {
  if (playerHand.length <= dealerHand.length) {
    return [[...playerHand, card], [...dealerHand]]
  } else {
    return [[...playerHand], [...dealerHand, card]]
  }
}

// handTotal:: -> Card[] -> Number
export const handTotal = (hand) => {
  if (!hand) {
    return 0
  }
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

// getHandType:: Card[] -> String
export const getHandType = (hand) => {
  if (hand.length === 0) return
  if (hand.some((card) => card.value === 11)) {
    return 'soft'
  } else if (hand[0].value === hand[1].value) {
    return 'pairs'
  }
  return 'hard'
}

// checkBust:: Card[] -> Boolean
export const checkBust = (hand) => {
  return handTotal(hand) > 21
}
