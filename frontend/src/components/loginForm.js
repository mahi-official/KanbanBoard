import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { width } from '@mui/system';
import { InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Button, FormControl, FormHelperText } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../backend';
import { Redirect } from 'react-router';
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

export default function LoginForm(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let history = useHistory();


    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post(`${baseURL}/user/login/`, { email: email, password: password })
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
        return email.length > 0 && password.length > 0;
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
                            <h2>LOGIN FORM</h2>
                        </div>
                        <div className={classes.centerItems}  style={{ display: 'block' }}>
                            <form>
                                <div class="form-group">
                                    <label for="InputEmail1">Email address</label>
                                    <input required type="email" class="form-control" id="InputEmail1"
                                        placeholder="Enter email" hinttext="Email address" onChange={(e) => setEmail(e.target.value)} />
                                    <small id="emailHelper" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="InputPassword1">Password</label>
                                    <input required type="password" class="form-control" id="InputPassword1"
                                        placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                <Button variant="contained" primary="true" color="primary"
                                    disabled={!validateForm() || loading} onClick={(event) => handleLogin(event)}>Login</Button>
                            </form>
                        </div>
                    </div>
                </Paper>
            </Box>
        </div>
    )
}