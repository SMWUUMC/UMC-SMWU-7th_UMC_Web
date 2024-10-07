// 해야 할 일과 해낸 일 목록
const todoList = document.getElementById('todoList');
const completedList = document.getElementById('completedList');

// 추가 버튼과 인풋 필드
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');

// 할 일 추가 함수
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    // 할 일 목록에 새로운 할 일 추가
    const newTodo = document.createElement('li');
    newTodo.innerHTML = `
        ${todoText}
        <button onclick="completeTodo(this)">완료</button>
    `;
    todoList.appendChild(newTodo);

    // 입력 필드 초기화
    todoInput.value = "";
}

// 완료 버튼 클릭 시 실행되는 함수
function completeTodo(button) {
    const todoItem = button.parentElement;
    button.remove(); // 완료 버튼 제거
    todoItem.innerHTML += `<button onclick="deleteItem(this)">삭제</button>`;
    todoItem.classList.add('completed-item');
    completedList.appendChild(todoItem);
}

// 삭제 버튼 클릭 시 실행되는 함수
function deleteItem(button) {
    const item = button.parentElement;
    item.remove(); 
}

// ENTER 키로 할 일 추가
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 추가 버튼으로 할 일 추가
addBtn.addEventListener('click', addTodo);
