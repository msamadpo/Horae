import React from 'react';
import styled from 'styled-components';

import Text from 'components/Common/Text';

const StyledDate = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const DateMonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function DateDisplay() {
  const now = new Date();
  const day = now.toLocaleString('en-us', { weekday: 'long' }).substring(0, 3);
  const date = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' });
  return (
    <StyledDate>
      <DateMonthContainer>
        <Text
          type="heading1"
          weight="400"
          styleProp="line-height: 115%; !important"
        >
          {date}
        </Text>
        <Text
          type="heading2"
          weight="300"
          color="var(--color-text-subtitle)"
          styleProp="line-height: 115%; !important"
        >
          {month}
        </Text>
      </DateMonthContainer>
      <Text
        type="heading1"
        weight="300"
        size="8rem"
        margins={['none', 'none', 'none', 'base']}
      >
        {day}
      </Text>
    </StyledDate>
  );
}

export default DateDisplay;
