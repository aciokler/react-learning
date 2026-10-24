import './App.css'
import { useAuth } from 'react-oidc-context'
import MyTestComponent from './components/MyTestComponent'
import UsersComponent from "./components/UsersComponent.tsx";

function App() {
    const auth = useAuth();

    if (auth.isLoading) return <div>Loading...</div>;
    if (auth.error) return <div>Error: {auth.error.message}</div>;

    if (auth.isAuthenticated) {
        return (
            <>
                <p>Welcome, {auth.user?.profile.name}!</p>
                <button onClick={() => auth.removeUser()}>Log out</button>
                <MyTestComponent/>
                <UsersComponent/>
            </>
        );
    }
    return <button onClick={() => auth.signinRedirect()}>Log in with OIDC</button>;
}
export default App
