import { useContext, useState } from "react"
import "./login.css"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    passwordusername: undefined,
  })
  const { user, loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      )
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }
  console.log(user)
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Enter your username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error ? <span>{error.message}</span> : null}
      </div>
    </div>
  )
}
export default Login
