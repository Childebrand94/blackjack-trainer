import { nanoid } from 'nanoid'
const PlayerCards = ({ cards }) => {
  return (
    <div className="col-start-2 row-start-2 relative">
      {cards.map((card, index) => {
        return (
          <img
            key={nanoid()}
            style={{ bottom: `${index * 20}px`, left: `${index * 35}px` }}
            className="absolute"
            src={`src/assets/Cards/card${card.suit}${card.name}.png`}
          />
        )
      })}
    </div>
  )
}
export default PlayerCards
