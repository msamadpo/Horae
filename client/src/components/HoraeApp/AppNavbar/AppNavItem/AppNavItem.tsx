import React, { useState } from 'react';
import styled from 'styled-components';

import Text from 'components/Common/Text';

const StyledAppItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 8rem;
  max-height: 8rem;
  min-width: 8rem;
  max-width: 8rem;
  ${(props) =>
    props.active
      ? 'background-color: var(--color-primary);'
      : 'background-color: var(--color-bg-nav-item);'}
  margin: var(--spacing-small);
  border-radius: 1rem;
  box-shadow: 0px 2px 16px 0px rgba(219, 219, 219, 0.2);
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 10px 16px 0px rgba(219, 219, 219, 1);
  }
`;

interface IAppNavItemProps {
  title: string;
  icon: string;
  active?: boolean;
}

function AppNavItem({ title, icon, active = false }: IAppNavItemProps) {
  return (
    <StyledAppItem active={active}>
      <img src={icon} height={20} alt="" />
      <Text
        size="1.2rem"
        color={active ? 'white' : 'var(--color-nav-item-text)'}
        margins={['tiny', 'none', 'none', 'none']}
      >
        {title}
      </Text>
    </StyledAppItem>
  );
}

export default AppNavItem;
