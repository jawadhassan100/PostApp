import Login from "./component/authentication/Login";
import "./App.css";
import Home from "./component/post/Home";
import Register from "./component/authentication/Register";
import AddPost from "./component/post/addPost";
import EditPost from "./component/post/EditPost";
import { Route, Routes } from "react-router-dom";
import MyNavbar from "./component/navbar/Navbar";

function App() {
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
