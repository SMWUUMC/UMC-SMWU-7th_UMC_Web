import React, { useState } from "react";

const TodoForm = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (title && content) {
            onSubmit({ title, content });
            setTitle("");
            setContent("");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>추가</button>
        </div>
    );
};

export default TodoForm;
