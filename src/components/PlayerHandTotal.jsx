const PlayerHandTotal = ({ total }) => {
  return (
    <div
      className="absolute bg-gray-600 rounded py-1 px-2 text-white text-center"
      style={{ top: '150px', right: '40px' }}
    >
      <span>{total}</span>
    </div>
  )
}
export default PlayerHandTotal
