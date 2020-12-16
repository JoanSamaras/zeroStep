import React from 'react';
import styled from 'styled-components';
import { colours } from 'design-system/colours';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${ colours.grey1 };
    max-height: 100vh;
    max-width: 100vw;
`;

const App = (): JSX.Element => {
    return (
        <Wrapper />
    );
};

export default App;
