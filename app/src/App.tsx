import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import Routing from './components/Routing/Routing';
import mainTheme from './theme';

const App = () => {
    return (
        <ThemeProvider theme={mainTheme}>
            <Routing />
        </ThemeProvider>
    );
};

export default App;
