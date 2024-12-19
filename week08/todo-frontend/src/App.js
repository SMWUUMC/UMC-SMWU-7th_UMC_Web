import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import Detail from "./pages/detail";

const App = () => {
  const root = document.getElementById("root");

  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<Home />}>
          <Route path=":id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
