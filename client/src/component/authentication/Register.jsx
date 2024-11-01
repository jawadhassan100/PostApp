import React ,{useState} from 'react'
import { Card,Form,Button } from 'react-bootstrap'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
const Register = () => {
   let [fullname, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
   let navigate = useNavigate();

     function fullnameHandler(e) {
    setFullName(e.target.value);
  }

    function emailHandler(e) {
    setEmail(e.target.value);
  }
  function passwordHandler(e) {
    setPassword(e.target.value);
  }
  async function registerHandler(e) {
  e.preventDefault();
  let data = {
    FullName:fullname,
    Email: email,
    Password: password,
  }
  console.log(data);
    const response = await axios.post("http://localhost:8000/api/user/register", data, {
        'Content-Type': 'application/json'})
        console.log(response.data);
        if(response.data.message){
          alert(response.data.message)
          return null;
        }
      
      
          navigate("/");
}
  return (
    <Card className="bg-dark text-white" style={{marginTop:"50px", height:"400px" , width:"400px" ,marginLeft:"460px"}}>
      <Card.ImgOverlay>
        <Card.Title style={{marginLeft:"150px", textDecoration:"underline"}}>Register</Card.Title>
        <Form onSubmit={registerHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name"required  onInput={fullnameHandler}/>      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email"required  onInput={emailHandler}/>      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required onInput={passwordHandler}/>
      </Form.Group >
      <br />
      
      <Button variant="light" type="submit" style={{fontWeight:"bold"}}>
        signup
      </Button>
    </Form>
       
      </Card.ImgOverlay>
    </Card>
  )
}

export default Register
