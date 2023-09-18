import { nanoid } from 'nanoid'

const DealerCards = ({ cards, faceDown }) => {
  const getImageStyle = (index) => {
    if (faceDown) {
      return {
        left: `${index * 40}px`,
      }
    } else {
      return {
        left: `${index * 40}px`,
      }
    }
  }
  return (
    <div className="relative w-1/2">
      {cards.map((card, index) => {
        return (
          <img
            key={nanoid()}
            style={getImageStyle(index)}
            className="absolute"
            src={
              faceDown && index === 0
                ? '/assets/Cards/cardBack_red1.png'
                : `/assets/Cards/card${card.suit}${card.name}.png`
            }
          />
        )
      })}
    </div>
  )
}
export default DealerCards
