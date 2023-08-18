import Button from '../components/Button'
import DealerCards from '../components/DealerCards'
import PlayerCards from '../components/PlayerCards'

const SpeedCounting = () => {
  const onClick = () => {
    console.log('click')
  }
  return (
    <div className="grid grid-cols-3 gap-0 grid-rows-2 h-[100vh] bg-green-700">
      <DealerCards />
      <PlayerCards />

      <div className="col-start-3 row-start-2 relative">
        <div className="absolute bottom-0 right-0">
          <Button onClick={onClick} label={'Quit'} />

          <Button onClick={onClick} label={'Reset'} />
        </div>
      </div>
    </div>
  )
}
export default SpeedCounting
