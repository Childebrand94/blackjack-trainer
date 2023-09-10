const CountStats = ({ label, stat }) => {
  return (
    <div className="bg-gray-400 opacity-50 flex justify-center flex-col text-center rounded-xl w-1/2 m-3">
      <p>{`${label}: ${stat}`}</p>
    </div>
  )
}
export default CountStats
