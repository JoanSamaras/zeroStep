import React, { useState } from 'react';
import { Column } from 'components/row-column';
import { Section1 } from './Section1';
import { Section2 } from './Section2';

export const Step2 = (): JSX.Element => {
    const [ productExists, setProductExists ] = useState( false );

    return (
        <Column>
            <Section1 
                productExists={ productExists }
                setProductExists={ setProductExists }
            />
            { productExists && (
                <Section2 />
            ) }
        </Column>
    );
};
