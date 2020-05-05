import React from 'react';
import styled from 'styled-components';

import calendar from 'assets/img/calendar.svg';

import Text from 'components/Common/Text';

const StyledHero = styled.div`
  background-color: var(--color-bg-light);
`;

const Container = styled.div`
  max-width: 136rem;
  padding: 4rem 8rem 8rem;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-column-gap: var(--spacing-large);
`;

const StyledHeroText = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroButton = styled.button`
  flex-grow: 0;
  align-self: start;
  padding: 1rem 2rem;
  background-color: var(--color-primary);
  border: 0;
  border-radius: 4rem;
  outline: none;
  cursor: pointer;
  margin-bottom: var(--spacing-xlarge);
  box-shadow: 6px 6px 11px #d9d9d9, -6px -6px 11px var(--color-white);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translate(2px, 0px);
  }
`;

function Hero() {
  return (
    <StyledHero>
      <Container>
        <StyledHeroText>
          <Text
            type="heading1"
            weight="600"
            margins={['xlarge', 'none', 'large', 'none']}
            size="8rem"
          >
            Horae
          </Text>
          <Text type="heading2">Maximizing your productivity</Text>
          <Text
            type="regular"
            color="var(--color-text-paragraph)"
            margins={['tiny', 'none', 'large']}
            styleProp="max-width: 34ch; margin-left: 4px;"
          >
            By getting started, you already took the first step in your journey
            to personal productivity and self-organization. Let Horae be your
            guide along the way.
          </Text>
          <HeroButton>
            <Text type="small" color="var(--color-white)" weight="400">
              Learn More
            </Text>
          </HeroButton>
        </StyledHeroText>
        <img src={calendar} alt="calendar" />
      </Container>
    </StyledHero>
  );
}

export default Hero;
