import styled from "styled-components";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ items }) => {

    console.log(items)

    return (
        <ListWrapper>
            {
                items?.map((item) => {
                    return <ToDoItem toDo={item}></ToDoItem>
                })
            }
        </ListWrapper>
    );
}

const ListWrapper = styled.div`
    margin-top: 250px;
    width:100%;
`

export default ToDoList;