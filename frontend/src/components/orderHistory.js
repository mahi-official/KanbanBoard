import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import axios from 'axios';
import { baseURL } from '../backend';
import { Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    list: {
        listStyle: 'none',
        width: 700,
    },

    cartRow: {
        border: '1px solid #cccccc',
        display: 'inline-flex',
        margin: '7px',
        width: '60%',
        backgroundColor: 'white'
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
    productDesc: {
        fontWeight: '400',
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


export default function OrderHistory(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        order: [],
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

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


    const checkAuthentication = () => {
        const user = sessionStorage.getItem('user');
        const token = sessionStorage.getItem("token");
        if (user && token) return true;
        else return false;
    }

    const getOrderItems = async () => {
        setLoading(true);
        setAuthToken(sessionStorage.getItem("token"));
        if (checkAuthentication()) {
            await axios.get(`${baseURL}/order/all/`,)
                .then(response => {
                    if (response.status === 200) {
                        let result =  response.data.results;
                        result.forEach(ord => {
                            ord.products = JSON.parse(ord.products)
                        });
                        setState({ ...state, order: result})
                    } else {
                        setError(response.data.error)
                    }
                }).catch(error => {
                    console.log(error)
                    if (error.response === 400) setError(error.response.data.message);
                    else setError("Something went wrong. Please try again later.");
                });
        }
        setLoading(false);
    }


    useEffect(() => {
        getOrderItems();
    }, [props.open])


    const listOrder = () => (
        <div>
            {
                checkAuthentication() ?
                    <Box
                        sx={{ width: 700, backgroundColor: "aliceblue" }}
                        role="presentation"
                        onClick={props.onClose}
                        onKeyDown={props.onClose}
                    >
                    <div>
                        {state.order.length === 0 ?
                            <div>
                                No Previous Orders
                            </div>
                            :
                            state.order.map(placedOrder =>
                                <div className="order-items" key={placedOrder.id}>
                                    {placedOrder.products.map(item =>
                                        <li className={clsx(classes.list)} key={item.id}>
                                            <div className={clsx(classes.cartRow)}>
                                                <div className={clsx(classes.productImage)}>
                                                    <img src={item.productImgUrl ?? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="product" width='100px' height='100px' />
                                                </div>
                                                <div className={clsx(classes.productDetails)}>
                                                    <div className={clsx(classes.productName)}>
                                                        {item.name}
                                                    </div>
                                                    <div className={clsx(classes.productDesc)}>
                                                        {item.desc}
                                                    </div>
                                                    <div className={clsx(classes.productPrice)}>
                                                        ${item.price}
                                                    </div>
                                                </div>
                                                <div className="quantity" style={{
                                                    width: 70, height: 'fit-content', display: 'flex',
                                                    position: 'relative', top: 0, right: 0, backgroundColor: 'lightgrey', justifyContent: 'center'
                                                }}>
                                                    {item.pcs}
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                    <div className="order-summary" style={{ right: 0, textAlign: 'end', marginRight: '10px' }}>
                                        <div>
                                            Total Items: {placedOrder.products.reduce((a, c) => a + c.pcs, 0)}
                                        </div>
                                        <div>
                                            Total Amount: ${placedOrder.amount}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Box>
                    :
                    <Box
                        sx={{ width: 700, backgroundColor: "aliceblue" }}
                        role="presentation"
                        onClick={props.onClose}
                        onKeyDown={props.onClose}
                    >
                        <div>Please Sign In to view orders</div>
                    </Box>
            }
        </div>
    );


    return (
        <div >
            <Drawer anchor='left' open={props.open} onClose={props.onClose} >
                {listOrder()}
            </Drawer>
        </div>
    );
}
