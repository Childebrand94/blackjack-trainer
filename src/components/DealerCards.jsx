import { nanoid } from 'nanoid'

const DealerCards = ({ cards, faceDown }) => {
  const getImageStyle = (index) => {
    if (faceDown) {
      return {
        left: `${index * 150}px`,
      }
    } else {
      return {
        left: `${index * 40}px`,
      }
    }
  }
  return (
    <>
      <div className="col-start-2 row-start-1 relative">
        {cards.map((card, index) => {
          return (
            <img
              key={nanoid()}
              style={getImageStyle(index)}
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
