import styled from 'styled-components';
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import useCustomGet from '../hooks/useCustomGet';
import useCustomDelete from '../hooks/useCustomDelete';
import { useNavigate } from 'react-router-dom';

const ToDoItem = () => {

    const navigate = useNavigate();

    const { data, isLoading, isError } = useCustomGet('http://localhost:3000/todo')
    
    const deleteToDo = useCustomDelete();
    console.log(data.data)

    let toDos = []

    if (data.data != undefined) {
        console.log("로딩끝")
        toDos = data.data[0];
    }

    console.log(toDos)

    return (
        isLoading ? <div>로딩중</div> :
            isError ? <div>에러발생</div> :
                <ToDoList>
                    {
                        toDos?.map((toDo) => (
                            console.log(toDo.id),
                            <Box onClick={() => navigate(`/detail/${toDo.id}`, {
                                replace: false,
                            })}>
                                <CheckBox />
                                <TextWrapper>
                                    <Text>{toDo.title}</Text>
                                    <Text size='0.8rem'>{toDo.content}</Text>
                                </TextWrapper>
                                <ButtonWrapper>
                                    <Button><MdEdit/><span>수정</span></Button>
                                    <Button onClick={(e) => {
                                        deleteToDo(`http://localhost:3000/todo/${toDo.id}`)
                                        e.stopPropagation()
                                        }}><FaTrashAlt /><span>삭제</span></Button>
                                </ButtonWrapper>
                            </Box>
                        ))
                    }
                </ToDoList>
    )
}

const ToDoList = styled.ul`
    box-sizing: border-box;
    width: 100%;
    /* height: fit-content; */
    display: flex;
    flex-direction: column;
    padding: 0;
    padding-top: 200px;
`

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
    
`

const Box = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    /* position: relative; */
    width: 100%;
    height: 5em;
    border-radius: 0.2rem;
    border: 1px solid #ccc;
    padding: 2em;
    margin-bottom: 0.5em;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        transform: scale(1.1);
    }
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Text = styled.div`
    margin-left: 1rem;
    margin-right: auto;
    font-size: ${props => props.size || '1rem'};
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`

const Button = styled.button`
    width: 4em;
    height: 4em;
    margin-left: 1em;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6em;
    border: 1px solid #ccc;
    transition: all 0.5s;
    font-size: 0.8rem;
    

    &:hover {
        width: 6em;
        cursor: pointer;
    }

    &:first-child:hover {
        background-color: skyblue;
    }

    &:last-child:hover {
        background-color: tomato;
    }

    &>span {
        display: none;
        transition: all 0.5s;
        margin-left: 0.8em;
    }

    &:hover>span {
        display: block;
    }
`

export default ToDoItem;