import React from 'react';
import styled from 'styled-components';

import Text from 'components/Common/Text';

const StyledHeader = styled.div`
  padding-bottom: var(--spacing-xlarge);
`;

function Header() {
  return (
    <StyledHeader>
      <Text type="heading1" weight="300" size="5rem">
        {new Date().toDateString()}
      </Text>
    </StyledHeader>
  );
}

export default Header;
