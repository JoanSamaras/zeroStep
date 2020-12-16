import React, { useState } from 'react';
import { Column, Row } from 'components/row-column';
import styled from 'styled-components';
import { colours } from 'design-system/colours';
import { borderSizes } from 'design-system/border-sizes';
import { spacings } from 'design-system/spacings';
import { Text } from 'components/text';

export const Wrapper = styled( Row )`
    width: 55vw;
    align-self: center;
    flex-grow: 1;
    padding: ${ spacings._8 };
`;

export const Header = styled( Text )<{ size: 'h2' | 'h3' }>`
    line-height: ${ p => p.size === 'h2' ? '3.5rem' : '2.5rem' };
`;