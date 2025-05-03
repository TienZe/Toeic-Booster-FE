import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";

// Use this workaround to make default MUI styles is overridden by the same specificity styles
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import theme from "./theme";

import "./index.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";
import store from "./stores/index.ts";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setupAxiosInterceptors } from "./axios.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GlobalMessageContainer from "./components/GlobalMessageContainer.tsx";
import AuthInitializer from "./features/auth/components/AuthInitializer.tsx";

setupAxiosInterceptors(store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <GlobalMessageContainer>
                <ToastContainer position="bottom-right" autoClose={4000} />
                <AuthInitializer>
                  <RouterProvider router={router} />
                </AuthInitializer>
              </GlobalMessageContainer>
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
