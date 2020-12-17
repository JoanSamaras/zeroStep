import styled, { css } from 'styled-components';
import { margins, Margins } from 'helpers/css-utils';

type RowColumnProps = Margins & {
    grow?: boolean 
    spaceBetween?: boolean 
    alignCenter?: boolean 
    justifyContentCenter?: boolean 
    alignEnd?: boolean 
    fullWidth?: boolean
    noWrap?: boolean 
}

const BasicDivCssConfig = styled.div<RowColumnProps>`
    position: relative;
    display: flex;
    ${ p => p.grow && css`
        flex-grow: 1;
    ` }
    ${ p => p.spaceBetween && css`
        justify-content: space-between;
    ` }
    ${ p => p.alignCenter && css`
        align-items: center;
    ` }
    ${ p => p.justifyContentCenter && css`
        justify-content: center;
    ` }
    ${ p => p.alignEnd && css`
        align-items: flex-end;
    ` }
    ${ p => p.fullWidth && css`
        width: 100%;
    ` }
    ${ p => p.noWrap && css`
        flex-wrap: nowrap;
    ` }
    ${ p => margins( p ) }
`;

export const Row = styled( BasicDivCssConfig )`
    ${ BasicDivCssConfig };
    flex-flow: row wrap;
`;

export const Column = styled( BasicDivCssConfig )`
    flex-flow: column wrap;
`;