import styled from "styled-components"
import Record from "./Record"
import { useSelector } from "react-redux"
import { clearCart } from "../features/cart/cartSlice"
import { useDispatch } from "react-redux"

const RecordList = () => {

    const { amount, cartItems, total } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    return (
        <>
            <ListContainer>
                {cartItems.length === 0 && <div>장바구니가 비어있습니다.</div>}
                {cartItems.map((item) => (
                    <>
                        <Record key={item.id} {...item} />
                    </>
                ))}
            </ListContainer>
            <TotalContainer>
                <TotalText>총 가격</TotalText>
                <TotalText>&#8361; {total}</TotalText>
            </TotalContainer>
            <ClearButton onClick={() => dispatch(clearCart())}>장바구니 초기화</ClearButton>
        </>

    )
}

export default RecordList

const ListContainer = styled.div`   
    box-sizing: border-box;
    width: 100%;
    padding: 5rem 15rem;
`

const TotalContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    padding: 1rem 0;
    margin: 0 15rem;
    border-top: 1px solid #5d3de9;

    justify-content: space-between;
`

const TotalText = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    color: #28204d;
`

const ClearButton = styled.button`
    border: 1px solid #e93d3d;
    border-radius: 3px;
    color: #e93d3d;
    padding: 0.5rem 1rem;
    margin: 1rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: #e93d3d;
        color: white;
    }
`
