import React from 'react';
import styled from 'styled-components';
import logo from 'assets/img/logo.png';

import Text from 'components/Common/Text';

const NavList = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 3rem;
  background-color: var(--color-bg-light);
`;

const Logo = styled.img`
  margin-right: auto;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    &::after {
      max-width: 100%;
    }
  }
  &::after {
    content: '';
    border-radius: 12px;
    display: block;
    transition: max-width 0.2s;
    height: 3px;
    background-color: var(--color-primary);
    max-width: 0;
  }
`;

function NavBar() {
  return (
    <nav>
      <NavList>
        <Logo src={logo} height="150" />
        <Text type="regular" margins={['small', 'base']}>
          <NavItem href="#">Home</NavItem>
        </Text>
        <Text type="regular" margins={['small', 'base']}>
          <NavItem href="#">About</NavItem>
        </Text>
        <Text type="regular" margins={['small', 'base']}>
          <NavItem href="#">Product</NavItem>
        </Text>
        <Text type="regular" margins={['small', 'base']}>
          <NavItem href="#">Login</NavItem>
        </Text>
      </NavList>
    </nav>
  );
}

export default NavBar;
