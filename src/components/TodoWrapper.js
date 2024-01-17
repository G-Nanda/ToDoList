import React,{useState} from 'react'
import { TodoForm } from './TodoForm'
import {v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();


export const TodoWrapper = () => {
  const[todos,setTodos]=useState([])
  // const addTodo=todo=>{
  //   setTodos([...todos,{id:uuidv4(),task:todo ,completed:false ,isEditing:false}])
  //   console.log(todos)
  // }

  const addTodo = (todo) => {
    // Check if the input is empty
    if (todo.trim() === '') {
      // Optionally, you can show an alert or perform any other action to notify the user about the empty input.
      console.log('Input cannot be empty');
      return; // Exit the function early if the input is empty
    }
    
    // Add the todo only if it's not empty
    setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
  };

  const toggleComplete= id=> {
    setTodos(todos.map(todo => todo.id === id ? {...todo,completed : !todo.completed}:todo))
  }

  const deleteTodo= id =>{
    setTodos(todos.filter(todo=> todo.id!== id))
  }

  const editTodo=id =>{
    setTodos(todos.map(todo=>todo.id=== id ? {...todo,isEditing:!todo.isEditing} : todo))
  }

  const editTask=(task,id)=>{
    setTodos(todos.map(todo=> todo.id === id ?{...todo , task , isEditing:!todo.isEditing}:todo))
  }
  
  return (
    <div className='TodoWrapper'>
      <h1>Tasks to be accomplished</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo,index)=>(
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask}task={todo}/>
        ):
        (<Todo task={todo} key={index} 
          toggleComplete={toggleComplete} 
  
          deleteTodo={deleteTodo}
  
          editTodo={editTodo}
        
          />)
      ))}
      
    </div>
  )
}

