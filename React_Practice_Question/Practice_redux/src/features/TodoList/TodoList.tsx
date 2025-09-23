import { useContext } from "react"
import { Todo } from "../Todo/Todo"
import TodoContext from "../context/TodoContext"

export type TodoItem = {
    id : number,
    todoData : string,
    isFinished : boolean
}

export function TodoList() {

    const {list, setList} = useContext(TodoContext)

    return(
        <div>
            {list.map((todo: TodoItem) => (
                <Todo 
                key={todo.id} 
                todoData={todo.todoData} 
                isFinished={todo.isFinished}
                changeFinished = {(isFinished : boolean) : void => {
                    const updatedList = list.map((t) => {
                        if(t.id == todo.id){
                            t.isFinished = isFinished
                        }
                        return t
                    })
                    setList(updatedList)
                }}
                onDelete={() => {
                    const updatedList = list.filter((t) => t.id != todo.id)
                    setList(updatedList);
                }}
                onEdit={(todoData) => {
                    const updatedList = list.map((t) => {
                        if(t.id == todo.id){
                            t.todoData = todoData
                        }
                        return t
                    })
                    setList(updatedList)
                }}
                />
            ))}
        </div>
    )
}