import React, {useState} from 'react'
import { Card,Form,Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setUserId, setAuthour } from "../../redux/post"
import { useDispatch} from "react-redux";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  function emailHandler(e) {
    setEmail(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
async function loginHandler(e) {
  e.preventDefault();
  let data = {
    Email: email,
    Password: password,
  }
  console.log(data);
    const response = await axios.post("http://localhost:8000/api/user/login", data, {
        'Content-Type': 'application/json'})
        console.log(response.data);
        if(response.data.message){
          alert(response.data.message)
          return null;
        }        
		    dispatch(setUserId(response.data.id));
		    dispatch(setAuthour(response.data.author));
          navigate("/");
}
    return (
    <Card className="bg-dark text-white" style={{marginTop:"50px", height:"400px" , width:"400px" ,marginLeft:"460px"}}>
      <Card.ImgOverlay>
        <Card.Title style={{marginLeft:"150px", textDecoration:"underline"}}>Login</Card.Title>
        <Form onSubmit={loginHandler} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email"required onInput={emailHandler}/>      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required onInput={passwordHandler}/>
      </Form.Group>
      <br />
      <div style={{display:"flex", justifyContent:"space-between"}}>
      {/* <Link to="home"> </Link> */}
      <Button variant="light" type="submit" style={{fontWeight:"bold"}}>
        Submit
      </Button>
      <Link to="/register"> <Button variant="light" type="submit" style={{fontWeight:"bold"}}>
        Register
      </Button></Link>
      </div>
    </Form>
      </Card.ImgOverlay>
    </Card>
  );
    }
export default Login

