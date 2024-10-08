import { useState } from 'react'
import './App.css'

function App() {
  const [toDo, setToDo] = useState([
    // { num: 1, task: "할 일" }
  ])
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => 
    e.preventDefault();
  
  const handleInput = (e) => 
    setInputText(e.target.value);

  let editedText
  const handleEditInput = (e) => 
    editedText = e.target.value;
    

  const handleSubmitButton = (e) => {
    console.log(toDo.length);
    if (toDo.length > 0) {
      setToDo(prev => ([
        ...prev,
        {
        num: prev.at(prev.length-1).num+1,
        task: inputText
        }
      ]));
    } else {
      setToDo(prev => ([
        ...prev,
        {
        num: 1,
        task: inputText
        }
      ]));
    }
    setInputText('')
  };

  
  const handleInputEnter = (e) => {
    if (e.key == 'Enter') {
      handleSubmitButton(e);
    }
  }

  const handleEditedSubmitButton = (e) => {
    if (e.key == 'Enter'){
      editToDo(e);
    }
  };

  const changeVisiblity = (e, mode) => {
    e.target.parentElement.className = 'invisible task';
    console.log(mode);
    if (mode === 'start') {
      e.target.parentElement.nextElementSibling.className = 'visible task';
    }
    else if (mode === 'end'){
      e.target.parentElement.previousElementSibling.className = 'visible task';
    }
  }

  const startEdit = (e) => {
    changeVisiblity(e, 'start');
    e.target.parentElement.nextElementSibling.firstElementChild.focus();
  }

  const editToDo = (e) => {
    let copy = toDo;
    let idx = e.target.parentNode.parentNode.id;
    
    copy[idx] = {
      num: Number(idx)+1,
      task: editedText
    };
    console.log(copy[idx]);
    setToDo([...copy]);
    changeVisiblity(e, 'end')
  };

  let listItems = ''

    listItems = toDo.map((item) => 
      <li className='taskContainer' key={item.num} id={toDo.indexOf(item)}>
        <span className='visible task'>
          <span className='taskText'>{item.num}. {item.task}</span>
          <button className='deleteButton' key={item.num} onClick={
            () => {
              setToDo(toDo.filter((i) =>
                i.num !== item.num
              ));
            }
          }>삭제하기</button>
          <button className='editButton' onClick={startEdit}>수정하기</button>
        </span>
        <span className='invisible task'>
          <input class='taskText' type='text' onChange={handleEditInput} onKeyUp={handleEditedSubmitButton}></input>
          <button className='editButton' onClick={editToDo}>수정완료</button>
          <button className='deleteButton' key={item.num} onClick={
            () => {
              setToDo(toDo.filter((i) =>
                i.num !== item.num
              ));
            }
          }>삭제하기</button>
        </span>
      </li>
    );


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