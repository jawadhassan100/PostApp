import Login from "./component/authentication/Login";
import "./App.css";
import Home from "./component/post/Home";
import Register from "./component/authentication/Register";
import AddPost from "./component/post/addPost";
import EditPost from "./component/post/EditPost";
import { Route, Routes } from "react-router-dom";
import MyNavbar from "./component/navbar/Navbar";
import "./App.css"
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/userId";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const checkToken = () => {
      if (!token) {
        return null; // No token, no need to check
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        dispatch(logout())
        localStorage.removeItem('token');
        navigate('/login');
        console.log("Logged out: Token has expired.");
      } else {
        const timeRemaining = decodedToken.exp - currentTime;
        console.log(`You will be logged out in ${timeRemaining} seconds.`);
      }
    };

    // Check token immediately on mount
    checkToken();

    // Set an interval to check token every minute (or any preferred interval)
    const interval = setInterval(checkToken, 60000); // Check every minute

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [navigate , dispatch , token]);



  return (
    <>
    <MyNavbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/addpost" element={<AddPost/>}/>
      <Route path="/editpost" element={<EditPost/>}/>
    </Routes>

    </>
  );
}

export default App;
