import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value : 0
}

const counterSlice = createSlice({
    name : 'counter',
    initialState,
    reducers:{
        increment : (state) => {
            state.value += 1;
        },
        decrement : (state) => {
            state.value -= 1;
        },
        reset : (state) => {
            state.value = 0;
        }
    }
});

console.log('counterslice', counterSlice);

export const{increment, decrement, reset} = counterSlice.actions;

export default counterSlice.reducer

































// import { createSlice } from "@reduxjs/toolkit";

// export interface CounterState {
//   value: number
// }

// const initialState : CounterState = {
//     value : 0
// }


// export const counterSlice = createSlice({
//     name : 'counter',
//     initialState,
//     reducers : {
//         increment : (state) => {
//             state.value += 1;
//         },
//         decrement : (state) => {
//             state.value -=1;
//         },
//         reset : (state) => {
//             state.value = 0
//         }
//     }
// }) 

// console.log('see my counter slice',counterSlice)

// export const {increment, decrement, reset} = counterSlice.actions;

// export default counterSlice.reducer