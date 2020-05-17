import React, { useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';


export default function TodoForm() {
  const { dispatch } = useContext(GlobalContext);


  function handleTodoAdd() {
    dispatch({ type: "ADD_TASK", payload: {id:'',name:'test',deadline:'',completed:false} });
  }

  // Creating a local state to have currently writing
  // todo item that will be sent to the global store.

  
  return (
    <form>
      <input type="text" placeholder="Enter new todo"/>
      <button type="submit" onClick={()=>dispatch({ type: "ADD_TASK", payload: {id:'ese',name:'test',deadline:'',completed:false} })}> Add Todo </button>
    </form>
  );
};
