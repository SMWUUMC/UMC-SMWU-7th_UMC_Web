// 텍스트값을 입력받음
function enterInputText(){
  let inputText;
  inputText = inputTextId.value;
  addToList(inputText);
  inputTextId.value = null;
}

// 할 일 텍스트 생성
function makeNewListElement(text, listItem){
  const listItemName = document.createElement("div");
  listItemName.setAttribute("class", "listItemName");
  listItemName.appendChild(text);
  listItem.appendChild(listItemName);
}

// 완료 및 삭제 버튼 생성
function makeNewButton(listItem, button, text){
  button.setAttribute("class", "listItemButton");
  var btnText = document.createTextNode(text)
  button.appendChild(btnText);
  listItem.appendChild(button);
}

// 해야할 일 리스트에 추가
function addToList(text){
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "listItemContainer");

  var toDoText = document.createTextNode(text);
  makeNewListElement(toDoText, listItem);
  
  const completeBtn = document.createElement("a");
  makeNewButton(listItem, completeBtn, "완료");
  completeBtn.addEventListener("click", 
    () => moveToList(completeBtn)
  )

  document.getElementById("toDoList").appendChild(listItem);
}

// 해낸 일 리스트로 이동
function moveToList(selectedBtn){
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "listItemContainer");

  var text = selectedBtn.previousElementSibling;
  makeNewListElement(text, listItem);

  var toDoList = selectedBtn.parentElement;
  toDoList.remove();
  
  const deleteBtn = document.createElement("a");
  makeNewButton(listItem, deleteBtn, "삭제");
  deleteBtn.addEventListener("click", 
    () => deleteFromList(deleteBtn)
  )

  document.getElementById("completeList").appendChild(listItem); 
}

// 리스트에서 삭제
function deleteFromList(deleteBtn){
  var li = deleteBtn.parentElement;
  li.remove();
}

// input에 대한 이벤트리스너
const inputTextId = document.getElementById("toDoInput");
inputTextId.addEventListener("keyup", 
  function(event) {
    if (event.key === "Enter") {
      enterInputText();
    }
  }
);
