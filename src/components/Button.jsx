import PropTypes from 'prop-types'

const Button = ({ label, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="m-1 w-36 inline-block px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
    >
      {label}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
