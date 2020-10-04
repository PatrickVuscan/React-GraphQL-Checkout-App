import { Container, Grid, withTheme, WithTheme } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ShoppingAppBar from './../ShoppingAppBar/ShoppingAppBar';
import Shop from './../Shop/Shop';
import Checkout from './../Checkout/Checkout';

export interface Cart {
    [id: number]: number;
}

export interface MappedProducts {
    [id: number]: Product;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

interface Props extends WithTheme {}

export const Routing = (props: Props) => {
    const [cart, setCart] = React.useState<Cart>(JSON.parse(sessionStorage.getItem('cart') || '{}'));

    React.useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    console.log(cart);

    return (
        <Grid container direction="column" alignItems="stretch" alignContent="stretch" wrap="nowrap" className="h-100">
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
                    <Container
                        component="main"
                        maxWidth="md"
                        style={{
                            height: '100%',
                            padding: props.theme.spacing(5),
                        }}
                    >
                        <Switch>
                            <Route exact path="/">
                                <Shop cart={cart} setCart={setCart} />
                            </Route>
                            <Route path="/checkout">
                                <Checkout cart={cart} setCart={setCart} />
                            </Route>
                            {/* redirect to shopping page (home) by default */}
                            <Redirect to="/" />
                        </Switch>
                    </Container>
                </Grid>
            </Router>
        </Grid>
    );
};

export default withTheme(Routing);
