
import { Form,Card,Button } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AddPost() {
      let [title ,setTitle] = useState("")
      let [content,setContent] = useState("")
      let [userid,setUserid] = useState(localStorage.getItem("UserId"))
      let [author,setAuthor] = useState(localStorage.getItem("Author"))

      const myid = useSelector((state) => state.posts.userid)
      console.log(myid);
      
      let navigate = useNavigate();
      // const author = useSelector((state) => state.posts.author)
    function titleHandler(event){
    setTitle(event.target.value)
  }
  
  function useridHandler(event){
    setUserid(event.target.value)
  }
  function authorHandler(event){
    setAuthor(event.target.value)
  }
  
    function contentHandler(event){
    setContent(event.target.value)
  }
    
 async function submitHandler(e){ 
    e.preventDefault();   
    let data = {
        Title: title,
        Content:content,
        UserId:userid,
        Author:author
    }
    await axios.post("http://localhost:8000/api/post/",data, {
        'Content-Type': 'application/json'
    }).then((res) =>
     navigate("/")).catch((e)=>console.log(e))
  }




  return (
    <>
   
     <Card className="bg-dark text-white" style={{marginTop:"50px", height:"500px" , width:"400px" ,marginLeft:"460px"}}>
      <Card.ImgOverlay>
        <Card.Title style={{marginLeft:"150px", textDecoration:"underline"}}>Add Post</Card.Title>
        <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onInput={titleHandler} type="text" />      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" style={{ height: '100px' }} onInput={contentHandler} type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>UserId</Form.Label>
        <Form.Control onInput={useridHandler} type="text" value={userid} disabled/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Author</Form.Label>
        <Form.Control onInput={authorHandler} disabled type="text" value={author}/>
      </Form.Group>
      <Button variant="light" type="submit" style={{fontWeight:"bold"}}>
        Submit
      </Button>
    </Form>
      </Card.ImgOverlay>
    </Card>
    </>
  )
}

export default AddPost
