import { configureStore, } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice'


export const store = configureStore({
    reducer:{
        counter : counterReducer
    }
});

console.log('store>>>>>', store);

































// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice'

// export const store = configureStore({
//     reducer : {
//         counter : counterReducer
//     }
// })
// console.log('state>>>>',store.dispatch)

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

