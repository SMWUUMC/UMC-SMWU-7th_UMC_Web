// src/api/todoApi.js
export const fetchTodos = async (title) => {
    const response = await fetch(`http://localhost:3000/todo${title ? `?title=${title}` : ''}`);
    if (!response.ok) throw new Error("Failed to fetch todos");
    return response.json();
};


export const fetchTodoById = async (id) => {
    const response = await fetch(`http://localhost:3000/todo/${id}`);
    if (!response.ok) throw new Error("Failed to fetch todo");
    return response.json();
};

export const createTodo = async (todo) => {
    const response = await fetch("http://localhost:3000/todo", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to create todo");
    return response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:3000/todo/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete todo");
    return response.json();
};

export const updateTodo = async (id, todo) => {
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    return response.json();
};


