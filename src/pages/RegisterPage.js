import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate

  const handleSubmit = async (event) => {

     // 새로고침 막음
     event.preventDefault();
    try{
      if(name === "") {
        throw new Error("Please enter your name.");
       }
       if(email === ""){
        throw new Error("Please enter your email.");
       }
       if(password === ""){
        throw new Error("Please enter your password.");
       }
       if(secPassword === ""){
        throw new Error("Please re-enter your password.");
       }
      if(password !== secPassword) {
        throw new Error("Password does not match.");
      }

      const response = await api.post("/user", {name, password, email});
      if(response.status === 200){
        navigate("/login");
      }else {
        throw new Error(response.data.error);
      }
      
    }catch(err){
      setError(err.message);
    }
  }

  return (
    <div className="display-center">
      {error && <div className="error">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(event)=>setName(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event)=>setSecPassword(event.target.value)}/>
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
