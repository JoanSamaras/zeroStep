import React, { useState } from 'react';
import { Column } from 'components/row-column';
import { Section1 } from './Section1';

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
