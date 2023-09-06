const PlayerAccuracy = ({ totalHands, correctChoices }) => {
  return (
    <div className="bg-gray-400 opacity-50 flex justify-center flex-col text-center rounded-xl w-1/2">
      <p>{`Total Hands: ${totalHands}`}</p>
      <p>{`Correct Hands: ${correctChoices}`}</p>
      <p>
        {`Accuracy: ${totalHands === 0 ? '0' : ((correctChoices / totalHands) * 100).toFixed(2)}
        ` + '%'}
      </p>
    </div>
  )
}
export default PlayerAccuracy
