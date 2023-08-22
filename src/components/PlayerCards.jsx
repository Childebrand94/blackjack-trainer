import { nanoid } from 'nanoid'

const PlayerCards = ({ cards, action }) => {
  const getImageStyle = (card, index) => {
    if (card.split) {
      return {
        bottom: card.double ? `${index * 40}px` : `${index * 0}px`,
        left: card.double ? `${index * 48}px` : `${index * 150}px`,
      }
    } else {
      return {
        bottom: card.double ? `${index * 40}px` : `${index * 20}px`,
        left: card.double ? `${index * 48}px` : `${index * 35}px`,
      }
    }
  }
  const split = (cards, action) => {
    if (action === 'split') {
      updatedCards = cards.map((card) => {
        ;[card]
      })
      return updatedCards
    }
  }

  return (
    <div className="col-start-2 row-start-2 relative">
      {cards.map((card, index) => (
        <img
          key={nanoid()}
          style={getImageStyle(card, index)}
          className={`absolute transform ${card.double === true ? 'rotate-90' : ''}`}
          src={`src/assets/Cards/card${card.suit}${card.name}.png`}
        />
      ))}
    </div>
  )
}

export default PlayerCards
