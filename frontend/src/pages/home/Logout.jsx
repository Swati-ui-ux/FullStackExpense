import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()
     const handleLogOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    
  <button
    onClick={handleLogOut}
    className="bg-linear-to-r from-purple-400 to-pink-500 text-white p-2 mr-4 mt-3 w-50 mb-2 rounded hover:opacity-90 cursor-pointer"
  >
    🚪 Logout
  </button>

  )
}

export default Logout