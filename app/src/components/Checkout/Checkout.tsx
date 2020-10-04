import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';
import React from 'react';
import { Cart, Product, MappedProducts } from '../Routing/Routing';

const items = [
    {
        id: 1,
        name: 'Pencil',
        price: 2.5,
    },
    {
        id: 2,
        name: 'Eraser',
        price: 1.25,
    },
    {
        id: 3,
        name: 'Textbook',
        price: 89.95,
    },
    {
        id: 11,
        name: 'Pencil',
        price: 2.5,
    },
    {
        id: 12,
        name: 'Eraser',
        price: 1.25,
    },
    {
        id: 13,
        name: 'Textbook',
        price: 89.95,
    },
    {
        id: 21,
        name: 'Pencil',
        price: 2.5,
    },
    {
        id: 22,
        name: 'Eraser',
        price: 1.25,
    },
    {
        id: 23,
        name: 'Textbook',
        price: 89.95,
    },
];

const mapProducts = (products: Array<Product>) => {
    const mappedProducts: MappedProducts = {};

    products.forEach((product: Product) => {
        mappedProducts[product.id] = product;
    });

    return mappedProducts;
};

const mappedProducts: MappedProducts = mapProducts(items);

interface Props {
    cart: Cart;
    setCart: Function;
}

const Checkout = (props: Props) => {
    const [checkingOut, setCheckingOut] = React.useState(false);
    const [purchased, setPurchased] = React.useState(false);
    const { cart, setCart } = props;

    let total = 0;
    for (let id in cart) {
        total += cart[id] * mappedProducts[id].price;
    }

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
                                <Typography align="center" variant="body1">{`Total before tax: ${total.toFixed(
                                    2,
                                )}`}</Typography>
                                <Typography align="center" variant="body1">{`Total after tax: ${(total * 1.13).toFixed(
                                    2,
                                )}`}</Typography>
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
                    {!purchased && (
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
                            setTimeout(() => {
                                setCheckingOut(false);
                                setPurchased(true);
                                setCart({});
                            }, 1500);
                            setTimeout(() => {
                                setPurchased(false);
                            }, 7000);
                        }}
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Checkout;
