const PlayerFeedBack = ({ string }) => {
  return (
    <div className="bg-gray-400 flex justify-center text-center rounded-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="p-6">
        <span className="text-white font-semibold text-4xl p-3">{string}</span>
      </div>
    </div>
  )
}
export default PlayerFeedBack
