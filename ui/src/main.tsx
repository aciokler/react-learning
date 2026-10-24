import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "react-oidc-context";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const oidcConfig = {
    authority: "http://localhost:8080/realms/demo",
    client_id: "spring-boot-api",
    redirect_uri: window.location.origin,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider {...oidcConfig}>
        <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>,
)
