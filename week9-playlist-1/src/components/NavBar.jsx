import styled from 'styled-components';
import { CartIcon } from '../mocks/icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { amount } = useSelector((store) => store.cart);

    return (
        <NavContainer>
            <Title>UMC PlayList</Title>
            <CartContainer>
                <CartIcon />
                <CartBadge>{amount}</CartBadge>
            </CartContainer>
        </NavContainer>
    );
}

export default Navbar;

const NavContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 5rem;
    background-color: #5d3de9;
    display: flex;
    align-items: center;
    padding: 0 15rem;
`

const Title = styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
`

const CartContainer = styled.div`
    margin-left: auto;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    color: white;
    cursor: pointer;
    position: relative;
`

const CartBadge = styled.div`
    width: 1rem;
    height: 1rem;
    background-color: red;
    border-radius: 50%;
    font-size: 0.7rem;
    color: white;
    font-weight: bold;
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
`