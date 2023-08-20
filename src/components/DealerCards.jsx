import { nanoid } from 'nanoid'

const DealerCards = ({ cards, faceDown }) => {
  return (
    <>
      <div className="col-start-2 row-start-1 relative">
        {cards.map((card, index) => {
          return (
            <img
              key={nanoid()}
              style={{ left: `${index * 150}px` }}
              className="absolute"
              src={
                faceDown && index === 0
                  ? 'src/assets/Cards/cardBack_red1.png'
                  : `src/assets/Cards/card${card.suit}${card.name}.png`
              }
            />
          )
        })}
      </div>
    </>
  )
}
export default DealerCards
