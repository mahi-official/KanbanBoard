import React from "react"
import SearchAppBar from "../components/searchAppBar";
import { makeStyles } from '@material-ui/core/styles';
import DefaultFooter from "../components/footer";
import SignupForm from "../components/signupForm";

const useStyles = makeStyles({
    container: {
        width: '80%',
        margin: 'auto',
    },
    mBottomSpace: {
        marginBottom: '20px'
    },
    sBottomSpace: {
        marginBottom: '10px'
    },
    sTopSpace: {
        marginTop: '10px',
    },
    defaultTheme: {
        color: '#FFF',
        backgroundColor: '#14A098',
    },
    centerItems: {
        display: 'flex',
        justifyContent: 'center'
    },
});

export default function Signup() {
    const classes = useStyles();

    return (
        <main className="content">
            <div>
                <SearchAppBar />
            </div>
            <div className={classes.container}>
                <SignupForm />
            </div>
            <div>
                <DefaultFooter />
            </div>
        </main>
    )
}
