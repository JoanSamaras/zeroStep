import React, { useState } from 'react';
import { Column, Row } from 'components/row-column';
import styled from 'styled-components';
import { colours } from 'design-system/colours';
import { borderSizes } from 'design-system/border-sizes';
import { spacings } from 'design-system/spacings';
import { Header, Wrapper } from './common-styles';
import { Button } from 'components/buttons';
import { TextField } from '@material-ui/core';

const Separator = styled( Row )`
    width: 100%;
    border-bottom: ${ borderSizes._1 } solid ${ colours.grey3 };
    margin-top: ${ spacings._6 };
`;

export const Section2 = (): JSX.Element => {
    const [ textReason, setReason ] = useState( '' );
    const [ textAttention, setAttention ] = useState( '' );

    return (
        <Column>
            <Separator />
            <Wrapper id='section2' top='2rem'>
                <Column>
                    <Row>
                        <Column 
                            right='4em' 
                            style={{ 
                                width: '45%' 
                            }}
                        >
                            <Header colour='dark' size='h3'>
                                What made you pick this product from the search results?
                            </Header>
                        </Column>
                        <Column
                            style={{ 
                                width: '45%' 
                            }}
                        >
                            <Header colour='dark' size='h3'>
                                Looking to the product detail page, what grabs your attention the most? 
                                What do you like about this product?
                            </Header>
                        </Column>
                    </Row>
                    <Row top='2rem'>
                        <Column 
                            right='4em' 
                            style={{ 
                                width: '45%' 
                            }}
                        >
                            <TextField
                                id='outlined-multiline-flexible'
                                label=''
                                multiline
                                rows={ 8 }
                                variant="outlined"
                                value={ textReason }
                                onChange={ ( e: { target: { value: React.SetStateAction<string>; }; } ) => setReason( e.target.value ) }
                            />
                        </Column>
                        <Column
                            style={{ 
                                width: '45%' 
                            }}
                        >
                            <TextField
                                id='outlined-multiline-flexible'
                                label=''
                                multiline
                                rows={ 8 }
                                variant="outlined"
                                value={ textAttention }
                                onChange={ ( e: { target: { value: React.SetStateAction<string>; }; } ) => setAttention( e.target.value ) }
                            />
                        </Column>
                    </Row>
                    <Row top='1em' justifyContentCenter>
                        <Button 
                            id='next'
                            size='default' 
                            profile='primary' 
                            style={{ 
                                width: '70%' 
                            }}
                        >
                            next
                        </Button>
                    </Row>
                </Column>
            </Wrapper>
        </Column>
    );
};