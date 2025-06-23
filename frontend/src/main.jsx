import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Error from "./pages/Error.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

// store
import mystore from "./store.js";
// loaders

// actions
import { action as registerAction } from "./pages/Register.jsx";
import { action as loginAction } from "./pages/Login.jsx";

const myrouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction(store),
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction(store),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={mystore}>
      <QueryClientProvider client={queryclient}>
        <RouterProvider router={myrouter}>
          <App />
        </RouterProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
