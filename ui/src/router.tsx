import { lazy, Suspense } from "react";
import {createBrowserRouter} from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Users = lazy(() => import("./pages/Users.tsx"));


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/users',
                        element: (
                            <Suspense fallback={<div>Loading Users...</div>}>
                                <Users/>
                            </Suspense>
                        )
                    }]
            },
            {
                index:true,
                element: (
                    <Suspense fallback={<div>Loading Home...</div>}>
                        <Home />
                    </Suspense>
                )
            }
        ]
    }]);