import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from "../../redux/post";
import config from '../../config/config';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting data and userId from Redux
  const data = useSelector((state) => state.posts.data);
  
  const userId = useSelector((state) => state.auth.userId); 
  console.log(userId);

  useEffect(() => {
    // Fetch posts and store them in Redux
    axios.get(`${config.BASE_URL}/post`)
      .then((res) => dispatch(setData(res.data)))
      .catch((e) => console.log(e));

    // Redirect to login if userId is missing
   
  }, [dispatch, navigate, userId]); // Added userId as a dependency

  // Handle delete
  async function deleteHandler(postId) {
    try {
      await axios.delete(`${config.BASE_URL}/post/${postId}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  // Handle edit
  function editHandler(postId) {
    localStorage.setItem("postId", postId);
    navigate("/editpost");
  }

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <Button variant="dark" className="btn-lg">
            <Link to="/addpost" className="text-decoration-none text-white" style={{ fontWeight: "bold" }}>
              Add Post
            </Link>
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {data && data.map((post) => (
          <Col md={6} lg={4} key={post._id} className="mb-4">
            <Card className="shadow-sm h-100" style={{ borderRadius: '10px' }}>
              <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                {post.Title}
                {userId === post.UserId && (
                  <div>
                    <Button variant="info" size="sm" className="mx-2" onClick={() => editHandler(post._id)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => deleteHandler(post._id)}>Delete</Button>
                  </div>
                )}
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ fontSize: '0.9rem', color: '#555' }}>{post.Content}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                <div className="d-flex justify-content-between">
                  <small>Author: {post.Author}</small>
                  <small>Published on: {new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
