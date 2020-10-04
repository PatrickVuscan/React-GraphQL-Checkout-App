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
import { useQuery } from 'urql';
import { Cart, Product, MappedProducts } from '../Routing/Routing';

const QUERY_ITEMS = `
query {
    items {
      id
      name
      price
      discount
    }
  }
`;

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
    const { cart, setCart } = props;

    const [res, executeQuery] = useQuery({
        query: QUERY_ITEMS,
    });

    const { data, fetching, error } = res;

    if (fetching) return <div>Fetching...</div>;
    if (error) return <div>Error...</div>;

    const mappedProducts: MappedProducts = mapProducts(data.items);

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
