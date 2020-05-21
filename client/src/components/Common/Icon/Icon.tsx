import React from 'react';
import whiteTodo from 'assets/img/todo-icon-white.svg';
import defaultTodo from 'assets/img/todo-icon.svg';
import whiteCalendar from 'assets/img/calendar-icon-white.svg';
import defaultCalendar from 'assets/img/calendar-icon.svg';
import whiteAvatar from 'assets/img/user-icon-white.svg';
import defaultAvatar from 'assets/img/user-icon.svg';

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
    default:
      return <img src={defaultTodo} alt="" height={height} />;
  }
}

export default Icon;
