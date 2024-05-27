/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router';
import Navbar from '../../components/Navbar/Navbar'

function Dashboard() {
    let navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {

        // Check if token is in the URL (for Google OAuth)
        const params = new URLSearchParams(location.search);
        let token = params.get('token');

        if (token) {
            token = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            token = localStorage.getItem('token');
        }

        console.log('Stored token:', token); // Log the token to ensure it's retrieved correctly

        if (token) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
                headers: {
                    Authorization: token,
                }
            }).then(res => {
                console.log('Dashboard response:', res);
            }).catch(err => {
                console.error('Error fetching dashboard:', err);
                navigate('/login');
            });
        } else {
            console.error('No token found');
            navigate('/login');
        }
    }, [location, navigate])
    return (
        <div>
            <Navbar/>
        </div>
    )
}

export default Dashboard