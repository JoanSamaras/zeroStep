import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colours } from 'design-system/colours';
import { Column, Row } from 'components/row-column';
import { spacings } from 'design-system/spacings';
import opinionMattersIcon from 'assets/opinionMattersIcon.jpg';
import { Text } from 'components/text';
import { fontWeights } from 'design-system/font-weights';
import { NotificationMessage } from 'components/notifications';
import { StylesProvider } from '@material-ui/core/styles';
import { InputAdornment, TextField } from '@material-ui/core';
import { ErrorMessage } from 'components/error-msg';
import { fontSizes } from 'design-system/font-sizes';
import { Dialogue } from 'components/dialogue';

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

const Header = styled( Text )<{ size: 'h2' | 'h3' }>`
    line-height: ${ p => p.size === 'h2' ? '3.5rem' : '2.5rem' };
`;

const HighlightedWord = styled( Text )`
    color: ${ colours.secondary5 };
    font-weight: ${ fontWeights.extraBold };
`;

const Input = styled( TextField )`
    margin-top: ${ spacings._10 };
    width: 100%;
`;

const Link = styled( Text )`
    font-size: ${ fontSizes.secondary };
    color: ${ colours.secondary5 };
    text-decoration: underline;

    :hover {
        color: ${ colours.secondary7 };
        cursor: pointer;
    }
`;

type Section1Props = {
    section2visible: boolean
    setSection2visible: ( v: boolean ) => void
}

export const Section1 = ( p: Section1Props ): JSX.Element => {
    const { section2visible, setSection2visible } = p;

    const [ inputUrlId, setInputUrlId ] = useState( 'outlined-url-input' );
    const [ inputUrl, setInputUrl ] = useState( '' );
    const [ errorMsg, setErrorMsg ] = useState( '' );
    const [ inputAsin, setInputAsin ] = useState( '' );
    const [ inputAsinId, setInputAsinId ] = useState( 'outlined-asin-input' );
    const [ errorMsgAsin, setErrorMsgAsin ] = useState( '' );

    const urlRegex  = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;

    useEffect( () => {
        const errorExists = inputUrl && errorMsg;
        const newId = errorExists ? 'standard-error' : 'outlined-basic';
        
        setInputUrlId( newId );

        if ( !errorExists ) {
            setErrorMsg( '' );
        }
    }, [ errorMsg, inputUrl ] );

    const validateInputUrl = (): void => {
        const isUrlValid = urlRegex.test( inputUrl );

        if ( !isUrlValid ) {
            setErrorMsg( 'Sorry, we didn\'t find product information at this URL.' );
        }
    }
    
    useEffect( () => {
        if ( inputUrl ) {
            const timer = setTimeout( () => validateInputUrl(), 1200 );

            return () => clearTimeout( timer );
        }
    }, [ inputUrl ] );

    useEffect( () => {
        const errorExists = inputAsin && errorMsgAsin;
        const newId = errorExists ? 'standard-error' : 'outlined-basic';
        
        setInputAsinId( newId );

        if ( !errorExists ) {
            setErrorMsgAsin( '' );
        }
    }, [ errorMsgAsin, inputAsin ] );

    const [ dialogueOpen, setDialogueOpen ] = useState( false );

    return (
        <Section1Wrapper section2visible={ section2visible }>
            <Row>
                <IconPlaceholder><img src={ opinionMattersIcon } /></IconPlaceholder>
            </Row>
            <Wrapper>
                <StylesProvider injectFirst>
                    <Column top='2.5em'>
                        <Row>
                            <Text colour='primary' weight='bold' size='h1'>2nd Step</Text>
                        </Row>
                        <Row top='2em' bottom={ spacings._7 }>
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
                        <Row 
                            top='3em' 
                            style={{ 
                                flexWrap: 'nowrap' 
                            }}
                        >
                            <Column grow>
                                <Row alignCenter>
                                    <Header colour='extraDark' weight='semiBold' size='h3'>
                                        Paste here the URL of the product you choose!
                                    </Header>
                                </Row>
                                <Row>
                                    <Input
                                        error={ !!errorMsg && !!inputUrl }
                                        id={ inputUrlId }
                                        label='URL goes here'
                                        variant='outlined'
                                        value={ inputUrl }
                                        onChange={ e => setInputUrl( e.target.value ) }
                                    />
                                    { errorMsg && (
                                        <ErrorMessage top='2.3rem' text={ errorMsg } />
                                    ) }  
                                </Row>
                            </Column>
                            { errorMsg && (
                                <Column left='4rem'>
                                    <Row alignCenter>
                                        <Header colour='extraDark' weight='semiBold' size='h3'>
                                            OR try to find manually the ASIN
                                        </Header>
                                    </Row>
                                    <Row>
                                        <Input
                                            error={ !!errorMsg && !!inputAsin }
                                            id={ inputAsinId }
                                            label='ASIN goes here'
                                            variant='outlined'
                                            value={ inputAsin }
                                            onChange={ e => setInputAsin( e.target.value ) }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <Link onClick={ () => setDialogueOpen( true ) }>see here</Link>
                                                        <Dialogue
                                                            open={ dialogueOpen }
                                                            handleClose={ () => setDialogueOpen( false ) }
                                                            title='Where should I look for the ASIN?'
                                                            mainContent='Let Google help apps determine location. This means sending anonymous location data to Google.'
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        { errorMsgAsin && (
                                            <ErrorMessage top='2.3rem' text={ errorMsgAsin } />
                                        ) }  
                                    </Row>
                                </Column>
                            ) }
                        </Row>
                        <Row grow />
                    </Column>
                </StylesProvider>
            </Wrapper>
        </Section1Wrapper>
    );
};
