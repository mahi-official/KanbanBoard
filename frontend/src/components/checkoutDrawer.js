import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    list: {
        listStyle: 'none',
        width: 700,
    },

    cartRow: {
        border: '1px solid #cccccc',
        display: 'inline-flex',
        margin: '7px',
        padding: '5px',
        width: '95%',
    },

    productImage: {
        width: '100px',
        height: '100px',

    },

    productDetails: {
        margin: 'auto auto auto 2.5em',
        textAlign: 'left',
    },

    productName: {
        fontWeight: '600',
        fontFamily: 'sans-serif',
    },

    productPrice: {
        marginTop: '20px',
        fontWeight: '400',
        fontFamily: 'sans-serif',

    },
    productState: {
        marginTop: '5px',
        fontWeight: '400',
        fontFamily: 'sans-serif',
    },

    productQtyDetails: {
        marginRight: '0.5em',
        marginTop: '0.5em',
        display: 'grid',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'space-between',

    },

    productQunatity: {
        margin: 'auto',
    },

    removeButton: {
        width: '2em',
        marginBottom: '0px',
        alignContent: 'left',
    },

    checkout: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1em auto',

    },

    button: {
        padding: '5px',
        textAlign: 'center',
        background: 'transparent',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
        },
        '&:focus': {
            boxShadow: 'none',
            background: 'transparent'
        },
    },

    flexDisplay: {
        display: 'inline-flex',
        width: '-webkit-fill-available',
        margin: '0.5rem',
        padding: '0.5rem',
        justifyContent: 'space-between',

    }
}));


export default function CheckoutDrawer() {
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const [state, setState] = React.useState({
        show: false,
    });

    const cartItems = [
        {
            _id: '1',
            name: 'Slim Shirt',
            category: 'Shirts',
            image: 'https://im.rediff.com/money/2014/aug/27logo-answers8.jpg',
            price: 60,
            brand: ' Nike',
            quantity: 2,
            status: true
        },
        {
            _id: '2',
            name: 'Fit Shirt',
            category: 'Electronics',
            image: 'https://im.rediff.com/money/2014/aug/27logo-answers8.jpg',
            price: 50,
            brand: ' Nike',
            quantity: 1,
            status: true
        },
        {
            _id: '3',
            name: 'Best Pants',
            category: 'Pants',
            image: 'https://im.rediff.com/money/2014/aug/27logo-answers8.jpg',
            price: 70,
            brand: ' Nike',
            quantity: 3,
            status: false
        }, {
            _id: '4',
            name: 'Best Pants',
            category: 'Pants',
            image: 'https://im.rediff.com/money/2014/aug/27logo-answers8.jpg',
            price: 70,
            brand: ' Nike',
            quantity: 5,
            status: true
        },
    ]


    const toggleDrawer = (currState) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, show: currState });
    };

    const cartDrawer = () => (
        <div
            className={clsx(classes.list)}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className="cart-list">
                {
                    cartItems.length === 0 ?
                        <div>
                            Cart is empty
                        </div>
                        :
                        cartItems.map(item =>
                            <li className={clsx(classes.list)} key={item._id}>
                                <div className={clsx(classes.cartRow)}>
                                    <div className={clsx(classes.productImage)}>
                                        <img src={item.image} alt="product" width='100px' height='100px' />
                                    </div>
                                    <div className={clsx(classes.productDetails)}>
                                        <div className={clsx(classes.productName)}>
                                            {item.name}
                                        </div>
                                        <div className={clsx(classes.productPrice)}>
                                            ${item.price}
                                        </div>
                                        <div className={clsx(classes.productState)}>
                                            {item.status ? "Available" : "Not Available"}
                                        </div>
                                    </div>
                                    <div className={clsx(classes.productQtyDetails)}>
                                        <ButtonGroup>
                                            <Button
                                                aria-label="reduce"
                                                onClick={() => {
                                                    setCount(Math.max(count - 1, 0));
                                                }}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Button variant="outlined">{item.quantity}</Button>
                                            <Button
                                                aria-label="increase"
                                                onClick={() => {
                                                    setCount(count + 1);
                                                }}
                                            >
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>

                                        <div className={clsx(classes.removeButton)}>
                                            <Button
                                                variant="contained"
                                                color="default"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Remove Item
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                }
            </div>
            <div className="cart-action">
                <div className={clsx(classes.cartRow)}>
                    <div style={{ width: '100%' }}>
                        <h3 align='center'>
                            ********Total Bill********
                        </h3>
                        <div className={clsx(classes.flexDisplay)} style={{ borderBottom: '1px solid #cccccc' }}>
                            <div>Total product count</div>
                            <div>{cartItems.reduce((a, c) => a + c.quantity, 0)}</div>
                        </div>
                        <div className={clsx(classes.flexDisplay)}>
                            <div>Total amount</div>
                            <div>$ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</div>
                        </div>
                        <div className={clsx(classes.flexDisplay)}>
                            <div>Shipping</div>
                            <div>{cartItems.reduce((a, c) => a + c.price * c.quantity, 0) > 50 ? "Free" : "$20"}</div>
                        </div>
                        <div class={clsx(classes.checkout)}>
                            <Button variant="contained" color="primary"
                                disableElevation style={{ width: '100%' }} disabled={cartItems.length === 0}>
                                Place Order
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {
                <React.Fragment key='cartPreview'>
                    <IconButton color="inherit" onClick={toggleDrawer(true)}>
                        <AddShoppingCartIcon />
                    </IconButton>
                    <Drawer anchor='right' open={state.show} onClose={toggleDrawer(false)} >
                        {cartDrawer()}
                    </Drawer>
                </React.Fragment>
            }
        </div>
    );
}
