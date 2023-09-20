import NavBar from '../components/NavBar'

const StrategyCard = () => {
  return (
    <main className="min-h-screen pb-24 relative bg-green-700">
      <NavBar />
      <div className="flex flex-col items-center justify-center pt-14">
        <img
          src={new URL('/assets/StrategyCard.jpg', import.meta.url).href}
          alt=""
          className="w-full md:w-4/5 mt-14 rounded-xl"
        />
      </div>
    </main>
  )
}

export default StrategyCard
