// import React from 'react';
// import clsx from 'clsx';
// import { alpha, makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import { Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// import InboxIcon from '@material-ui/icons/Inbox';

// const useStyles = makeStyles((theme) => ({
//   list: {
//     width: '50%',
//   },

//   grow: {
//     flexGrow: 1,
//   },

//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
  
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },

//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   inputRoot: {
//     color: 'inherit',
//   },
  
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
  
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex',
//     },
//   },
// }));

// export default function SearchAppBar() {
//   const classes = useStyles();
//   const [anchorElement, setAnchorElement] = React.useState(null);
  
//   const [cartState, setCartState] = React.useState({
//       top: false,
//         prevOrder: false,
//         currOrder: false,
//     });

//   const handleCartDrawer = (anchor, isActive) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setCartState({ ...cartState, [anchor]: isActive });
//   };

//   const list = (anchor) => (
//     <div
//       className={clsx(classes.list)}
//       onClick={handleCartDrawer(anchor, false)}
//       onKeyDown={handleCartDrawer(anchor, false)}
//     >
//       <List>

//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   const isMenuOpen = Boolean(anchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//         newItems.map(item => (
//             <li 
//             key={item.productID}
//             className="list-group-item d-flex justify-content-between align-items-center"
//             >
//             <span 
//                 className={`product-title mr-2 ${
//                 this.state.status ? "actice-product" : "inactive-product"
//                 }`}
//                 title={item.desc}
//                 >
//                 {item.name}
//                 </span>
//             </li>
//         ));

//       <MenuItem onClick={handleMenuClose}>SignUp</MenuItem>
//       <MenuItem onClick={handleMenuClose}>SignIn</MenuItem>
//     </Menu>
//   );

//   const renderLeftMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//       id={menuId+'_1'}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>SignUp</MenuItem>
//       <MenuItem onClick={handleMenuClose}>SignIn</MenuItem>
//     </Menu>
//   );

//   return (
//     <div className={classes.grow}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//             onClick={renderLeftMenu}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography className={classes.title} variant="h6" noWrap>
//             E-Retail
//           </Typography>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </div>
//           <div className={classes.grow} />
//           <div className={classes.sectionDesktop}>
//             <IconButton aria-label="show 4 new mails" color="inherit">
//               <Badge badgeContent={4} color="secondary">
//                 <MailIcon />
//               </Badge>
//             </IconButton>
//             <React.Fragment key='cartDrawer'>
//                   <Button onClick={toggleDrawer(true)}>Cart</Button>
//                   <Drawer anchor='right' open={state.cartShow} onClose={toggleDrawer(false)}>
//                     {list('cartDrawer')}
//                   </Drawer>
//             </React.Fragment>
//             <IconButton aria-label="show 17 new notifications" color="inherit" onClick={toggleDrawer(true)}>
//               <Badge badgeContent={17} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//             <IconButton
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={handleProfileMenuOpen}
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//       {renderMenu}
//       {renderLeftMenu}
//     </div>
//   );
// }
