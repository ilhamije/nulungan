import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        // const tokenString = localStorage.getItem('token');
        const tokenString = localStorage.getItem('accessToken');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        // localStorage.setItem('token', JSON.stringify(userToken));
        localStorage.setItem('accessToken', userToken.access);
        localStorage.setItem('refreshToken', userToken.refresh);
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}