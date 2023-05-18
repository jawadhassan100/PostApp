import Login from "./component/authentication/Login";
import MyNavbar from "./component/navbar/Navbar";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./component/post/Home";
import Register from "./component/authentication/Register";
import AddPost from "./component/post/addPost";
import EditPost from "./component/post/EditPost";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "addpost",
    element: <AddPost />,
  },
  {
    path: "editpost",
    element: <EditPost />,
  },
  {
    path: "navv",
    element: <MyNavbar />,
  },
]);

function App() {
  return (
    <>
      <MyNavbar />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
