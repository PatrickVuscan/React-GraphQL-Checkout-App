import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {}

const ShoppingAppBar = (props: Props) => {
    const { history } = props;

    return (
        <>
            <AppBar elevation={4} position="static">
                <Toolbar>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Button
                                size="large"
                                onClick={() => {
                                    history.push('/');
                                }}
                            >
                                <Typography variant="h3" color="textSecondary">
                                    Shop
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => {
                                    history.push('/checkout');
                                }}
                            >
                                <Typography variant="h4" color="textSecondary">
                                    Checkout
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default withRouter(ShoppingAppBar);
