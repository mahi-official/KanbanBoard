import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../backend';
import { useHistory } from "react-router-dom";


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
    mTopSpace: {
        marginTop: '20px'
    },
    defaultTheme: {
        color: '#FFF',
        backgroundColor: '#14A098',
    },
    centerItems: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
});

export default function SignupForm() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let history = useHistory();


    const handleSignup = () => {
        setError(null);
        setLoading(true);
        axios.post(`${baseURL}/user/signup/`, { email: email, password: password, name: name })
            .then(response => {
                setLoading(false);
                if (response.data.status === 200) {
                    setUserSession(response.data.token, response.data.user);
                    history.push("/");
                } else {
                    setError(response.data.error)
                }
            }).catch(error => {
                setLoading(false);
                console.log(error)
                if (error.response.status === 400) setError(error.response.data.message);
                else setError("Something went wrong. Please try again later.");
            });
    }

    function validateForm() {
        return email.length > 0 && password.length > 0 && password === confirmPassword;
    }

    const setUserSession = (token, user) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    return (
        <div className={classes.container + " " + classes.centerItems}>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossOrigin="anonymous" />
            <Box
                
                sx={{
                    display: 'flex',
                    width: '50%',
                    '& .MuiTextField-root': { width: '100%' },
                    '& > :not(style)': {
                        m: 1,
                        width: "100%",
                    },
                }}
                autoComplete="off"
            >
                <Paper variant="outlined">
                    <div className="container-fluid">
                        <div className={"mt-5 mb-2 " + classes.centerItems}>
                            <h2>SIGN-UP FORM</h2>
                        </div>
                        <div className={classes.centerItems} style={{ display: 'block' }}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="InputEmail1">Name</label>
                                    <input required type='text' className="form-control" id="name"
                                        placeholder="Enter your name" hinttext="Enter Your Name" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputEmail1">Email address</label>
                                    <input required type="email" className="form-control" id="InputEmail1"
                                        placeholder="Enter email" hinttext="Email address" onChange={(e) => setEmail(e.target.value)} />
                                    <small id="emailHelper" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputPassword1">Password</label>
                                    <input required type="password" className="form-control" id="InputPassword1"
                                        placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputPassword2">Confirm Password</label>
                                    <input required type="password" className="form-control" id="InputPassword2"
                                        placeholder="Password" onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (password !== e.target.value) setError("Password does not match.");
                                            else setError(null)
                                        }} />
                                </div>
                                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                <Button variant="contained" primary="true" color="primary"
                                    disabled={!validateForm() || loading} onClick={(event) => handleSignup(event)}>Submit</Button>
                            </form>
                        </div>
                    </div>
                </Paper>
            </Box>
        </div>
    )
}