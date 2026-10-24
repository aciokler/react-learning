import { useAuth } from 'react-oidc-context';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProtectedRoute() {
    const auth = useAuth();

    useEffect(() => {
        // Automatically redirect to OIDC identity provider if not authenticated and not currently loading
        if (!auth.isAuthenticated && !auth.isLoading && !auth.activeNavigator) {
            auth.signinRedirect();
        }
    }, [auth.isAuthenticated, auth.isLoading, auth.activeNavigator]);

    if (auth.isLoading) {
        return <div>Verifying authentication token...</div>;
    }

    if (auth.error) {
        return <div>Authentication error: {auth.error.message}</div>;
    }

    // Render child routes if authenticated
    return auth.isAuthenticated ? <Outlet /> : null;
}