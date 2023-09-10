import { useState } from 'react'

const TestPlayer = ({ handlePlayerResponse }) => {
  const [userInput, setUserInput] = useState({
    runningCount: 0,
    trueCount: 0,
  })

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    handlePlayerResponse(userInput)
  }
  return (
    <div className="bg-gray-400 p-4 rounded-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="runningCount" className="mb-2">
          Running Count
        </label>
        <input
          type="number"
          name="runningCount"
          id="runningCount"
          value={userInput.runningCount}
          onChange={handleChange}
          className="px-2 py-1 rounded border border-gray-600"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
          }}
        />
        <label htmlFor="trueCount" className="mt-2 mb-2">
          True Count
        </label>
        <input
          type="number"
          name="trueCount"
          id="trueCount"
          value={userInput.trueCount}
          onChange={handleChange}
          className="px-2 py-1 rounded border border-gray-600"
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
          }}
        />
        <button type="submit" className="bg-gray-500 text-white px-4 py-2 mt-4 rounded hover:bg-gray-600">
          Submit
        </button>
      </form>
    </div>
  )
}
export default TestPlayer
