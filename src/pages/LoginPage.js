import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // 페이지 이동을 위한 navigate

  const handleLogin = async (event) => {
    // 새로고침 막음
    event.preventDefault();

    try{
      if(email === "" || password === "") {
        throw new Error("Please enter email or password");
      }
      const response = await api.post("/user/login", {email, password});
      if(response.status === 200){
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);   // session에 token 저장
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;  // headers에 token 저장, Bearer는 토큰에 붙여주는 규칙(?)
        setError("");

        navigate("/");
      }else {
        throw new Error(response.message);
      }

    }catch(err) {
      setError(err.message);
    }
  }

  return (
    <div className="display-center">
      {error && <div className="error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
