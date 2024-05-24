import React, { useState } from "react";
import {
    Box,
    Grid,
    Button,
    Typography,
    Container,
    Avatar,
    Checkbox,
    InputLabel,
    InputBase,
    Link,
    Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import signupImg from "../../assets/images/signup.svg";
import SquareIcon from "@mui/icons-material/Square";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const boxstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "90%",
    bgcolor: "background.paper",
};

const left = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    textAlign: "left",
    marginLeft: "45px",
};

const flexContainer = {
    display: "flex",
    alignItems: "center",
    marginTop: "-20px",
    marginBottom: "65px",
};

const iconStyle = {
    marginRight: "8px",
    padding: "5px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    height: "24px",
    width: "24px",
    color: "#000",
};

const iconInnerStyle = {
    fontSize: "20px",
};

const CustomInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
        border: "1px solid",
        borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
        fontSize: 16,
        width: "auto",
        padding: "10px 12px",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isValidEmail = (email) => {
        // Basic email validation regex
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(formData.email)) {
            alert("Invalid email format");
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/signup`,
                formData
            );
            if (res.data.status === "success") {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during registration:", error.response || error.message || error);
        }
    };

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_API_URL}/api/auth/google/callback`,
            '_self'
        );
    };

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
                                    backgroundSize: "cover",
                                    backgroundColor: "#ffffff",
                                    height: "75vh",
                                    minHeight: "500px",
                                }}
                            >
                                <Container>
                                    <Box height={40} />
                                    <Box sx={left}>
                                        <Box sx={flexContainer}>
                                            <Avatar sx={iconStyle}>
                                                <SquareIcon sx={iconInnerStyle} />
                                            </Avatar>
                                            <Typography
                                                component="h1"
                                                variant="h6"
                                                sx={{ fontSize: "16px" }}
                                            >
                                                CREDITER
                                            </Typography>
                                        </Box>
                                        <Typography
                                            component="h1"
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                fontSize: "36px",
                                                fontWeight: "bold",
                                                fontFamily: "Roboto",
                                                lineHeight: "0.25",
                                            }}
                                        >
                                            Sign Up Today To
                                        </Typography>
                                        <Typography
                                            component="h1"
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                fontSize: "36px",
                                                fontWeight: "bold",
                                                fontFamily: "Roboto",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            Receive $500 in Credits
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                            sx={{
                                                fontFamily: "Roboto",
                                                letterSpacing: "1px",
                                                color: "#333",
                                                marginBottom: "30px",
                                                fontSize: "15px",
                                            }}
                                        >
                                            If you sign up today, we'll send you $500 in credits.{" "}
                                            <br />
                                            You'll grow your business without spending lots of <br />{" "}
                                            money on marketing.
                                        </Typography>

                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={2} alignItems="center">
                                                {/* First Name */}

                                                <Grid item xs={12} sm={6}>
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "bold",
                                                            fontFamily: "roboto",
                                                            color: "#000",
                                                            marginBottom: "-15px",
                                                        }}
                                                    >
                                                        FIRST NAME
                                                    </InputLabel>
                                                    <CustomInput
                                                        defaultValue="John"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        id="firstName"
                                                        required
                                                    />
                                                </Grid>

                                                {/* Last Name */}

                                                <Grid item xs={12} sm={6}>
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "bold",
                                                            fontFamily: "roboto",
                                                            color: "#000",
                                                            marginBottom: "-15px",
                                                        }}
                                                    >
                                                        LAST NAME
                                                    </InputLabel>
                                                    <CustomInput
                                                        defaultValue="Deere"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        id="lastName"
                                                        required
                                                    />
                                                </Grid>

                                                {/* Email */}

                                                <Grid item xs={12} sm={6}>
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "bold",
                                                            fontFamily: "roboto",
                                                            color: "#000",
                                                            marginBottom: "-15px",
                                                        }}
                                                    >
                                                        EMAIL
                                                    </InputLabel>
                                                    <CustomInput
                                                        defaultValue="john@deere.com"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        id="email"
                                                        required
                                                    />
                                                </Grid>

                                                {/* Password */}

                                                <Grid item xs={12} sm={6}>
                                                    <InputLabel
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "bold",
                                                            fontFamily: "roboto",
                                                            color: "#000",
                                                            marginBottom: "-15px",
                                                        }}
                                                    >
                                                        PASSWORD
                                                    </InputLabel>
                                                    <CustomInput
                                                        defaultValue="asecurepassword123"
                                                        name="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        id="password"
                                                        required
                                                    />
                                                </Grid>

                                                {/* Show Password */}

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            marginTop: "-10px",
                                                            marginLeft: "220px",
                                                        }}
                                                    >
                                                        <Checkbox {...label} size="small" onChange={(e) => setShowPassword(e.target.checked)} />
                                                        <Typography
                                                            sx={{
                                                                fontSize: "13px",
                                                                fontWeight: "medium",
                                                                fontFamily: "roboto",
                                                                color: "#778899",
                                                            }}
                                                        >
                                                            Show Password
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                                {/* Button & Social Media Icons */}

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            flexWrap: "wrap",
                                                        }}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            sx={{
                                                                color: "#ffffff",
                                                                background: "#2F4F4F",
                                                                fontSize: "15px",
                                                                textTransform: "none",
                                                                flex: "0 0 50%",
                                                                marginRight: "16px",
                                                                width: { xs: "100%", sm: "80%" },
                                                                maxWidth: "208px",
                                                            }}
                                                            type="submit"
                                                        >
                                                            Get Started
                                                        </Button>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                flexWrap: "nowrap",
                                                                marginTop: { xs: "16px", sm: "0" },
                                                            }}
                                                        >
                                                            <Avatar sx={socialMediaIcon}>
                                                                <GoogleIcon onClick = {googleAuth}/>
                                                            </Avatar>
                                                            <Avatar
                                                                sx={socialMediaIcon}
                                                                style={{ marginLeft: "20px" }}
                                                            >
                                                                <FacebookIcon />
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

                                                {/*Checkbox & Terms & Policy */}

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            marginTop: "-10px",
                                                            justifyContent: "flex-start",
                                                        }}
                                                    >
                                                        <Checkbox {...label} size="small" />
                                                        <Typography
                                                            sx={{
                                                                fontSize: "13px",
                                                                fontWeight: "medium",
                                                                fontFamily: "roboto",
                                                                color: "#778899",
                                                            }}
                                                        >
                                                            I agree to{" "}
                                                            <Link href="#" underline="none">
                                                                {" "}
                                                                Terms of Service{" "}
                                                            </Link>{" "}
                                                            and{" "}
                                                            <Link href="#" underline="none">
                                                                Privacy Policy{" "}
                                                            </Link>
                                                            .
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                                {/* Already have an account */}

                                                <Grid item xs={12}>
                                                    <Stack directon="row" spacing={2}>
                                                        <Typography variant="body1" component="span">
                                                            Already have an account?{" "}
                                                            <span
                                                                style={{ color: "blue", cursor: "pointer" }}
                                                                onClick={() => {
                                                                    navigate("/login");
                                                                }}
                                                            >
                                                                Sign in here.
                                                            </span>
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Box>
                                </Container>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} lg={6}>
                            <Box
                                style={{
                                    backgroundImage: `url(${signupImg})`,
                                    backgroundSize: "cover",
                                    marginTop: "40px",
                                    marginLeft: "15px",
                                    marginRight: "15px",
                                    height: "80vh",
                                    color: "#f5f5f5",
                                }}
                            ></Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}

export default Register;
