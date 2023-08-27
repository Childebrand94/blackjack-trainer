import { nanoid } from 'nanoid'

const PlayerCards = ({ cards, action }) => {
  console.log(cards)
  const getImageStyle = (card, index) => {
    return {
      bottom: card.double ? `${index * 40}px` : `${index * 20}px`,
      left: card.double ? `${index * 48}px` : `${index * 35}px`,
    }
  }

  return (
    <div className="relative w-1/2">
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
