import React from 'react';
import { createClient, Provider } from 'urql';

const URL = process.env.URL || 'http://localhost:4000';

const client = createClient({
    url: URL,
});

type Props = {
    children: JSX.Element | JSX.Element[];
};

const BackendProvider: React.FC<Props> = (props: Props) => {
    const { children } = props;
    return (
        <React.Fragment>
            <Provider value={client}>{children}</Provider>
        </React.Fragment>
    );
};

export default BackendProvider;
