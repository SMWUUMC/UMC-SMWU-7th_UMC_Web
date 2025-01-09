import styled from "styled-components";
import { ChevronDown, ChevronUp } from "../mocks/icons";
import { useDispatch } from "react-redux";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";

const Record = ({ id, title, singer, price, img, amount }) => {
    const dispatch = useDispatch();

    return (
        <RecordContainer>
            <Thumbnail src={img} alt="thumbnail" />
            <TextContainer>
                <Title>{title} | {singer}</Title>
                <Price>&#8361; {price}</Price>
            </TextContainer>
            <QuantityContainer>
                <QuantityButton onClick={() => dispatch(increase(id))}>
                    <ChevronUp />
                </QuantityButton>
                <div>{amount}</div>
                <QuantityButton onClick={() => {
                    if (amount === 1) {
                        dispatch(removeItem(id))
                    }
                    else {
                        dispatch(decrease(id))
                    }
                }}>
                    <ChevronDown />
                </QuantityButton>
            </QuantityContainer>
        </RecordContainer>
    );
}

export default Record;

const RecordContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    padding: 1rem 0;
    align-items: center;
`

const Thumbnail = styled.img`
    width: 5rem;
    height: 5rem;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`

const Title = styled.div`
    font-size: 1rem;
`

const Price = styled.div`
    font-size: 1rem;
    color: gray;
    text-align: start;
`

const QuantityContainer = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: column;
`

const QuantityButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0.5rem;
    color: #5d3de9;
    font-size: 1.5rem;
    height: 2rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`