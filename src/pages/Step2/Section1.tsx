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
import { Backdrop, CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { ErrorMessage } from 'components/error-msg';
import { fontSizes } from 'design-system/font-sizes';
import { Dialogue } from 'components/dialogue';
import { ArrowDownOutlinedIcon, CheckCircleIcon } from 'assets/icons';
import { Header, Wrapper } from './common-styles';
import { useQuery, useQueryClient } from 'react-query';

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
    max-height: 8em; 
    display: flex;

    & img {
        width: 100%;
    }
`;

const ProductName = styled( Text )`
    max-width: 13rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
    const validUrl = 'https://www.amazon.com/One-Womens-Petite-Multivitamins-Count/dp/B004XSOJ02/ref=sxin_2_ac_d_rm?ac_md=1-1-dml0YW1pbnMgZm9yIHdvbWVu-ac_d_rm&cv_ct_cx=vitamins&dchild=1&keywords=vitamins&pd_rd_i=B004XSOJ02&pd_rd_r=44e6d03a-e543-4a9e-a6c2-15e32ff4a7ad&pd_rd_w=98b9v&pd_rd_wg=JFPxa&pf_rd_p=500f114e-2c2f-4a43-bcda-f4dcdd3832f9&pf_rd_r=KNPFJMTR8P46106XAR3B&psc=1&qid=1599642403&sr=1-2-12d4272d-8adb-4121-8624-135149aa9081';

    const [ inputAsin, setInputAsin ] = useState( '' );
    const [ inputAsinId, setInputAsinId ] = useState( 'outlined-asin-input' );
    const [ errorMsgAsin, setErrorMsgAsin ] = useState( '' );
    const validAsin = 'B004QQ9LVS';

    const [ loading, setLoading ] = useState( false );

    const urlRegex  = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/;
    const asinRegex = /^[A-Z0-9]*$/;

    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery( 'data', () => fetch(
        '/api/data'
    ).then( () => queryClient.setQueryData( 
        'data', 
        {
            name: ( inputUrl === validUrl || inputAsin === validAsin ) ? 'One A Day Women’s Petites Multivitamin,Supplement with Vitamin A, Vitamin C, Vitamin D, Vitamin E and Zinc for Immune Health Support, B Vitamins, Biotin, Folate (As Folic Acid) & More, 160 Count' : '',
            icon: ( inputUrl === validUrl || inputAsin === validAsin ) ? 'https://images-na.ssl-images-amazon.com/images/I/81ExIbPHOxL._AC_SL1500_.jpg' : ''
        } 
    ) ) );

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
        const isAsinValid = asinRegex.test( inputAsin );

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
                    { loading && (
                        <Backdrop open={ loading }>
                            <CircularProgress color='inherit' />
                        </Backdrop>
                    ) }
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
                                { productExists && data && data.icon && !errorMsg && (
                                    <Row top='3rem' alignCenter>
                                        <Column right={ spacings._2 }>
                                            <ProductIconPlaceholder><img src={ data.icon } /></ProductIconPlaceholder>
                                        </Column>
                                        <Column>
                                            <Row alignCenter>
                                                <Column right={ spacings._4 }><CheckCircleIcon height='4rem' /></Column>
                                                <Column>
                                                    <ProductName colour='dark' size='secondary' bottom={ spacings._2 }>
                                                        { data.name }
                                                    </ProductName>
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
                                    { productExists && data && data.icon && !errorMsg && (
                                        <Row top='3rem' alignCenter>
                                            <Column right={ spacings._2 }>
                                                <ProductIconPlaceholder><img src={ data.icon } /></ProductIconPlaceholder>
                                            </Column>
                                            <Column>
                                                <Row alignCenter>
                                                    <Column right={ spacings._4 }><CheckCircleIcon height='4rem' /></Column>
                                                    <Column>
                                                        <ProductName colour='dark' size='secondary' bottom={ spacings._2 }>
                                                            { data.name }
                                                        </ProductName>
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
