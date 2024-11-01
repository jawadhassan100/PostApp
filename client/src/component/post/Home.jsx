import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Card,Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from "../../redux/post"
function Home () {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts.data)
   let userId  = localStorage.getItem("UserId")
   let navigate = useNavigate();

     useEffect(() => {
       axios.get("http://localhost:8000/api/Post").then((res) => dispatch(setData(res.data))).catch((e) => console.log(e));
       if(userId === "null"){
    navigate("/login");
   }
  });

  async function deleteHandler(postId){
    await axios.delete(`http://localhost:8000/api/Post/${postId}`)
  }
  async function editHander(postId){
    localStorage.setItem("postId", postId)
    navigate("/editpost");
  }
return(
  <Container className='d-flex justify-content-center align-items-center w-100'>
      <Card className='p-5 mt-2' style={{ width:"950px",border:"solid 3px",backgroundColor:"#454545"}}>
          <Button className='d-flex justify-content-center align-items-center w-25' variant="light" style={{fontWeight:"bold" ,backgroundColor:"black",color:"white"}}>
             <Link to="/addpost">  Add Post</Link>
            </Button>
          {
            data.map((data) => {
              return ( 

                <Card className='my-3' key={data._id}>
                    <Card.Header className='d-flex w-100 justify-content-between align-items-center'>
                      {data.Title}
                      {
                      userId === data.UserId ?
                      <div className='d-flex justify-content-between align-items-center'>
                           <button className="btn btn-info btn-sm mx-2" onClick={() => editHander(data._id)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(data._id)}>Delete</button>
                      </div>
                          :
                          <div></div>
                          
                      }
                    </Card.Header>
                  <Card.Body >
                    <Card.Text >
                        {data.Content}
                    </Card.Text>
                    
                  </Card.Body>
                  <div className="d-flex justify-content-around align-items-center w-100">
                    <footer className="blockquote-footer">
                      Author <cite title="Source Title">{data.Author}</cite>
                    </footer>
                    <footer className="blockquote-footer">
                      Publish Date: {data.createdAt}
                    </footer>
                  </div>
                </Card>

              )
              })
            } 

        
      </Card>

    
  </Container>
)

}

export default Home




