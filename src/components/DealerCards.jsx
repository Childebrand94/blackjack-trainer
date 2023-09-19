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
                ? new URL('/assets/Cards/cardBack_red1.png', import.meta.url).href
                : `${new URL('/assets/Cards', import.meta.url).href}/card${card.suit}${card.name}.png`
            }
          />
        )
      })}
    </div>
  )
}
export default DealerCards
