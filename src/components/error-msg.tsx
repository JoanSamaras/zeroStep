import React from 'react';
import styled from 'styled-components';
import { Column, Row } from 'components/row-column';
import { Text } from 'components/text';
import { colours } from 'design-system/colours';
import { spacings } from 'design-system/spacings';
import { WarningIcon } from 'assets/icons';
import { fontSizes } from 'design-system/font-sizes';
import { Margins } from 'helpers/css-utils';

const ImgPlaceholder = styled( Column )`
    height: ${ fontSizes.h2 };
`;

type Props = Margins & {
    text: string | JSX.Element
}

export const ErrorMessage = ( p: Props ): JSX.Element => {
    const { text, ...margins } = p;
    
    return (
        <Row { ...margins } alignCenter>
            <ImgPlaceholder right={ spacings._8 }><WarningIcon height='100%' colour={ colours.danger5 } /></ImgPlaceholder>
            { typeof text === 'string' 
                ? <Text colour='danger' size='primary' weight='semiBold'>{ text }</Text>
                : text
            }
        </Row>
    )
};
