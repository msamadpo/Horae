import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';

import styles from 'components/HoraeApp/TodoPage/TodoItem.module.scss';


interface ITodoListItemProps {
  name: string;
  completed:boolean;
}


const StyledTodoItemBox = styled.div`
   position: relative;
   font:var(--font-regular);
   min-height: 3rem;
   max-height: 3rem;
   min-width: 45rem;
   max-width: 45rem;
   background-color: var(--color-text-paragraph);
   margin: var(--spacing-small);
   border-radius: 1rem;
   box-shadow: 0px 2px 16px 0px rgba(219, 219, 219, 0.2);
   transition: all 0.2s;
   border-left: 2px solid red;
 `;

 const StyledTodoItemText = styled.div`
   padding-left: 10px;
   padding-top: 1px;
   float:left;
 `;

 const Button = styled.button`
  float:right;
  margin-top: 5px;
  margin-right: 15px;
  background-color: var(--color-text-paragraph);
  border: 1.5px solid var(--color-primary);
  border-radius: 100%;
  height:20px; 
  width:20px; 
  cursor:pointer;
`;

const Input = styled.input`
  float:right;
  height:15px; 
  width:15px; 
  margin-right: 15px;
  margin-top: 0.7rem;
  cursor: pointer;
`;





function TodoItem({ name, completed }: ITodoListItemProps) {
    return (
            <StyledTodoItemBox> 
                <label style={{ textDecoration: completed ? 'line-through' : undefined }} >
                  <Input type="checkbox" checked={completed}></Input> {name}
                </label>
            </StyledTodoItemBox> 
    )
}

export default TodoItem;