import { createContext, useState } from "react";

export const ToDoContext = createContext();

export function ToDoContextProvider({children}) {
    
    const [toDo, setToDo] = useState({
        title: '',
        content: ''
    })

    const [inputText, setInputText] = useState({
        title: '',
        content: ''
    })

    const [allToDos, setAllToDos] = useState([])

    // ToDo 추가 버튼 핸들러 (onSubmit)
    const handleSubmit = (e) => {
        e.preventDefault();
        setToDo({
            ...toDo,
            title: inputText.title,
            content: inputText.content
        })
        setInputText({
            title: '',
            content: ''
        })
        console.log("toDo......")
        console.log(toDo)
    }

    // 사용자 입력값 핸들러 (onChange)
    const handleInput = (e) => {     
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value
        })
    }

    return (
        <ToDoContext.Provider value={{toDo, setToDo, inputText, handleSubmit, handleInput, allToDos, setAllToDos}}>
            {children}
        </ToDoContext.Provider>
    )
    
}