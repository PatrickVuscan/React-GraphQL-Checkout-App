import { Grid } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ShoppingAppBar from './../ShoppingAppBar/ShoppingAppBar';

interface Props {}

export const Routing = (props: Props) => {
    return (
        <Grid
            container
            direction="column"
            alignItems="stretch"
            alignContent="stretch"
            wrap="nowrap"
            className="h-100"
            style={{ overflow: 'hidden' }}
        >
            <Router>
                <Grid
                    item
                    className="sticky-top"
                    style={{
                        position: '-webkit-sticky', // safari fix
                        top: '0',
                        zIndex: 1000,
                    }}
                >
                    <ShoppingAppBar />
                </Grid>
                <Grid item xs>
                    <Switch>
                        <Route exact path="/">
                            <div>
                                <h1>This will be the shopping cart</h1>
                            </div>
                        </Route>
                        <Route path="/checkout">
                            <div>
                                <h1>This will be the checkout</h1>
                            </div>
                        </Route>
                        {/* redirect to shopping page (home) by default */}
                        <Redirect to="/" />
                    </Switch>
                </Grid>
            </Router>
        </Grid>
    );
};

export default Routing;
