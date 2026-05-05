import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages/landing/Landing.jsx";
import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { Bookings } from "./pages/bookings/Bookings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/bookings", element: <Bookings /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
