import React from 'react';
import styled from 'styled-components';
import { colours } from 'design-system/colours';
import { imgHeights } from 'design-system/img-heights';
import { ExclamationSolid as ExclamationSolidSVG } from '@styled-icons/zondicons/ExclamationSolid';
import { InfoCircle as InfoCircleSVG } from '@styled-icons/boxicons-solid/InfoCircle';
import { ArrowDropDownCircle as ArrowDropDownCircleSVG } from '@styled-icons/material-outlined/ArrowDropDownCircle';
import { StopCircle as StopCircleSVG } from '@styled-icons/fa-solid/StopCircle';

type IconProps = {
    colour?: string
    height?: string
};

export const WarningIcon = styled( ExclamationSolidSVG )<IconProps>`
    height: ${ p => p.height ? p.height : imgHeights.primary };
    color: ${ p => p.colour ? p.colour : colours.danger5 };
`;

export const InfoCircleIcon = styled( InfoCircleSVG )<IconProps>`
    height: ${ p => p.height ? p.height : imgHeights.primary };
    color: ${ p => p.colour ? p.colour : colours.warning5 };
`;

export const ArrowDownOutlinedIcon = styled( ArrowDropDownCircleSVG )<IconProps>`
    height: ${ p => p.height ? p.height : imgHeights.primary };
    color: ${ p => p.colour ? p.colour : colours.grey9 };
`;

export const StopCircleIcon = styled( StopCircleSVG )<IconProps>`
    height: ${ p => p.height ? p.height : imgHeights.primary };
    color: ${ p => p.colour ? p.colour : colours.danger5 };
`;
