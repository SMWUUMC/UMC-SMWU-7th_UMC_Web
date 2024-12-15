import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal } from './features/cart/cartSlice'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import RecordList from './components/RecordList'
import './App.css'
import { useEffect } from 'react'

function App() {
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart.cartItems)

    useEffect(() => {
        dispatch(calculateTotal())
    }, [{cartItems}, dispatch])

    return (
        <>
            <Navbar>
            </Navbar>
            <RecordList />
            <Footer></Footer>
        </>
    )
}

export default App
