import React, { useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CheckoutDrawer from './checkoutDrawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Avatar from 'react-avatar';
import axios from 'axios';
import { baseURL } from '../backend';
import { Drawer } from '@material-ui/core';
import OrderHistory from './orderHistory';

const useStyles = makeStyles((theme) => ({

    grow: {
        flexGrow: 1,
    },
    appBarProps: {
        color: '#FFF',
        backgroundColor: '#14A098',
    },

    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputRoot: {
        color: 'inherit',
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },

    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
}));


// SearchAppBar Function starts   --------------------------------------------------------------------------------------------------
export default function SearchAppBar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        profileAnchor: null,
        menuAnchor: null,
        user: null,
    });
    const [error, setError] = useState(null)

    const isProfileMenuOpen = Boolean(state.profileAnchor);
    const isMainMenuOpen = Boolean(state.menuAnchor);

    const handleProfileMenuClick = (event) => {
        setState({ ...state, profileAnchor: event.currentTarget });
    };
    const handleProfileMenuClose = () => {
        setState({ ...state, profileAnchor: null });
    };

    const handleMainMenuClick = (event) => {
        setState({ ...state, menuAnchor: event.currentTarget });
    };
    const handleMainMenuClose = () => {
        setState({ ...state, menuAnchor: null });
    };

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
    
    const handleLogout = () => {
        setError(null);
        setAuthToken(sessionStorage.getItem("token"));
        axios.get(`${baseURL}/user/logout/`)
            .then(response => {
            if (response.data.status === 200){
                removeUserSession();
            } else{
                setError(response.data.error)
            }
        }).catch(error => {
            console.log(error)
            if (error.response.status === 400) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    const removeUserSession = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.reload(false);
    }

    const getUser = () => {
        const userStr = sessionStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        else return null;
    }

    const showOrderHistory = () =>{
        return (
            <div>
                <OrderHistory />
            </div>
        )
    }

    useEffect(() => {
        setState({...state, user: getUser()});
    }, [setState])


    const profileMenu = (
        <Menu
            anchorEl={state.profileAnchor}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={state.profileAnchor + '_menu'}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
        >
            {state.user === null ?
            <div>
                <MenuItem component={Link} to={'/signup/'}>Sign up</MenuItem>
                <MenuItem component={Link} to={'/login/'}>Sign In</MenuItem>
            </div>
            :
            <MenuItem component={Link} to={'/'} onClick={handleLogout}>Logout</MenuItem>
            }
        </Menu>
    );

    const mainMenu = (
        <Menu
            anchorEl={state.menuAnchor}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={state.menuAnchor + '_menu'}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMainMenuOpen}
            onClose={handleMainMenuClose}
        >
            <MenuItem>
                <ListItemIcon>
                    <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem onClick={showOrderHistory}>
                <ListItemIcon>
                    <HistoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
            </MenuItem>
        </Menu>
    );


    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appBarProps}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        onClick={handleMainMenuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        E-Retail
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <CheckoutDrawer />
                        <IconButton edge="end"
                            aria-haspopup="true"
                            onClick={handleProfileMenuClick}
                            color="inherit">
                            {
                                state.user !== null 
                                ? <Avatar name={state.user.name} round={true} size="25" textSizeRatio={2}/>
                                : <AccountCircle />  
                            } 
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {mainMenu}
            {profileMenu}
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        </div>
    );
}
