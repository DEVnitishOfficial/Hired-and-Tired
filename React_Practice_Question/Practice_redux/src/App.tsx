
import { useState } from 'react'
import { TodoList } from './features/TodoList/TodoList'
import { AddTodo } from './features/AddTodo/AddTodo'


function App() {

  const [list, setList] = useState([
    {id : 1, todoData : "todo 1", isFinished : true},
    {id : 2, todoData : "todo 2", isFinished : false},
    {id : 3, todoData : "todo 3", isFinished : false}
  ])

  return (
    <>
     <h1> Hello world in react/redux</h1>

     <TodoList myList={list} mySetList={setList} />
     <AddTodo updateList={(todo) => setList([
      ...list,
      {
        id : list.length + 1,
        todoData : todo,
        isFinished : false
      }
     ])} />
    </>
  )
}

export default App
