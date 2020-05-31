import React from 'react';
import styled from 'styled-components';
import styles from 'components/Common/Text/Text.module.scss';

type TextWeight = '300' | '400' | '500' | '600' | '700';
type TextMargin = 'none' | 'tiny' | 'small' | 'base' | 'large' | 'xlarge';
type TextType =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'large'
  | 'regular'
  | 'small';

interface ITextProps {
  type?: TextType;
  size?: string;
  weight?: TextWeight;
  color?: string;
  margins?: TextMargin[];
  styleProp?: string;
  children: React.ReactNode;
}

function Text({
  children,
  type,
  size,
  weight,
  color,
  margins,
  styleProp,
}: ITextProps) {
  const mappedMargins =
    (margins?.length === 1
      ? new Array(4).fill(`var(--spacing-${margins[0]})`).join(' ')
      : margins?.map((margin) => `var(--spacing-${margin})`).join(' ')) || '';

  const CustomText = styled.span`
    display: inline-block;
    ${size && `font-size: ${size};`}
    ${weight && `font-weight: ${weight};`}
    ${color && `color: ${color};`}
    ${margins && `margin: ${mappedMargins};`}
    line-height: 140%;
    ${styleProp && styleProp}
  `;

  return <CustomText className={type && styles[type]}>{children}</CustomText>;
}

export default Text;
