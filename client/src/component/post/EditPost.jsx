import React, { useEffect } from 'react'
import { Form,Card,Button } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EditPost = () => {
       let [userid,setUserid] = useState(localStorage.getItem("UserId"))
        let postId = localStorage.getItem("postId");
  useEffect(() => {
       axios.get(`http://localhost:8000/api/user/get/${userid}`).then((res) => setAuthor(res.data)).catch((e) => console.log(e));
       axios.get(`http://localhost:8000/api/Post/get/${postId}`).then((res) => {setTitle(res.data.Title); setContent(res.data.Content)}).catch((e) => console.log(e));
  }, []);
        let [title ,setTitle] = useState("")
        let [content,setContent] = useState("")
        let [author,setAuthor] = useState("")
      let navigate = useNavigate();


    function titleHandler(event){
    setTitle(event.target.value)
  }
  
    function contentHandler(event){
    setContent(event.target.value)
  }
  
    function useridHandler(event){
    setUserid(event.target.value)
  }
  
    function authorHandler(event){
    setAuthor(event.target.value)
  }
    
 async function submitHandler(e){ 
    e.preventDefault();   
    await axios.patch(`http://localhost:8000/api/Post/${postId}`, {
        Title: title,
        Content:content,
        UserId:userid,
        Author:author

    }, {
        'Content-Type': 'application/json'
    }).then((res) => navigate("/")).catch((e)=>console.log(e))
  }
   return (
    <>
   
     <Card className="bg-dark text-white" style={{marginTop:"50px", height:"500px" , width:"400px" ,marginLeft:"460px"}}>
      <Card.ImgOverlay>
        <Card.Title style={{marginLeft:"150px", textDecoration:"underline"}}>Edit Post</Card.Title>
        <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control onInput={titleHandler} type="text" value={title}/>      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" style={{ height: '100px' }} onInput={contentHandler} type="text" value={content}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>UserId</Form.Label>
        <Form.Control onInput={useridHandler} type="text" value={userid} disabled/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Author</Form.Label>
        <Form.Control onInput={authorHandler} type="text" value={author}/>
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

export default EditPost
