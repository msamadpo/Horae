import React from 'react';
import styled from 'styled-components';

import AppNavItem from 'components/HoraeApp/AppNavbar/AppNavItem';

const StyledNavbar = styled.nav`
  background-color: var(--color-bg-nav);
  padding: var(--spacing-base);
  min-height: 100vh;
  box-sizing: border-box;
  max-width: 16rem;
`;

type AppNavItem = {
  title: string;
  icon: string;
  active?: boolean;
};

interface IAppNavbarProps {
  items: AppNavItem[];
}

function AppNavbar({ items }: IAppNavbarProps) {
  return (
    <StyledNavbar>
      {items.map((item) => (
        <AppNavItem {...item} />
      ))}
    </StyledNavbar>
  );
}

export default AppNavbar;
