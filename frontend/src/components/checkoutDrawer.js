import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { baseURL } from '../backend';

const useStyles = makeStyles(() => ({
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

    const [state, setState] = React.useState({
        show: false,
        cart: [],
        client: "",
    });
    const [outOfStock, setOutofStock] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [openPaymentDialog, setOpenPaymentDialog] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    let history = useHistory();
    let inst;

    const setAuthToken = token => {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'x-csrftoken'
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        }
        else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    const getAmount = () => {
        return state.cart.reduce((a, c) => a + c.price * c.pcs, 0);
    }

    const handleDialogClose = () => {
        setLoading(false);
        setOpenPaymentDialog(false);
    };

    const toggleDrawer = (currState) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, show: currState });
    };

    const getCartItems = () => {
        if (localStorage.getItem("cart")) {
            setState({ ...state, cart: JSON.parse(localStorage.getItem("cart")) });
        }
    }

    const removeCartItem = (id) => {
        state.cart.forEach((item, idx) => {
            if (item.id === id) {
                state.cart.splice(idx, 1);
            }
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
        setState({ ...state, cart: state.cart });
    }

    const increaseQuantity = (id) => {
        state.cart.forEach(item => {
            if (item.id === id) {
                item.pcs += 1;
            }
            if (item.pcs > item.quantity) {
                setOutofStock(true);
            }
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
        setState({ ...state, cart: state.cart });
    }

    const decreaseQuantity = (id) => {
        state.cart.forEach(item => {
            if (item.id === id) {
                item.pcs -= 1;
            }
            if (item.pcs <= 0) {
                removeCartItem(item.id);
            }
            if (item.pcs > item.quantity) {
                setOutofStock(true);
            }
        });
        localStorage.setItem("cart", JSON.stringify(state.cart));
        setState({ ...state, cart: state.cart });
    }

    const checkOFS = () => {
        state.cart.forEach(item => {
            if (item.pcs > item.quantity) {
                setOutofStock(true);
            }
        });
    }


    const checkAuthentication = () => {
        const user = sessionStorage.getItem('user');
        const token = sessionStorage.getItem("token");
        if (user && token) return true;
        else return false;
    }

    const checkoutCart = async () => {
        setLoading(true);
        if (state.cart !== [] && checkAuthentication()) {
            setAuthToken(sessionStorage.getItem("token"));
            await axios.get(`${baseURL}/payment/checkout/`)
                .then(response => {
                    if (response.data.status === 200) {
                        setState({ ...state, client: response.data.client });
                        setOpenPaymentDialog(true);
                        setLoading(false);
                    } else {
                        setError(response.data.error)
                    }
                }).catch(error => {
                    console.log(error)
                    if (error.response.status === 400) setError(error.response.data.message);
                    else setError("Something went wrong. Please try again later.");
                });
        } else if (!checkAuthentication()) {
            history.push("/login");
        } else {
            setError("Something went wrong. Please try again later.");
        }
    }


    const processTransaction = async() => {
        setLoading(true)
        let nonce;
        await inst.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
            })
            .catch(e => console.log("Nonce Error", e))
        
        axios.post(`${baseURL}/payment/process/`, {
            paymentNonce: nonce,
            amount: getAmount(),
        })
            .then(response => {
                if (response.data.status === 200) {
                    sessionStorage.setItem("transaction", response.data.transaction);
                    axios.post(`${baseURL}/order/checkout/`, {
                        paymentID: response.data.transaction,
                        amount: response.data.amount,
                        products: localStorage.getItem("cart"),
                        shipping: 0,
                        coupon: "NA",
                    })
                    localStorage.setItem("cart", []);
                } else {
                    setError(response.data.error)
                }
            }).catch(error => {
                console.log(error)
                if (error.response.status === 400) setError(error.response.data.message);
                else setError("Something went wrong. Please try again later.");
            });
        handleDialogClose();
        setTimeout(() => {
            setLoading(false);
            window.location.reload(false)
        }, 2000);
    }


    useEffect(() => {
        getCartItems();
    }, [state.show])


    useEffect(() => {
        setOutofStock(false);
        checkOFS();
    }, [state])


    const paymentDialog = () => {
        return (
            <div>
                <Dialog open={openPaymentDialog} onClose={handleDialogClose}>
                    <DialogTitle>Enter Card Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your Total Amount is : ${getAmount()}
                        </DialogContentText>
                        <DropIn
                            options={{ authorization: state.client }}
                            onInstance={(instance) => (inst = instance)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={processTransaction} disabled={loading}>Proceed</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const cartDrawer = () => (
        <div
            className={clsx(classes.list)}
        >
            <div className="cart-list">
                {
                    state.cart.length === 0 ?
                        <div>
                            Cart is empty
                        </div>
                        :
                        state.cart.map(item =>
                            <li className={clsx(classes.list)} key={item.id}>
                                <div className={clsx(classes.cartRow)}>
                                    <div className={clsx(classes.productImage)}>
                                        <img src={item.productImgUrl ?? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="product" width='100px' height='100px' />
                                    </div>
                                    <div className={clsx(classes.productDetails)}>
                                        <div className={clsx(classes.productName)}>
                                            {item.name}
                                        </div>
                                        <div className={clsx(classes.productPrice)}>
                                            ${item.price}
                                        </div>
                                        <div className={clsx(classes.productState)}>
                                            {item.status && (item.pcs <= item.quantity) ?
                                                <span style={{ borderRadius: "50%", padding: '7px', backgroundColor: 'limegreen', color: 'white', fontSize: 'x-small' }}>
                                                    Available
                                                </span>
                                                :
                                                <span style={{ borderRadius: "50%", padding: '10px', backgroundColor: 'red', color: 'white', fontSize: 'x-small' }}>
                                                    Not Available
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    <div className={clsx(classes.productQtyDetails)}>
                                        <ButtonGroup>
                                            <Button
                                                aria-label="reduce"
                                                onClick={decreaseQuantity.bind(this, item.id)}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Button variant="outlined">{item.pcs}</Button>
                                            <Button
                                                aria-label="increase"
                                                onClick={increaseQuantity.bind(this, item.id)}
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
                                                onClick={removeCartItem.bind(this, item.id)}
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
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <div className="cart-action">
                <div className={clsx(classes.cartRow)}>
                    <div style={{ width: '100%' }}>
                        <h3 align='center'>
                            ********Total Bill********
                        </h3>
                        <div className={clsx(classes.flexDisplay)} style={{ borderBottom: '1px solid #cccccc' }}>
                            <div>Total product count</div>
                            <div>{state.cart.reduce((a, c) => a + c.pcs, 0)}</div>
                        </div>
                        <div className={clsx(classes.flexDisplay)}>
                            <div>Total amount</div>
                            <div>$ {getAmount()}</div>
                        </div>
                        <div className={clsx(classes.flexDisplay)}>
                            <div>Shipping</div>
                            <div>{state.cart.reduce((a, c) => a + c.price * c.pcs, 0) > 50 ? "Free" : "$20"}</div>
                        </div>
                        <div className={clsx(classes.checkout)}>
                            <Button variant="contained" color="primary" onClick={checkoutCart}
                                disableElevation style={{ width: '100%' }} disabled={state.cart.length === 0 || outOfStock || loading}>
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

            <React.Fragment key='cartPreview'>
                <IconButton color="inherit" onClick={toggleDrawer(true)}>
                    <Badge badgeContent={state.cart.reduce((a, c) => a + c.pcs, 0)} color="error">
                        <AddShoppingCartIcon />
                    </Badge>
                </IconButton>
                <Drawer anchor='right' open={state.show} onClose={toggleDrawer(false)} >
                    {cartDrawer()}
                    {paymentDialog()}
                </Drawer>
            </React.Fragment>

        </div>
    );
}
