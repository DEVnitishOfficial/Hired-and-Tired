import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";

export function Counter(){
    const dispatch = useDispatch()
    const count = useSelector((state) => state.counter.value)
  return(
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>
          increment
        </button>
        {count}
        <button onClick={() => dispatch(decrement())}>
          decrement
        </button>
      </div>
    </div>
  )
}




































// import {useDispatch, useSelector } from "react-redux"
// import { increment, decrement, reset } from "./counterSlice"
// import type { RootState } from "../../app/store"


// export function Counter(){

//   const count = useSelector((state:RootState) => state.counter.value)
//   const dispatch = useDispatch()

//     return(
//     <div>
//       <div>
//         <button
//           aria-label="Increment value"
//           onClick={() => dispatch(increment())}
//         >
//           Increment
//         </button>
//         <span>{count}</span>
//         <button
//           aria-label="Decrement value"
//           onClick={() => dispatch(decrement())}
//         >
//           Decrement
//         </button>

//         <button onClick={() => dispatch(reset())}>
//           Reset
//         </button>

//       </div>
//     </div>
//     )
// }