import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userId';
function MyNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // Get the userId from Redux state
  const userId = useSelector((state) => state.auth.userId);

  // Check if user is logged in by checking the presence of userId
  const isLoggedIn = Boolean(userId);

  function logoutHandler() {
    dispatch(logout()); // Dispatch the logout action
    navigate('/'); // Redirect to home page
  }

  function loginHandler() {
    navigate('/login');
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md" className="py-3 shadow">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700' }}>
          Post App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive" className="justify-content-end">
          <Nav>
            {isLoggedIn ? (
              <Button variant="outline-light" onClick={logoutHandler} className="mx-2">
                Logout
              </Button>
            ) : (
              <Button variant="outline-light" onClick={loginHandler} className="mx-2">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default MyNavbar;
