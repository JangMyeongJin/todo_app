import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [ todoList, setTodoList ] = useState([]);
  const [ todoValue, setTodoValue ] = useState([]);

  // 서버에 요청하는건 async
  const getTasks = async () => {
    try {
      const response = await api.get("/tasks");

      if(response.data.status === "ok"){
        setTodoList(response.data.data);
      }else {
        throw new Error("can not be get");
      }
    }catch(err) {
      console.log("Error : ",err);
    }
    
    
  };

  const enterPress = (key) => {
    if(key === "Enter"){
      addTask();
    }
  };

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue, status: false
      });

      if(response.data.status === "ok"){
        setTodoValue("");
        getTasks();

      }else {
        throw new Error("task can not be added");
      }
    }catch(err) {
      console.log("Error : ",err);
    }
  };

  const deleteTasks = async (id) => {
    try {
      const response = await api.delete("/tasks/"+id);

      if(response.data.status === "ok"){
        getTasks();
      }else {
        throw new Error("task can not be deleted");
      }
    }catch(err) {
      console.log("Error : ",err);
    }
    
  };

  const updateTasks = async (id) => {
    try {
      const response = await api.put("/tasks/"+id);

      if(response.data.status === "ok"){
        getTasks();
      }else {
        throw new Error("task can not be deleted");
      }
    }catch(err) {
      console.log("Error : ",err);
    }
  }

  // 처음 로딩될때 useEffect + ([])
  useEffect(() => {
    getTasks();
  }, ([]));

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
            onKeyDown={(event) => enterPress(event.key)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTasks={deleteTasks} updateTasks={updateTasks} />
    </Container>
  );
}

export default App;
