import { useState } from "react";

function Todo(){
    const [todoInput, setTodoInput]= useState("");
    const [todoArray, setTodoArray] = useState([]);
    const tryFocus = () => {
        if(todoInput=="")
        {
            document.getElementById("todoInput").focus();
        }
        else
        {
            setTodoInput("");
        }
        document.getElementById("todoInput").focus();
    }
    const AddTodo = (e) => {
        e.preventDefault();
        if(todoInput === "" || todoInput.match(/^ *$/))
        {
            console.log("only blank spaces added");
        }
        else {
            console.log(todoInput);
            setTodoArray(arr=>[todoInput,...arr]);
        }
        setTodoInput("");
        tryFocus();
    }
    const tryDelete = (ids) => {
        setTodoInput("");
        console.log(todoArray[ids]);
        todoArray.splice(ids,1);
        if(todoInput)
        {
            setTodoInput("");
        }
        setTodoInput(" ");
        if(todoInput)
        {
            setTodoInput("");
        }
        tryFocus();
    }
    const trySave = () => {
        console.log("saving",todoArray);
        if(localStorage.getItem('TodoList'))
        {
            localStorage.removeItem('TodoList');
        }
        localStorage.setItem("TodoList", JSON.stringify(todoArray));
        console.log("JSON save successful..");
    }
    const tryLoad = () => {
        console.log("loading");
        if(localStorage.getItem('TodoList'))
        {
            console.log(JSON.parse(localStorage.getItem("TodoList")));
            setTodoArray(JSON.parse(localStorage.getItem("TodoList")));
        }
        else {
            console.log("No data found");
        }
        tryFocus();
    }
    return(
        <div className="container">
            <form className="containerForm">
                <input id="todoInput" autoFocus autoComplete="off" value={todoInput} onChange={(e)=>{setTodoInput(e.target.value)}}
                placeholder="Input text to add to list" className="inputTodo" />
                <button onClick={AddTodo} className="addTodoButton">Add</button>
            </form>
            <div className="todoListContainer">
                {
                    todoArray?.map((elem,id) =>
                        <div className="list-container">
                            <div key={id}>
                                <h2 contentEditable="true" onKeyUp={(e)=>{todoArray[id] = e.target.innerHTML}} className="list-item">{elem}</h2>
                                <p>{id}</p>
                                <button className="list-deletebutton" onClick={()=>tryDelete(id)}>X</button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="function-buttons">
                <button className="saveButton" onClick={trySave}>Save</button>
                <button className="loadButton" onClick={tryLoad}>Load</button>
            </div>
        </div>
    )
}
export default Todo;