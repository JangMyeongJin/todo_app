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
    const response = await api.get("/tasks");

    setTodoList(response.data.data);
  }

  const enterPress = (key) => {
    if(key === "Enter"){
      addTask();
    }
  }

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue, status: false
      });

      if(response.status === 200){

        // eslint-disable-next-line no-restricted-globals
        location.reload(true);

      }else {
        throw new Error("task can not be added");
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

      <TodoBoard todoList={todoList}/>
    </Container>
  );
}

export default App;
