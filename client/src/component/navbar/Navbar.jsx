import React, { useEffect, useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("UserId");
    setIsLoggedIn(userId); 
  }, []);

  function logoutHandler() {
    localStorage.removeItem("UserId");
    setIsLoggedIn(false);
    navigate('/');
    
  }

  function loginHandler() {
    navigate('/login');
   
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <h2>Post Application</h2>
          </Navbar.Brand>
          {isLoggedin ? (
            <Button onClick={logoutHandler}>Logout</Button>
          ) : (
            <Button onClick={loginHandler}>Login</Button>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
