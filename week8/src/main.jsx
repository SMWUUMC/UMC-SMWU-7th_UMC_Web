import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import GlobalStyle from "./styles/GlobalStyle"; // GlobalStyle도 적용

// React Query 클라이언트 생성
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <App />
    </QueryClientProvider>
);
