import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ todo }) => {
    return (
        <div>
            <h3>{todo.title}</h3>
            <p>{todo.content}</p>
            <Link to={`/todo/${todo.id}`}>Details</Link>
        </div>
    );
};

export default TodoItem;
