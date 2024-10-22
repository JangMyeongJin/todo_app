import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();

  const sessionToken = window.sessionStorage.getItem("token");

  const getTasks = async () => {
    const response = await api.get("/tasks");
    setTodoList(response.data.data);
  };

  useEffect(() => {
    if(sessionToken === null) {
      alert("You can use it after Sing-in");
      navigate("/login");
    }

    getTasks();
  }, []);
  const addTodo = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        status: false,
      });
      if (response.status === 200) {
        getTasks();
      }
      setTodoValue("");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      console.log("task.status : ", task.status);
      const response = await api.put(`/tasks/${id}`, {
        status: task.status,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            onChange={(event) => setTodoValue(event.target.value)}
            className="input-box"
            value={todoValue}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTodo} className="button-add">
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteItem={deleteItem}
        toggleComplete={toggleComplete}
      />
    </Container>
  );
};

export default TodoPage;