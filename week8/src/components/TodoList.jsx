import React, { useState } from "react";
import { fetchTodos } from "../api/todoApi";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const [title, setTitle] = useState("");

    const { data, loading, error } = useFetch(fetchTodos, title);

    const handleSearchChange = (e) => {
        setTitle(e.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={handleSearchChange}
                placeholder="Search Todos"
            />
            {data && data.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </div>
    );
};

export default TodoList;
