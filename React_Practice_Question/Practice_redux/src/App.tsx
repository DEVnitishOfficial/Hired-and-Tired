
import { useState } from 'react'
import { TodoList } from './features/TodoList/TodoList'
import { AddTodo } from './features/AddTodo/AddTodo'
import TodoContext from './features/context/TodoContext'


function App() {

  const [list, setList] = useState([
    {id : 1, todoData : "todo 1", isFinished : true},
    {id : 2, todoData : "todo 2", isFinished : false},
    {id : 3, todoData : "todo 3", isFinished : false}
  ])

  type value = {
    list : {
      id : number,
      todoData : string,
      isFinished : boolean
    }[],
    setList : (newList : {
      id : number,
      todoData : string,
      isFinished : boolean
    }[]) => void
  }

  return (
    <TodoContext.Provider value={{list, setList} as value }>
     <h1> Hello world in react/redux</h1>
     <AddTodo updateList={(todo) => setList([
      ...list,
      {
        id : list.length + 1,
        todoData : todo,
        isFinished : false
      }
     ])} />
    <TodoList />
    </TodoContext.Provider>
  )
}

export default App
