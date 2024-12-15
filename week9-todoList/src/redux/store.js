import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './toDoSlice';

export default configureStore({
    reducer: {
        todo: todoSlice
    }
});