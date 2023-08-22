import { nanoid } from 'nanoid'
const PlayerCards = ({ cards }) => {
  return (
    <div className="col-start-2 row-start-2 relative">
      {cards.map((card, index) => {
        return (
          <img
            key={nanoid()}
            style={{
              bottom: card.double ? `${index * 40}px` : `${index * 20}px`,
              left: card.double ? `${index * 48}px` : `${index * 35}px`,
            }}
            className={`absolute transform ${card.double === true ? 'rotate-90' : ''}`}
            src={`src/assets/Cards/card${card.suit}${card.name}.png`}
          />
        )
      })}
    </div>
  )
}
export default PlayerCards
