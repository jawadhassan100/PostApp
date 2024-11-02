import React, {useState} from 'react'
import { Card,Form,Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setAuthour } from "../../redux/post"
import { useDispatch, useSelector} from "react-redux";
import { setToken, setUserId } from '../../redux/userId';
import config from '../../config/config';

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  const author = useSelector((state) => state.posts.author);
  const token = useSelector((state) => state.auth.token);
  console.log("slice id" ,userId);
  console.log("slice author" ,author);
  console.log("slice token" ,token);
  
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
    const response = await axios.post(`${config.BASE_URL}/user/login`, data, {
        'Content-Type': 'application/json',
        withCredentials: true, // Include cookies with the request
      })

        if(response.data.message){
          alert(response.data.message)
          return ;
        }        

        console.log(response);
        
        const userId = response.data.id
        const author = response.data.author
        const token = response.data.token
 
		    dispatch(setUserId(userId));
		    dispatch(setAuthour(author));
		    dispatch(setToken(token));

          navigate("/");
}
    return (
      <div className='center px-2'>
    <Card className="bg-dark text-white center  " style={{marginTop:"50px", height:"400px" , width:"400px"}}>
      <Card.ImgOverlay>
        <Card.Title style={{textAlign:"center" , textDecoration:"underline"}}>Login</Card.Title>
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
    </div>
  );
    }
export default Login

