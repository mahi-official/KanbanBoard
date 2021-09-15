import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    padding: {
        padding: '2em',
    },
    centerItems: {
        display: 'flex',
        justifyContent: 'center'
    },
    footerSocial: {
        position: 'relative',
        marginTop: '20px',
        display: 'flex',
    },
    a: {
        marginRight: '5px',
        width: '35px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        borderRadius: '35px',
        fontSize: '16px',
        color: '#14A098',
        '&:hover': {
            color: '#14A098AA',
            outline: 'none',
            textDecoration: 'none',
        },
    },
    ul: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
    },
    defaultTheme: {
        color: '#FFF',
        backgroundColor: '#14A098',
    },
});

export default function DefaultFooter() {
    const classes = useStyles();

    return (
        <footer id="footer">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
            <link href="https://use.fontawesome.com/releases/v5.0.4/css/all.css" rel="stylesheet" />

            <div className={classes.centerItems + " " + classes.defaultTheme} style={{ paddingTop: '20px', fontWeight: 700 }}>
                <p className="follow-us-text">Follow us</p>
            </div>
            <div >
                <ul className={classes.centerItems + " " + classes.defaultTheme + " " + classes.ul}>
                    <li>
                        <a href="https://facebook.com/" className={classes.a}>
                            <i class="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/" className={classes.a}>
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://instagram.com/" className={classes.a}>
                            <i class="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/" className={classes.a}>
                            <i class="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://reddit.com/" className={classes.a}>
                            <i class="fab fa-reddit"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={classes.centerItems + " " + classes.defaultTheme + " " + classes.padding}>
                Copyright &copy; 2020 - Company Name. All Rights Reserved.
            </div>
        </footer>
    );
}
