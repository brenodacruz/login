import styles from "./App.module.css"
// src/App.js
// src/App.js
import React, { useEffect, useState } from 'react';
import { fetchUsers } from './Api';

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const usersData = await fetchUsers();
            setUsers(usersData);
        };
        getUsers();
    }, []);

    return (
        <div className={styles.div}>
            <h1>Usuários</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.usuario} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;

