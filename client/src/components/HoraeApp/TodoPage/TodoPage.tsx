import React, { useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import TodoList from 'components/HoraeApp/TodoPage/TodoList/TodoList';
import TodoLists from 'components/HoraeApp/TodoPage/TodoLists/TodoLists';
import styled from 'styled-components';


const StyledButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledPopupBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledTodoListsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background color: #444
  font-family: var(--font-regular);
  text-align: center;
  border: none;
  outline: none;
  margin: var(--spacing-base);
  border-radius: 1rem;
  padding-left: 0.8rem;
  color: white;
  background: #666;
  min-width: 7.2rem;
  max-width: 7.2rem;
  min-height: 3.4rem;
  max-height: 3.4rem;
  cursor: pointer;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 5px 8px 0px rgba(219, 219, 219, 1);
  }
`;

function TodoPage() {
  const { data, dispatch } = useContext(GlobalContext);
  const tasks = data.todo_lists[0].tasks;
  const taskList = data.todo_lists[0];
  const [isOpen, setIsOpen] = useState<boolean>(false);  


  const addTask = () => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        taskListId: '123456789',
        task: {
          name: 'New Task',
          completed: false,
        },
      },
    });
  };

  const editTask = () => {
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        taskListId: '123456789',
        taskId: '343ERHFGIR4545',
        task: {
          name: 'Edited Spinach',
        },
      },
    });
  };

  const removeTask = () => {
    dispatch({
      type: 'REMOVE_TASK',
      payload: {
        taskListId: '123456789',
        taskId: '343ERHFGIR4545',
      },
    });
  };

  const toggleOpenMode = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div>
    //   Todo Page
    //   {/* <div>
    //     {tasks.map((task) => (
    //       <div>{task.name}</div>
    //     ))}
    //   </div> */}
    //   <TodoList {...taskList} />
    //   <div>
    //     <button onClick={addTask}>Add task</button>
    //     <button onClick={removeTask}>Remove task</button>
    //     <button onClick={editTask}>Edit task</button>
    //   </div>
    // </div>
    <div>
      {/* <TodoList {...taskList} /> */}
      <StyledButtonBox>
        <StyledTodoListsButton onClick={toggleOpenMode} > Todo List </StyledTodoListsButton>
          <StyledPopupBox>
            { isOpen && (<TodoLists {...taskList}/> )}
          </StyledPopupBox>
        </StyledButtonBox>
    </div>

  );
}

export default TodoPage;