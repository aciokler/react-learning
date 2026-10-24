import { Link, Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

export default function Layout() {
    const auth = useAuth();

    return (
        <div className="container" data-bs-theme="dark">
            <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }} data-bs-theme="dark">
                <Link to="/">Home</Link>
                <Link to="/users">Users</Link>
                {auth.isAuthenticated && (
                    <button
                        type="button"
                        onClick={() => void auth.signoutRedirect()}
                        style={{ marginLeft: 'auto' }}
                    >
                        Log out
                    </button>
                )}
            </nav>
            <main style={{ padding: '1rem' }}>
                {/* Child route elements render here */}
                <Outlet />
            </main>
        </div>
    );
}
