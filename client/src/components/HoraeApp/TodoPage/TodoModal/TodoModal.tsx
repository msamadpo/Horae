import React, { useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';

import styled from 'styled-components';

interface ITodoModalProps {
  closeModal: () => void;
}

const StyledTodoList = styled.div`  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50rem;
  max-width: 50rem;
  min-height: 30rem;
  max-height: 30rem;
  border-radius: 1rem;
  margin: var(--spacing-small);
  padding: var(--spacing-small);
`;

const SytledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-text-body);
  min-width: 45rem;
  max-width: 45rem;
  min-height: relative;
  max-height: relative;
  border-radius: 1rem;
  margin: var(--spacing-small);
  padding: var(--spacing-tiny);
`;

const StyledTodoListNameInput = styled.input`
  color: var(--color-primary);
  &::placeholder {
    color: var(--color-primary-1);
  }
  align-items: center;
  border-radius: 1rem;
  outline: none;
  border: none;
  padding-left: 0.8rem;
  font-size: 3rem;
  font-family: var(--font-large);
  margin: var(--spacing-small);
`;

//  opacity: 0;
const StyledTodoListColorInput = styled.input`
background: var(--color-text-body);
outline: none;
border: none;
margin: var(--spacing-small);
min-width: 5rem;
max-width: 5rem;
min-height: 3rem;
max-height: 3rem;
cursor: pointer;
`;


// This is for trying to get the color-picker to be a circle
const StyledColorInputBox = styled.div<{ todoListColor: string }>`
  background: ${props => props.todoListColor}; 
  background: white;
  outline: none;
  border: none;
  margin: var(--spacing-small);
  min-width: 4rem;
  max-width: 4rem;
  min-height: 4rem;
  max-height: 4rem;
  border-radius: 40%;
  cursor: pointer;
`

const StyledTodoListSubmitInput = styled.input`
  align-items: center;
  min-width: 9rem;
  max-width: 9rem;
  min-height: 4.4rem;
  max-height: 4.4rem;
  border-radius: 1rem;
  font-size: 2.5rem;
  font-family: var(--font-regular);
  margin: var(--spacing-small);
  background: var(--color-bg-light);
  color: var(--color-text-body);
  border: 0.2rem solid var(--color-bg-light);
  outline: none;
  cursor: pointer;
  &:hover {
    background: var(--color-text-body);
    color: var(--color-bg-light);
    border: 0.2rem solid var(--color-bg-light);
  }
`;

const StyledColors = styled.div`
  color: var(--color-primary-1);
  display: inline-box;
  align-items: center;
  margin: var(--spacing-tiny);
  min-width: 4rem;
  max-width: 4rem;
  min-height: 4rem;
  max-height: 4rem;
  border-radius: 50%;
  border: 1px solid var(--color-nav-item-text);
  cursor: pointer;
  &:hover {
    color: var(--color-bg-light);
    text-decoration: underline;
  }
`;

function TodoModal({ closeModal }: ITodoModalProps) {
  const { dispatch } = useContext(GlobalContext);
  const [todoListName, setTodoListName] = useState<string>('');
  const [todoListColor, setTodoListColor] = useState<string>('#ff5a5f');
  

  const addTaskList = (listTitle: string, color: string) => {
    dispatch({
      type: 'ADD_TASK_LIST',
      payload: {
        taskList: {
          title: listTitle,
          tasks: [],
          settings: {
            color: color,
          },
        },
      },
    });
  };

  const handleChangeName = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setTodoListName(event.currentTarget.value);
  };

  const saveForm = () => {
    if (todoListName !== '') {
      addTaskList(todoListName, todoListColor);
      closeModal();
    }
  };

  const handleColorChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setTodoListColor(event.currentTarget.value);
  };

  return (
    <StyledTodoList
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
        <SytledForm
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div>
            <StyledTodoListNameInput
              type="text"
              placeholder="Todo list name"
              value={todoListName}
              onChange={handleChangeName}
              required={true}
            />
            {/* To customize the color-picker, you need to wrap input tag in a label 
                then set the input to hidden. Then you change the label to the color-picker
                but I could not get it working */}
            {/* <StyledColorInputBox todoListColor={todoListColor}> */}
            <StyledTodoListColorInput
              type="color"
              onChange={handleColorChange} 
              value={todoListColor}

            />              
            {/* <StyledColorInputBox todoListColor={todoListColor}/> */}
            {/* </StyledColorInputBox> */}
          </div> 
          <div>
            <StyledColors onClick={() => setTodoListColor('#ff5a5f')} style={{backgroundColor: '#ff5a5f'}}/>
            <StyledColors onClick={() => setTodoListColor('#ff7777')} style={{backgroundColor: '#ff7777'}}/> 
            <StyledColors onClick={() => setTodoListColor('#aed8a2')} style={{backgroundColor: '#aed8a2'}}/>
            <StyledColors onClick={() => setTodoListColor('#7cd7ee')} style={{backgroundColor: '#7cd7ee'}}/>
          </div>
          <div>
            <StyledColors onClick={() => setTodoListColor('#ffcc79')} style={{backgroundColor: '#ffcc79'}}/>
            <StyledColors onClick={() => setTodoListColor('#c879ff')} style={{backgroundColor: '#c879ff'}}/>
            <StyledColors onClick={() => setTodoListColor('#edb0d3')} style={{backgroundColor: '#edb0d3'}}/>
            <StyledColors onClick={() => setTodoListColor('#a4dfdb')} style={{backgroundColor: '#a4dfdb'}}/>
          </div>
          <div>
            <StyledTodoListSubmitInput type="submit" value="Save" onClick={saveForm} />
            <StyledTodoListSubmitInput type="submit" value="Close" onClick={closeModal} />
          </div> 
        </SytledForm>
    </StyledTodoList>
  );
}

export default TodoModal;
