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
import { ArrowDownOutlinedIcon, CheckCircleIcon } from 'assets/icons';
import { Header, Wrapper } from './common-styles';

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

const ProductIconPlaceholder = styled.div`
    min-width: 4em; 
    max-width: 6em; 
    min-height: 4em; 
    max-height: 6em; 
    display: flex;

    & img {
        width: 100%;
    }
`;

type Section1Props = {
    productExists: boolean
    setProductExists: ( v: boolean ) => void
}

export const Section1 = ( p: Section1Props ): JSX.Element => {
    const { productExists, setProductExists } = p;

    const [ inputUrlId, setInputUrlId ] = useState( 'outlined-url-input' );
    const [ inputUrl, setInputUrl ] = useState( '' );
    const [ errorMsg, setErrorMsg ] = useState( '' );

    const [ inputAsin, setInputAsin ] = useState( '' );
    const [ inputAsinId, setInputAsinId ] = useState( 'outlined-asin-input' );
    const [ errorMsgAsin, setErrorMsgAsin ] = useState( '' );

    const urlRegex  = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/;

    useEffect( () => {
        const errorExists = inputUrl && errorMsg;
        const newId = errorExists ? 'standard-error' : 'outlined-basic';
        
        setInputUrlId( newId );

        if ( !errorExists ) {
            setErrorMsg( '' );
        }

        if ( !inputUrl ) {
            setProductExists( false );
        }
    }, [ errorMsg, inputUrl ] );

    const validateInputUrl = (): void => {
        const isUrlValid = urlRegex.test( inputUrl );

        console.log( isUrlValid );

        if ( !isUrlValid ) {
            setErrorMsg( 'Sorry, we didn\'t find product information at this URL.' );
            setInputAsin( '' )
            setProductExists( false );
        } else {
            setErrorMsg( '' );
            setProductExists( true );
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

    const validateInputAsin = (): void => {
        const isAsinValid = false;

        if ( !isAsinValid ) {
            setErrorMsgAsin( 'Sorry, we didn\'t find product information. Try again.' );
            setProductExists( false );
        } else {
            setProductExists( true );
        }
    }
    
    useEffect( () => {
        if ( inputAsin ) {
            const timer = setTimeout( () => validateInputAsin(), 1200 );

            return () => clearTimeout( timer );
        }
    }, [ inputAsin ] );

    return (
        <Section1Wrapper section2visible={ productExists }>
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
                                { productExists && !errorMsg && (
                                    <Row top='3rem'>
                                        <Column right={ spacings._2 }>
                                            <ProductIconPlaceholder><img src={ 'https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg?itok=EbJB9ky5' } /></ProductIconPlaceholder>
                                        </Column>
                                        <Column>
                                            <Row alignCenter>
                                                <Column right={ spacings._4 }><CheckCircleIcon height='4rem' /></Column>
                                                <Column>
                                                    <Text colour='dark' size='secondary' bottom={ spacings._2 }>
                                                        Lorem Ipsum
                                                    </Text>
                                                    <Text colour='success' size='primary' weight='semiBold'>
                                                        This is a valid product!
                                                    </Text>
                                                </Column>
                                            </Row>
                                        </Column>
                                    </Row>
                                ) }
                            </Column>
                            { errorMsg && (
                                <Column 
                                    left='4rem'
                                    style={{
                                        maxWidth: '40%'
                                    }}
                                >
                                    <Row alignCenter>
                                        <Header colour='extraDark' weight='semiBold' size='h3'>
                                            OR try to find manually the ASIN
                                        </Header>
                                    </Row>
                                    <Row>
                                        <Input
                                            error={ !!errorMsgAsin && !!inputAsin }
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
                                    { productExists && !errorMsgAsin && (
                                        <Row top='3rem'>
                                            <Column right={ spacings._2 }>
                                                <ProductIconPlaceholder><img src={ 'https://www.seventhgeneration.com/sites/default/files/styles/1600w/public/2020-07/mbcampaign-hp-productcarouselpersonalcare-998x790.jpg?itok=EbJB9ky5' } /></ProductIconPlaceholder>
                                            </Column>
                                            <Column>
                                                <Row alignCenter>
                                                    <Column right={ spacings._4 }><CheckCircleIcon height='4rem' /></Column>
                                                    <Column>
                                                        <Text colour='dark' size='secondary' bottom={ spacings._2 }>
                                                            Lorem Ipsum
                                                        </Text>
                                                        <Text colour='success' size='primary' weight='semiBold'>
                                                            This is a valid product!
                                                        </Text>
                                                    </Column>
                                                </Row>
                                            </Column>
                                        </Row>
                                    ) }
                                </Column>
                            ) }
                        </Row>
                        <Row grow />
                        { productExists && (
                            <Row 
                                style={{
                                    justifyContent: 'center'
                                }}
                            >
                                <a href='#next'><ArrowDownOutlinedIcon height='5rem' /></a>
                            </Row>
                        ) }
                    </Column>
                </StylesProvider>
            </Wrapper>
        </Section1Wrapper>
    );
};
