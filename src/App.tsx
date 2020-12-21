import React from 'react';
import styled from 'styled-components';
import { colours } from 'design-system/colours';
import { Step2 } from 'pages/Step2';
import { QueryClient, QueryClientProvider } from 'react-query';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${ colours.grey1 };
    max-height: 100vh;
    max-width: 100vw;
`;

const queryClient = new QueryClient();

const App = (): JSX.Element => {
    return (
        <QueryClientProvider client={queryClient}>
            <Wrapper>
                <Step2 />
            </Wrapper>
        </QueryClientProvider>
    );
};

export default App;
