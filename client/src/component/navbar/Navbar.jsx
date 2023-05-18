import React from 'react'
import { Navbar,Container,  NavItem, Button   } from 'react-bootstrap'


function MyNavbar ()  {
  
  let userId = localStorage.getItem("UserId")
  let isLoggedin = false;
       if(!(userId === "null" )){
        isLoggedin = true;
       } else {
        isLoggedin = false;
       }
  // let navigate = useNavigate();
  function logoutHandler(){
    localStorage.removeItem("UserId");
    localStorage.setItem("UserId", null);
    // navigate('/');
  }
  return (
    <div>
       <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{display:"flex", justifyContent:"center", width:"100%"}}>
            <h2>Post Application</h2>  
          </Navbar.Brand>
          {
            isLoggedin ? ( <NavItem style={{color: 'white'}}  href="#">
            <Button onClick={logoutHandler}  >Logout</Button >
          </NavItem >) : <></>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default MyNavbar
