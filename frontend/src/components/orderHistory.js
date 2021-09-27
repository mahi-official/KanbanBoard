import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import axios from 'axios';
import { baseURL } from '../backend';
import { Redirect, useHistory } from 'react-router';

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


export default function OrderHistory() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        show: false,
        order: [],
        userid: null
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

    const getAmount = () => {
        return state.order.reduce((a, c) => a + c.price * c.pcs, 0);
    }


    const toggleDrawer = (currState) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, show: currState });
        setLoading(false);
    };


    const checkAuthentication = () => {
        const user = sessionStorage.getItem('user');
        const token = sessionStorage.getItem("token");
        if (user && token) return true;
        else return false;
    }

    const getOrderItems = () => {
        setLoading(true);
        setAuthToken(sessionStorage.getItem("token"));
        if (checkAuthentication()) {
            axios.post(`${baseURL}/order/${state.userid}/all`)
                .then(response => {
                    if (response.data.status === 200) {

                        setState({ ...state, order: response.data.results })
                    } else {
                        setError(response.data.error)
                    }
                }).catch(error => {
                    console.log(error)
                    if (error.response.status === 400) setError(error.response.data.message);
                    else setError("Something went wrong. Please try again later.");
                });
        } else {
            <Redirect to="/" />
        }
        setLoading(false);
    }


    useEffect(() => {
        getOrderItems();
    }, [state.show])


    return (
        <div className={clsx(classes.list)}>
            <Drawer anchor='left' open={state.show} onClose={toggleDrawer(false)} >
                {
                    state.order.length === 0 ?
                        <div>
                            No Previous Orders
                        </div>
                        :
                        state.order.map(item =>
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
                                    </div>
                                </div>
                            </li>
                        )
                }
            </Drawer>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        </div>
    );
}
