import React from 'react';
import whiteTodo from 'assets/img/todo-icon-white.svg';
import defaultTodo from 'assets/img/todo-icon.svg';
import whiteCalendar from 'assets/img/calendar-icon-white.svg';
import defaultCalendar from 'assets/img/calendar-icon.svg';
import whiteAvatar from 'assets/img/user-icon-white.svg';
import defaultAvatar from 'assets/img/user-icon.svg';
import trashcan from 'assets/img/trash-can.svg';
import edit from 'assets/img/edit-pen.svg';


interface IIconProps {
  type: string;
  height: number;
  white?: boolean;
}

function Icon({ type, height, white = false }: IIconProps) {
  switch (type) {
    case 'calendar':
      return (
        <img
          src={white ? whiteCalendar : defaultCalendar}
          height={height}
          alt=""
        />
      );
    case 'todo':
      return (
        <img src={white ? whiteTodo : defaultTodo} height={height} alt="" />
      );
    case 'avatar':
      return (
        <img src={white ? whiteAvatar : defaultAvatar} height={height} alt="" />
      );
    case 'trash':
      return (
        <img src={trashcan} height={height} alt="" />
      );
    case 'edit':
      return (
        <img src={edit} height={height} alt="" />
      );
    default:
      return <img src={defaultTodo} alt="" height={height} />;
  }
}

export default Icon;
