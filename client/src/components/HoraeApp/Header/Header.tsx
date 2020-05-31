import React from 'react';
import styled from 'styled-components';

import DateDisplay from 'components/HoraeApp/Header/DateDisplay';

const StyledHeader = styled.div`
  padding-bottom: var(--spacing-xlarge);
`;

function Header() {
  return (
    <StyledHeader>
      <DateDisplay />
    </StyledHeader>
  );
}

export default Header;
