import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import GlobalStyle from "./styles/GlobalStyle";

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/todo/:id" element={<TodoDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
