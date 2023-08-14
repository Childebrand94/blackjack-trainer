import { Link } from 'react-router-dom'

const Button = ({ label, to }) => {
  return (
    <Link>
      <button to={to}>{label}</button>
    </Link>
  )
}
export default Button
