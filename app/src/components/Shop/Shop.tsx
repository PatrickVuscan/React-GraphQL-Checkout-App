import { Box, Card, CardContent, CardActions, Grid, Typography, Button, IconButton } from '@material-ui/core';
import { AddRounded, RemoveRounded } from '@material-ui/icons';
import React from 'react';
import { Cart } from '../Routing/Routing';

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

interface Props {
    cart: Cart;
    setCart: Function;
}

const Shop = (props: Props) => {
    const { cart, setCart } = props;

    const addToCart = (id: number) => {
        setCart({
            ...cart,
            [id]: cart[id] ? cart[id] + 1 : 1,
        });
    };

    const removeFromCart = (id: number) => {
        if (cart[id] && cart[id] > 0) {
            setCart({
                ...cart,
                [id]: cart[id] ? cart[id] - 1 : 0,
            });
        }
    };

    console.log('new render', props);

    return (
        <>
            <Grid container spacing={5} alignContent="space-around" alignItems="center" justify="center">
                {items.map((item) => {
                    return (
                        <Grid item md key={item.id}>
                            <Card style={{ height: '100%' }}>
                                <CardContent>
                                    <Box pb={10}>
                                        <Typography variant="h4">{item.name}</Typography>
                                        <Typography variant="body1">{`\$${item.price.toFixed(2)}`}</Typography>
                                    </Box>
                                    <Typography variant="body1" gutterBottom>
                                        Looks lovely doesnt it!
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Box display="flex" justifyContent="space-around" width="100%">
                                        <IconButton
                                            size="small"
                                            aria-label="subtract"
                                            onClick={() => {
                                                removeFromCart(item.id);
                                            }}
                                        >
                                            <RemoveRounded />
                                        </IconButton>
                                        <Typography variant="h4">{cart[item.id] || 0}</Typography>
                                        <IconButton
                                            size="small"
                                            aria-label="add"
                                            onClick={() => {
                                                addToCart(item.id);
                                            }}
                                        >
                                            <AddRounded />
                                        </IconButton>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default Shop;
