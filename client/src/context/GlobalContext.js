import { createContext, useState, useEffect } from 'react';

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    role: 'public',
    updateRole: () => { },
    fullname: '',
    updateFullname: () => { },
    email: '',
    updateEmail: () => { },
    stories: [],
    updateStories: () => {},
};

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);
    const [fullname, setFullname] = useState(initialContext.fullname);
    const [email, setEmail] = useState(initialContext.email);
    const [stories, setStories] = useState(initialContext.stories);

    useEffect(() => {
        fetch('http://localhost:3001/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.user) {
                    setLoginStatus(true);
                    setRole(data.user.role);
                    setFullname(data.user.fullname);
                    setEmail(data.user.email);
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/api/stories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.list) {
                    setStories(data.list);
                }
            })
            .catch(console.error);
    }, []);

    function updateLoginStatus(status) {
        setLoginStatus(status);
    }

    function updateRole(role) {
        const allowedRoles = ['public', 'admin', 'user'];
        if (allowedRoles.includes(role)) {
            setRole(role);
        }
    }

    function updateFullname(fullname) {
        setFullname(fullname);
    }

    function updateEmail(email) {
        setEmail(email);
    }

    function updateStories(stories) {
        setStories(stories);
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        role,
        updateRole,
        fullname,
        updateFullname,
        email,
        updateEmail,
        stories,
        updateStories,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};