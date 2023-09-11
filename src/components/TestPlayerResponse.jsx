import { userFeedBackResponse } from '../functions/types'

const TestPlayerResponse = ({ correctResponse, runningCount, trueCount }) => {
  return (
    <div className="bg-gray-400 p-4 rounded-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {correctResponse === userFeedBackResponse.correct ? (
        <p className="text-center text-white text-xl font-bold">Correct</p>
      ) : (
        <div>
          <h2 className="text-center text-white text-2xl font-bold mb-2">Incorrect</h2>
          <h3 className="text-center text-white text-lg">{`Running Count = ${runningCount}`}</h3>
          <h3 className="text-center text-white text-lg">{`True Count = ${trueCount}`}</h3>
        </div>
      )}
    </div>
  )
}

export default TestPlayerResponse
