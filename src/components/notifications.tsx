import React from 'react';
import styled, { css } from 'styled-components';
import { Column, Row } from 'components/row-column';
import { Text } from 'components/text';
import { colours } from 'design-system/colours';
import { spacings } from 'design-system/spacings';
import { Dictionary } from 'helpers/types';
import { StopCircleIcon, WarningIcon } from 'assets/icons';
import { fontSizes } from 'design-system/font-sizes';

const BGWrapper = styled( Column )<{ colourProfile: 'error' | 'info' | 'warning' }>`
    background-color: ${ p => {
        if ( p.colourProfile === 'error' ) {
            return colours.danger2
        } else if ( p.colourProfile === 'warning' ) {
            return colours.warning2
        } else {
            return colours.info2
        }
    } };
    border-radius: 3em;
    padding: ${ spacings._4 };
    width: 100%;
`;

const PaddedDiv = styled( Row )`
    padding: ${ spacings._5 } ${ spacings._7 };
`;

const imgMap: Dictionary<JSX.Element> = {
    error: <StopCircleIcon height='100%' />,
    warning: <WarningIcon height='100%' colour={ colours.primary5 } />
}

const ImgPlaceholder = styled( Column )`
    height: ${ fontSizes.h2 };
`;

type Props = {
    text: string | JSX.Element
    colourProfile: 'error' | 'warning' | 'info'
}

export const NotificationMessage = ( p: Props ): JSX.Element => {
    const { text } = p;
    
    return (
        <Row>
            <BGWrapper colourProfile={ p.colourProfile }>
                <PaddedDiv alignCenter>
                    <ImgPlaceholder right={ spacings._8 }>{ imgMap[ p.colourProfile ] }</ImgPlaceholder>
                    { typeof text === 'string' 
                        ? <Text colour='dark' size='primary' weight='bold'>{ text }</Text>
                        : text
                    }
                </PaddedDiv>
            </BGWrapper>
        </Row>
    )
};
