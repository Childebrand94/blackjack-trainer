import Button from './Button'

const Insurance = ({ handleInsuranceDeclined, handleInsuranceAccepted }) => {
  return (
    <div className="bg-gray-400 flex justify-center text-center rounded-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="p-6">
        <h2 className="text-white font-semibold text-4xl pb-5">Insurance?</h2>
        <Button label="Yes" onClick={() => handleInsuranceAccepted()} />
        <Button label="No" onClick={() => handleInsuranceDeclined()} />
      </div>
    </div>
  )
}
export default Insurance
