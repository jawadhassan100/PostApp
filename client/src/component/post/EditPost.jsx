import React, { useEffect } from 'react'
import { Form,Card,Button } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import config from '../../config/config'

const EditPost = () => {
      const userid = useSelector((state)=> state.auth.userId)
        let postId = localStorage.getItem("postId");
  useEffect(() => {
       axios.get(`${config.BASE_URL}/user/get/${userid}`).then((res) => setAuthor(res.data)).catch((e) => console.log(e));
      }, [userid]);
  useEffect(() => {
   
    axios.get(`${config.BASE_URL}/post/get/${postId}`).then((res) => {setTitle(res.data.Title); setContent(res.data.Content)}).catch((e) => console.log(e));
}, [postId]);
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
  
    function authorHandler(event){
    setAuthor(event.target.value)
  }
    
 async function submitHandler(e){ 
    e.preventDefault();   
    await axios.patch(`${config.BASE_URL}/post/${postId}`, {
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
     <div className='d-grid justify-content-center pb-3'>
     <Card className="bg-dark form-width text-white" style={{marginTop:"40px", height:"500px" }}>
      <Card.ImgOverlay>
        <Card.Title style={{textAlign:"center" , textDecoration:"underline"}}>Edit Post</Card.Title>
        <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='lable-heading'>Title</Form.Label>
        <Form.Control onInput={titleHandler} type="text" value={title}/>      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='lable-heading'>Content</Form.Label>
        <Form.Control as="textarea" style={{ height: '100px' }} onInput={contentHandler} type="text" value={content}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='lable-heading'>UserId</Form.Label>
        <Form.Control type="text" value={userid} disabled/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='lable-heading'>Author</Form.Label>
        <Form.Control onInput={authorHandler} type="text" value={author}/>
      </Form.Group>
      <Button variant="light" type="submit" style={{fontWeight:"bold"}}>
        Submit
      </Button>
    </Form>
      </Card.ImgOverlay>
    </Card>
    </div>
    </>
  )
}

export default EditPost
