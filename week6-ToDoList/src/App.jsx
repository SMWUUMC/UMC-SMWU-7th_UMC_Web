import { useContext } from 'react'
import './App.css'
import { ToDoContext } from './assets/context/ToDoContext'

function App() {
  const { toDo, setToDo, inputText, setInputText, handleSubmit, handleInput, handleSubmitButton, handleInputEnter, listItems } = useContext(ToDoContext)
  return (
    <>
      <header>
        <h3>할 일 목록</h3>
        <div onSubmit={handleSubmit} className='inputContainer'>
          <input type='text' className='taskInput' placeholder='입력' onChange={handleInput} onKeyDown={handleInputEnter} value={inputText}></input>
          <button type='submit' className='taskSubmitButton' onClick={handleSubmitButton}>할 일 등록</button>
        </div>
      </header>
      <ul id='toDoList'>
        {listItems}
      </ul>
    </>
  )
}

export default App