import React, { useState } from 'react';
import styled from 'styled-components';
import { colours } from 'design-system/colours';
import { Column, Row } from 'components/row-column';
import { spacings } from 'design-system/spacings';
import opinionMattersIcon from 'assets/opinionMattersIcon.jpg';
import { Text } from 'components/text';
import { fontWeights } from 'design-system/font-weights';
import { NotificationMessage } from 'components/notifications';

const Wrapper = styled( Row )`
    width: 55vw;
    align-self: center;
    flex-grow: 1;
    padding: ${ spacings._8 };
`;

const Section1Wrapper = styled( Column )<{ section2visible: boolean }>`
    width: 100vw;
    height: ${ p => p.section2visible ? '90vh' : '100vh' };
    background-color: ${ colours.grey3 };
`;

const IconPlaceholder = styled.div`
    background-color: ${ colours.primary5 };
    padding: ${ spacings._5 } ${ spacings._10 };
    display: flex;
    align-items: center;
    margin-left: 10vw;
`;

const HeaderH2 = styled( Text )`
    line-height: 3.5rem;
`;

const HighlightedWord = styled( Text )`
    color: #0743ff;
    font-weight: ${ fontWeights.extraBold };
`;

type Section1Props = {
    section2visible: boolean
    setSection2visible: ( v: boolean ) => void
}

const Section1 = ( p: Section1Props ): JSX.Element => {
    const { section2visible, setSection2visible } = p;

    return (
        <Section1Wrapper section2visible={ section2visible }>
            <Row>
                <IconPlaceholder><img src={ opinionMattersIcon } /></IconPlaceholder>
            </Row>
            <Wrapper>
                <Column top='2.5em'>
                    <Row grow>
                        <Text colour='primary' weight='bold' size='h1'>2nd Step</Text>
                    </Row>
                    <Row bottom={ spacings._8 }>
                        <HeaderH2 colour='extraDark' weight='bold' size='h2'>
                            Go to Amazon.com and search the word
                            <HighlightedWord size='h2'>&nbsp; sleep aid &nbsp;</HighlightedWord>
                            & pick the product that is most appealing to you.
                        </HeaderH2>
                    </Row>
                    <NotificationMessage
                        text='As this is for market research, please do not select our brand.'
                        colourProfile='warning'
                    />
                </Column>
            </Wrapper>
        </Section1Wrapper>
    );
};

export const Step2 = (): JSX.Element => {
    const [ section2visible, setSection2visible ] = useState( false );

    return (
        <Column>
            <Section1 
                section2visible={ section2visible }
                setSection2visible={ setSection2visible }
            />
        </Column>
    );
};
