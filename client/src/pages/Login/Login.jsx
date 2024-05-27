/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import { Box, Grid, Button, TextField, Typography, Container, Avatar, Checkbox, Stack, FormControlLabel} from '@mui/material'
import signinImg from '../../assets/images/signin.svg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom';
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import axios from 'axios';

const boxstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "80%",
    bgcolor: "background.paper",
}

const center = {
    position: 'relative',
    top: '50%',
    left: '40%',
    marginTop: '40px'
}

const EmailTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: '#ffc300',
        borderWidth: 1,
    },
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 4,
        padding: '4px !important',
    },
    '& label.Mui-focused': {
        color: '#fc2c03',
    },
    '& label': {
        color: '#ffc300',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ffc300',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ffc300',
        },
    },
    '& .MuiInputBase-input': {
        color: '#fff',
    },
    '& input': {
        color: '#fff',
    },
});


const PasswordTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: '#ffc300',
        borderWidth: 1,
    },
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 4,
        padding: '4px !important',
    },
    '& label.Mui-focused': {
        color: '#fc2c03',
    },
    '& label': {
        color: '#ffc300',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ffc300',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ffc300',
        },
    },
    '& .MuiInputBase-input': {
        color: '#fff',
    },
    '& input': {
        color: '#fff',
    },
});


const socialMediaIcon = {
    color: "#2F4F4F",
    background: "#fff",
    padding: "10px",
    borderRadius: "50%",
    fontSize: "20px",
    border: "1px solid #2F4F4F",
    width: "15px",
    height: "15px",
};


function Login() {
    const [remember, setRemember] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Stored token: ', token);
        if (!token) {
            navigate('/login');
            return;
        }
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
            headers: {
                Authorization: `Bearer $(token)`,
            }
        }).then(res => {
            console.log(res)
            navigate('/dashboard')
        }).catch(err => {
            console.log(err);
            navigate('/login')
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, formData);
            console.log('Login response:',response.data)
            const token  = `Bearer ${response.data.token}`
            localStorage.setItem('token', token);
            console.log('Stored token : ', localStorage.getItem('token'))
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
        }

    };

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google/callback`,
            '_self'
        );
    };


    console.log("Frontend Url", process.env.REACT_APP_FRONTEND_URL);
    console.log("backend Url", process.env.REACT_APP_API_URL);

    return (
        <>
            <div
                style={{
                    height: "100vh",
                    backgroundColor: "#34abeb",
                }}
            >
                <Box sx={boxstyle}>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={6}>
                            <Box
                                style={{
                                    backgroundImage: `url(${signinImg})`,
                                    backgroundSize: "cover",
                                    marginTop: "40px",
                                    marginLeft: "15px",
                                    marginRight: "15px",
                                    height: "70vh",
                                    color: "#f5f5f5",
                                }}
                            ></Box>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <Box style={{
                                backgroundSize: 'cover',
                                height: '80vh',
                                minHeight: '500px',
                                backgroundColor: '#00002b'
                            }}>
                                <Container >
                                    <Box height={40} />
                                    <Box sx={center}>
                                        <Avatar sx={{ ml: '35px', mb: '4px', bgcolor: '#fca103', color: '#fff' }}>
                                            <AccountCircleIcon />
                                        </Avatar>

                                        <Typography variant='h4' component='h1' sx={{ color: '#ffc300', fontFamily: 'Roboto', fontWeight: 'Bold', letterSpacing: '2px' }}>
                                            LOGIN
                                        </Typography>
                                    </Box>

                                    <Box height={35} />

                                    <form action="" onSubmit={handleSubmit}>
                                        <Grid container spacing={1}>

                                            {/* Email */}

                                            <Grid item xs={12} sx={{ ml: '3em', mr: '3em' }}>
                                                <EmailTextField
                                                    required
                                                    fullWidth
                                                    id='email'
                                                    label='username'
                                                    name='email'
                                                    autoComplete='email'
                                                    placeholder="john@deere.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </Grid>

                                            <Box height={20} />

                                            {/* Password */}

                                            <Grid item xs={12} sx={{ ml: '3em', mr: '3em' }}>
                                                <PasswordTextField
                                                    required
                                                    fullWidth
                                                    id='password'
                                                    label='password'
                                                    name='password'
                                                    autoComplete='new-password'
                                                    placeholder="asecurepassword@123"
                                                    type='password'
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                            </Grid>

                                            {/* Remember Me & Forgot Password */}

                                            <Grid item xs={12} sx={{ ml: '3em', mr: '3em' }}>
                                                <Stack direction='row' spacing={2}>
                                                    <FormControlLabel
                                                        sx={{ width: '60%', color: '#fff' }}
                                                        onClick={() => setRemember(!remember)}
                                                        control={<Checkbox checked={remember} sx={{ color: '#fff' }} />}
                                                        label='Remember Me'

                                                    />
                                                    <Typography
                                                        variant='body1'
                                                        component='span'
                                                        onClick={() => {
                                                            navigate('/reset-password');
                                                        }}
                                                        style={{ marginTop: '10px', cursor: 'pointer', color: '#fff' }}
                                                    >
                                                        Forgot Password?
                                                    </Typography>
                                                </Stack>
                                            </Grid>

                                            {/* Button */}

                                            <Grid item xs={12} sx={{ ml: '5em', mr: '5em' }}>
                                                <Button
                                                    type='submit'
                                                    variant='contained'
                                                    fullWidth='true'
                                                    size='large'
                                                    sx={{
                                                        mt: '10px',
                                                        mr: '20px',
                                                        color: '#fff',
                                                        borderRadius: '28px',
                                                        minWidth: '170px',
                                                        backgroundColor: '#fca103',
                                                        marginBottom: '20px'
                                                    }}
                                                >
                                                    SIGN IN
                                                </Button>
                                            </Grid>


                                            {/* Social Icons Sign in*/}

                                            <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            flexWrap: "wrap",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="contained"
                                                            size="large"
                                                            sx={{
                                                                color: "#ffffff",
                                                                fontSize: '18px', 
                                                                fontFamily: 'roboto', 
                                                                fontWeight: 'medium',
                                                                marginRight: '25px'
                                                            }}
                                                        >
                                                            Directly Sign in with :
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                flexWrap: "nowrap",
                                                                marginTop: { xs: "16px", sm: "0" },
                                                            }}
                                                        >
                                                            <Avatar sx={socialMediaIcon}>
                                                                <GoogleIcon onClick={googleAuth} />
                                                            </Avatar>
                                                            <Avatar
                                                                sx={socialMediaIcon}
                                                                style={{ marginLeft: "20px" }}
                                                            >
                                                                <FacebookIcon  />
                                                            </Avatar>
                                                            <Avatar
                                                                sx={socialMediaIcon}
                                                                style={{ marginLeft: "20px" }}
                                                            >
                                                                <XIcon />
                                                            </Avatar>
                                                        </Box>
                                                    </Box>
                                                </Grid>

                                            {/* Not Registered Yet */}

                                            <Grid item xs={12} sx={{ ml: '3em', mr: '3em' }}>
                                                <Stack directon='row' spacing={2}>
                                                    <Typography
                                                        variant='body1'
                                                        component='span'
                                                        style={{ marginTop: '10px', color: '#fff' }}
                                                    >
                                                        Not registered yet?{" "}
                                                        <span style={{ color: '#beb4fb', cursor: 'pointer' }} onClick={() => { navigate('/') }}>
                                                            Create an account
                                                        </span>
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Container>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    )
}

export default Login