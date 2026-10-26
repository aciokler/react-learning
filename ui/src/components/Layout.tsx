import { Link, Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export default function Layout() {
    const auth = useAuth();
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('ui-theme');
        return savedTheme === 'light' ? 'light' : 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('ui-theme', theme);
    }, [theme]);

    return (
        <div className="app-shell">
            <nav className="top-nav">
                <Link to="/">Home</Link>
                <Link to="/users">Users</Link>

                <button
                    type="button"
                    className="theme-toggle"
                    onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                    aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                >
                    {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>

                {auth.isAuthenticated && (
                    <button
                        type="button"
                        className="logout-button"
                        onClick={() => void auth.signoutRedirect()}
                    >
                        Log out
                    </button>
                )}
            </nav>
            <main className="page-content">
                <Outlet />
            </main>
        </div>
    );
}
