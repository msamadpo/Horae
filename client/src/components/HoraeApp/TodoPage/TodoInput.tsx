import React, { useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';


export default function TodoForm() {
  const { dispatch } = useContext(GlobalContext);


  // Creating a local state to have currently writing
  // todo item that will be sent to the global store.

  
  return (
    <form>
      <input type="text" placeholder="Enter new todo"/>
      <button type="submit" > Add Todo </button>
    </form>
  );
};
