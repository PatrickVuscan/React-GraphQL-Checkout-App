import { Box, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import { AddRounded, RemoveRounded } from '@material-ui/icons';
import React from 'react';
import { useQuery } from 'urql';
import { Cart } from './../Routing/Routing';
import { QUERY_ITEMS } from './../../api-calls/queries';

interface Props {
    cart: Cart;
    setCart: Function;
}

const Shop = (props: Props) => {
    const { cart, setCart } = props;

    const [res] = useQuery({
        query: QUERY_ITEMS,
    });

    const { data, fetching, error } = res;

    if (fetching) return <div>Fetching...</div>;
    if (error) return <div>Error...</div>;

    const addToCart = (id: number) => {
        setCart({
            ...cart,
            [id]: cart[id] ? cart[id] + 1 : 1,
        });
    };

    console.log(data.items);

    const removeFromCart = (id: number) => {
        if (cart[id] && cart[id] > 0) {
            setCart({
                ...cart,
                [id]: cart[id] ? cart[id] - 1 : 0,
            });
        }
    };

    return (
        <>
            <Grid container spacing={5} alignContent="space-around" alignItems="center" justify="center">
                {data.items.map((item: any) => {
                    return (
                        <Grid item xs={7} sm={5} md={4} key={item.id} style={{ height: '100%' }}>
                            <Card style={{ height: '100%' }}>
                                <CardContent style={{ paddingBottom: 0 }}>
                                    <Typography align="center" variant="h4">
                                        {item.name}
                                    </Typography>
                                    <Typography align="center" variant={item.discount ? 'body2' : 'body1'}>
                                        {`$${item.price.toFixed(2)}`}
                                    </Typography>
                                    {item.discount > 0 && (
                                        <Typography align="center" variant="body1">
                                            {`$${(item.price * (1 - item.discount)).toFixed(2)}`}
                                        </Typography>
                                    )}
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
