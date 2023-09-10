const DecksRemaining = ({ cardsDealt }) => {
  const decksRemaining = cardsDealt / 52

  const roundToNearestQuarter = (number) => {
    return Math.round(number * 4) / 4
  }

  return (
    <div className="bg-gray-400 opacity-50 flex justify-center flex-col text-center rounded-xl w-1/2 m-3">
      <p>{`Decks Dealt: ${roundToNearestQuarter(decksRemaining).toFixed(2)}`}</p>
    </div>
  )
}

export default DecksRemaining
