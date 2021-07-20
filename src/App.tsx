import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";



const tasks=[
    {id:1,title:'HTML&CSS',isDone:true},
    {id:2,title:'JS',isDone:true},
    {id:3,title:'React',isDone:true},
]

const tasks2=[
    {id:1,title:'HTML&CSS222222',isDone:true},
    {id:2,title:'JS222222',isDone:true},
    {id:3,title:'React222222',isDone:true},
]


function App() {
    return (
        <div className="App">
            <Todolist tasks={tasks}/>
            <Todolist title={"What to learn222222"} tasks={tasks2}/>
        </div>
    );
}

export default App;