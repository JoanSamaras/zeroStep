import React from 'react';
import styled, { css } from 'styled-components';
import { colours } from 'design-system/colours';
import { spacings } from 'design-system/spacings';
import { fontSizes } from 'design-system/font-sizes';
import { fontWeights } from 'design-system/font-weights';
import { Margins, margins } from 'helpers/css-utils';

type ButtonProfileType = 'default' | 'primary'
type ButtonSize = 'default' | 'small'

type ButtonStyleProps = {
    profile: ButtonProfileType
    size: ButtonSize
    disabled?: boolean
    margins?: Margins
}

const profileColourSettings = ( p: ButtonProfileType ) => {
    if ( p === 'primary' ) {
        return css`
            background-color: ${ colours.primary5 };
            color: ${ colours.grey1 };

            :hover {
                cursor: pointer;
                background-color: ${ colours.primary4 };
            }
            :active {
                cursor: pointer;
                background-color: ${ colours.primary6 };
            }
        `
    } else {
        return css`
            background-color: ${ colours.grey3 };
            color: ${ colours.grey6 };

            :hover {
                cursor: pointer;
                background-color: ${ colours.grey5 };
                color: ${ colours.grey1 };
            }
            :active {
                cursor: pointer;
                background-color: ${ colours.grey6 };
                color: ${ colours.grey1 };
            }
        `
    }
};

export const Button = styled.button<ButtonStyleProps>`
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${ spacings._1 };
    text-align: center;
    font-weight: ${ fontWeights.bold };
    transition: background-color 0.3s;
    opacity: ${ p => p.disabled ? '0.6' : 'unset' };
    pointer-events: ${ p => p.disabled ? 'none' : 'unset' };
    padding: ${ spacings._4 } ${ spacings._6 };
    border: none;

    ${ p => p.profile && profileColourSettings( p.profile ) }
    :focus {
        outline: none;
    }

    ${ p => p.size === 'small' && css`
        padding: ${ spacings._1 } ${ spacings._3 };
        font-size: ${ fontSizes.secondary };
    ` }

    ${ p => p.margins && margins( p.margins ) }
`;
