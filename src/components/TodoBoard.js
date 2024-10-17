import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ( { todoList, deleteTasks, updateTasks } ) => {


  
  return (
    <div>
      <h2>Todo List</h2>
      { 
        todoList.length > 0 ? (
          todoList.map((item) => <TodoItem item={item} key={item._id} deleteTasks={deleteTasks} updateTasks={updateTasks} />)
        ) : (
          <h2>There is no Item to show</h2>
        )
      }
    </div>
  );
};

export default TodoBoard;
