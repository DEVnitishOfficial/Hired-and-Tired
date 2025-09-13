import { useState } from "react"


export function AddTodo({ updateList }: { updateList: (text: string) => void }) {

    const [inputText, setInputText] = useState('')

    return(
        <>
        
        <div>
            <input 
            type="text" 
            placeholder="Add a todo"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
             />
            <button onClick={() => {
                updateList(inputText)
                setInputText('')
                }}>Add todo</button>
        </div>
        
        </>
    )
}