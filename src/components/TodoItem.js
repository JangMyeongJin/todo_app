import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteTasks, updateTasks }) => {

  const deleteItem = () => {
    deleteTasks(item._id);
  }

  const updateItem = () => {
    updateTasks(item._id);
  }

  return (
    <Row>
      <Col xs={12}>
        <div className={ item.status === false ? 'todo-item' : 'todo-item item-complete'}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button 
              className="button-delete"
              onClick={deleteItem}
              >삭제</button>
            {
            item.status === false ?
            <button 
              className="button-delete"
              onClick={updateItem}
              >끝남</button>
             : ""
            }
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
