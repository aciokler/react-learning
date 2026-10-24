import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';

async function fetchAllUsers(accessToken: string) {
    try {
        const results = await fetch('http://localhost:9090/api/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!results.ok) {
            throw new Error(`HTTP error! status: ${results.status}`);
        }
        return await results.json();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function UsersComponent() {
    const auth = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (auth.isAuthenticated && auth.user?.access_token) {
            fetchAllUsers(auth.user.access_token).then(results => {
                setUsers(results);
            });
        }
    }, [auth.isAuthenticated, auth.user?.access_token]);

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user: any) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default UsersComponent;