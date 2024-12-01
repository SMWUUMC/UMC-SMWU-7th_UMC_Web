import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTodoById, deleteTodo, updateTodo } from "../api/todoApi";

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const getTodo = async () => {
        try {
            const result = await fetchTodoById(id);
            setTodo(result);
            setChecked(result.checked);
        } catch (error) {
            console.error("Failed to fetch todo:", error);
        }
        };

        getTodo();
    }, [id]);

    const handleDelete = async () => {
        await deleteTodo(id);
        navigate("/");
    };

    const handleUpdate = async () => {
        await updateTodo(id, { checked });
        setTodo({ ...todo, checked });
    };

    if (!todo) return <div>Loading...</div>;

    return (
        <div>
        <h1>{todo.title}</h1>
        <p>{todo.content}</p>
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TodoDetail;
