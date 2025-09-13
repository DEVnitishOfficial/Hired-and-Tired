import { Todo } from "../Todo/Todo"

export type TodoItem = {
    id : number,
    todoData : string,
    isFinished : boolean
}

type Props = {
    myList: TodoItem[]
    mySetList: (newList: TodoItem[]) => void
}

export function TodoList({ myList, mySetList }: Props) {

    return(
        <div>
            {myList.map((todo: TodoItem) => (
                <Todo 
                key={todo.id} 
                todoData={todo.todoData} 
                isFinished={todo.isFinished}
                changeFinished = {(isFinished : boolean) : void => {
                    const updatedList = myList.map((t) => {
                        if(t.id == todo.id){
                            t.isFinished = isFinished
                        }
                        return t
                    })
                    mySetList(updatedList)
                }}
                onDelete={() => {
                    const updatedList = myList.filter((t) => t.id != todo.id)
                    mySetList(updatedList);
                }}
                onEdit={(todoData) => {
                    const updatedList = myList.map((t) => {
                        if(t.id == todo.id){
                            t.todoData = todoData
                        }
                        return t
                    })
                    mySetList(updatedList)
                }}
                />
            ))}
        </div>
    )
}