import NavBar from '../components/NavBar'

const StrategyCard = () => {
  return (
    <main className="h-full pb-24 relative" style={{ backgroundColor: '#0a5733' }}>
      <NavBar />
      <div className="flex flex-col items-center justify-center pt-14">
        <img src="./src/assets/StrategyCard.jpg" alt="" className="w-4/5 rounded-xl" />
      </div>
    </main>
  )
}
export default StrategyCard
