import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';
import React from 'react';
import { useQuery } from 'urql';
import { QUERY_ITEMS } from './../../api-calls/queries';
import { Cart, MappedProducts, Product } from './../Routing/Routing';

const mapProducts = (products: Array<Product>) => {
    const mappedProducts: MappedProducts = {};

    products.forEach((product: Product) => {
        mappedProducts[product.id] = product;
    });

    return mappedProducts;
};

interface Props {
    cart: Cart;
    setCart: Function;
}

const Checkout = (props: Props) => {
    const [checkingOut, setCheckingOut] = React.useState(false);
    const [purchased, setPurchased] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);

    const { cart, setCart } = props;

    const [res] = useQuery({
        query: QUERY_ITEMS,
    });

    const { data, fetching, error } = res;

    if (fetching) return <div>Fetching...</div>;
    if (error) return <div>Error...</div>;

    const mappedProducts: MappedProducts = mapProducts(data.items);

    let discountedTotal = 0;
    let nonDiscountedTotal = 0;
    for (let id in cart) {
        nonDiscountedTotal += cart[id] * mappedProducts[id].price;
        discountedTotal += cart[id] * (mappedProducts[id].price * (1 - mappedProducts[id].discount));
    }

    const amountSaved = nonDiscountedTotal - discountedTotal;

    return (
        <>
            <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
                <Card variant="outlined" style={{ padding: '5vh 5vw 2vh 5vw', width: '80%' }}>
                    <CardContent>
                        {!purchased && (
                            <>
                                <Box pb={5}>
                                    <Typography align="center" variant="h4">
                                        Checkout
                                    </Typography>
                                </Box>
                                {nonDiscountedTotal > 0 ? (
                                    <>
                                        <Typography align="center" variant={amountSaved > 0 ? 'body2' : 'body1'}>
                                            {`Total before tax: $${nonDiscountedTotal.toFixed(2)}`}
                                        </Typography>
                                        <Typography align="center" variant={amountSaved > 0 ? 'body2' : 'body1'}>
                                            {`Total after tax: $${(nonDiscountedTotal * 1.13).toFixed(2)}`}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography align="center" variant="body1">
                                        There is nothing in your shopping cart.
                                    </Typography>
                                )}
                                {amountSaved > 0 && (
                                    <>
                                        <br></br>
                                        <Typography align="center" variant="body1">
                                            {`Discounted total before tax: $${discountedTotal.toFixed(2)}`}
                                        </Typography>
                                        <Typography align="center" variant="body1">
                                            {`Discounted total after tax: $${(discountedTotal * 1.13).toFixed(2)}`}
                                        </Typography>
                                        <Typography align="center" variant="body1">
                                            {`You saved $${discountedTotal.toFixed(2)}!`}
                                        </Typography>
                                    </>
                                )}
                            </>
                        )}
                        {purchased && (
                            <>
                                <Box pb={5}>
                                    <Typography align="center" variant="h4">
                                        Checkout Successful!
                                    </Typography>
                                </Box>
                                <Box
                                    width="100%"
                                    display="flex"
                                    justifyContent="center"
                                    onClick={() => {
                                        setCheckingOut(true);
                                    }}
                                >
                                    <CheckCircleRounded style={{ fontSize: '90px' }} />
                                </Box>
                            </>
                        )}
                    </CardContent>
                    {!purchased && nonDiscountedTotal > 0 && (
                        <CardActions>
                            <Box
                                width="100%"
                                display="flex"
                                justifyContent="center"
                                onClick={() => {
                                    setCheckingOut(true);
                                }}
                            >
                                <Button variant="contained" color="primary">
                                    Process Transaction
                                </Button>
                            </Box>
                        </CardActions>
                    )}
                </Card>
            </Box>
            <Dialog
                open={checkingOut}
                onClose={() => {
                    setCheckingOut(false);
                }}
                style={{ textAlign: 'center' }}
            >
                <DialogTitle>
                    <Typography variant="h4">Confirm Transaction</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box pb={2}>
                        <Typography variant="body1">{"Are you sure you'd like to continue?"}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setCheckingOut(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setProcessing(true);
                            setTimeout(() => {
                                setProcessing(false);
                                setCheckingOut(false);
                                setPurchased(true);
                                setCart({});
                            }, 2500);
                            setTimeout(() => {
                                setPurchased(false);
                            }, 7000);
                        }}
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={processing}
                onClose={() => {
                    setProcessing(false);
                }}
                style={{ textAlign: 'center' }}
            >
                <DialogContent style={{ padding: 20 }}>
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        margin="0"
                        onClick={() => {
                            setCheckingOut(true);
                        }}
                    >
                        <CircularProgress size={90} thickness={6} />
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Checkout;
