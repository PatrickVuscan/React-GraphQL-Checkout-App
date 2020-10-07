import React from 'react';
import { createClient, Provider } from 'urql';

const URL = process.env.URL || 'https://facile-checkout-api-gx3qgkcolq-nn.a.run.app/';

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
