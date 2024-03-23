import { useContext, useState } from "react"
import "./register.css" // Rename this CSS file to register.css
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
  })
  const { loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: "REGISTER_START" })
    try {
      const response = await axios.post("/api/auth/register", credentials)
      dispatch({ type: "REGISTER_SUCCESS", payload: response.data.details })
      navigate("/login") // Redirect to login page after successful registration
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data })
    }
  }

  return (
    <div className="register">
      <div className="rgContainer">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          id="username"
          onChange={handleChange}
          className="rInput"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          onChange={handleChange}
          className="rInput"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          onChange={handleChange}
          className="rInput"
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          placeholder="Enter your country"
          id="country"
          onChange={handleChange}
          className="rInput"
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          placeholder="Enter your city"
          id="city"
          onChange={handleChange}
          className="rInput"
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          placeholder="Enter your phone number"
          id="phone"
          onChange={handleChange}
          className="rInput"
        />
        <button disabled={loading} onClick={handleClick} className="rButton">
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link className="loginHere" to="/login">
            Login
          </Link>
        </p>
        {error ? <span>{error.message}</span> : null}
      </div>
    </div>
  )
}

export default Register
