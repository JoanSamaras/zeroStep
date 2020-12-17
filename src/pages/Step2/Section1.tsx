import React from 'react';
import styled from 'styled-components';
import { colours } from 'design-system/colours';
import { Column, Row } from 'components/row-column';
import { spacings } from 'design-system/spacings';
import opinionMattersIcon from 'assets/opinionMattersIcon.jpg';
import { Text } from 'components/text';
import { fontWeights } from 'design-system/font-weights';
import { NotificationMessage } from 'components/notifications';
import { StylesProvider } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

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

const Header = styled( Text )`
    line-height: 3.5rem;
`;

const HighlightedWord = styled( Text )`
    color: #0743ff;
    font-weight: ${ fontWeights.extraBold };
`;

const Input = styled( TextField )`
    margin-top: ${ spacings._3 };
    width: 100%;
`;

type Section1Props = {
    section2visible: boolean
    setSection2visible: ( v: boolean ) => void
}

export const Section1 = ( p: Section1Props ): JSX.Element => {
    const { section2visible, setSection2visible } = p;

    return (
        <Section1Wrapper section2visible={ section2visible }>
            <Row>
                <IconPlaceholder><img src={ opinionMattersIcon } /></IconPlaceholder>
            </Row>
            <Wrapper>
                <StylesProvider injectFirst>
                    <Column top='2.5em'>
                        <Row grow>
                            <Text colour='primary' weight='bold' size='h1'>2nd Step</Text>
                        </Row>
                        <Row bottom={ spacings._7 }>
                            <Header colour='extraDark' weight='bold' size='h2'>
                                Go to Amazon.com and search the word
                                <HighlightedWord size='h2'>&nbsp; sleep aid &nbsp;</HighlightedWord>
                                & pick the product that is most appealing to you.
                            </Header>
                        </Row>
                        <NotificationMessage
                            text='As this is for market research, please do not select our brand.'
                            colourProfile='warning'
                        />
                        <Row top='4em'>
                            <Column grow>
                                <Row alignCenter>
                                    <Header colour='extraDark' weight='semiBold' size='h3'>
                                        Paste here the URL of the product you choose!
                                    </Header>
                                </Row>
                                <Row>
                                    <Input
                                        id="outlined-url-input"
                                        label="URL goes here"
                                        variant="outlined"
                                    />  
                                </Row>
                            </Column>
                        </Row>
                    </Column>
                </StylesProvider>
            </Wrapper>
        </Section1Wrapper>
    );
};
