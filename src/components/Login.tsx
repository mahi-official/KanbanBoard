import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Chip, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react'
import { Box } from '@mui/system';

interface LoginState {
    username: string;
    password: string;
    showPassword: boolean;
    disabled: boolean;
}

export default function LoginPage() {
    const [values, setvalues] = React.useState<LoginState>({
        username: '',
        password: '',
        showPassword: false,
        disabled: false,
    });
    const [notification, setNotification] = React.useState<string>(" ");
    const [error, setError] = React.useState<string>(" ");
    const [loading, setLoading] = React.useState<boolean>(false);


    const handleChange =
        (prop: keyof LoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setvalues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setvalues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClickSendOTP = () => {
        setvalues({ ...values, disabled: true });
        setNotification("Email is Wrong | Phone Number is Wrong | OTP sent successfully.")
        console.log("Send OTP event");
    };

    const handleClickLoginButton = () => {
        setLoading(true);
    };

    return (
        <div>
            <section className="login-card" style={{ "backgroundColor": "#F1F1F1" }}>
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col col-xl-10">
                            <div className="card mt-5 mb-5" style={{ "borderRadius": "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block m-auto">
                                        <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                                            className="img-fluid" alt="Login" style={{ "borderRadius": "1rem 0 0 1rem" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }} autoComplete="off">
                                                <h3 className="fw-bold mb-3 pb-3" style={{ "letterSpacing": "1px" }}>Sign in to Demo Organization</h3>
                                                <FormControl fullWidth sx={{ mt: 2}} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-email">Email ID / Mobile</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-email"
                                                        label="Email ID"
                                                        placeholder="Enter your email or Phone number"
                                                        type="email"
                                                        value={values.username}
                                                        onChange={handleChange('username')}
                                                        autoFocus={true}
                                                        endAdornment={
                                                            <InputAdornment position="end" style={{ "display": values.username !== '' ? "contents" : "none" }}>
                                                                <Chip
                                                                    clickable
                                                                    label="Send OTP"
                                                                    onClick={handleClickSendOTP}
                                                                    color="default"
                                                                    disabled={values.disabled}
                                                                />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    <FormHelperText id="outlined-email-helper-text">{notification}</FormHelperText>
                                                </FormControl>
                                                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-password">Password / OTP</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-password"
                                                        label="Password"
                                                        placeholder="Enter your password"
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        value={values.password}
                                                        onChange={handleChange('password')}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDown}
                                                                    edge="end"
                                                                >
                                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    <FormHelperText id="outlined-password-helper-text">{error}</FormHelperText>
                                                </FormControl>

                                                <LoadingButton
                                                    sx={{
                                                        width: "100%",
                                                        bgcolor: () => loading ? "lightgray" : "black",
                                                        color: () => loading ? "black" : "white",
                                                        ":hover": {
                                                            bgcolor: "black",
                                                            color: "white",
                                                            boxShadow: 2,
                                                        },
                                                    }}
                                                    size="large"
                                                    onClick={handleClickLoginButton}
                                                    loading={loading}
                                                    loadingIndicator="Logging In..."
                                                >
                                                    Log In
                                                </LoadingButton>
                                            </Box>
                                            <a className="small text-muted" href="#!">Forgot password?</a>
                                            <p className="mb-5 pb-lg-2" style={{ "color": "#393f81" }}>Don't have an account? <a href="#!" style={{ "color": "#393f81" }}>Register here</a></p>
                                            <a href="#!" className="small text-muted">Terms of use.</a>
                                            <a href="#!" className="small text-muted">Privacy policy</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}