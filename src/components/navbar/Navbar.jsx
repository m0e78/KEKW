import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking</span>
        </Link>
        {user ? (
          <div className="navItems">
            {user.username}
            <button onClick={handleLogout} className="navButton">
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button onClick={() => navigate("/register")} className="navButton">
              Register
            </button>
            <button onClick={() => navigate("/login")} className="navButton">
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
