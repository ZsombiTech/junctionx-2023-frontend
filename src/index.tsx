import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import Error from "./routes/Error";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./routes/Home";
import Register from "./routes/Register";
import ForgotPassword from "./routes/ForgotPassword";
import AuthWrapper from "./components/AuthWrapper";
import RegisterGoogle from "./routes/RegisterGoogle";
import Appointments from "./routes/Appointments";
import Notifications from "./routes/Notifications";
import Settings from "./routes/Settings";
import Patients from "./routes/Patients";
import Logs from "./routes/Logs";
import Statistics from "./routes/Statistics";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/statistics",
    element: (
      <AuthWrapper>
        <Statistics />
      </AuthWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/logs",
    element: (
      <AuthWrapper>
        <Logs />
      </AuthWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/patients",
    element: (
      <AuthWrapper>
        <Patients />
      </AuthWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/settings",
    element: (
      <AuthWrapper>
        <Settings />
      </AuthWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/notifications",
    element: (
      <AuthWrapper>
        <Notifications />
      </AuthWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/appointments",
    element: (
      <AuthWrapper>
        <Appointments />
      </AuthWrapper>
    ),
    errorElement: <Error />,
  },
  {
    path: "/registergoogle",
    element: <RegisterGoogle />,
    errorElement: <Error />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: (
      <AuthWrapper>
        <Login />
      </AuthWrapper>
    ),
  },
  {
    path: "/",
    element: (
      <AuthWrapper>
        <Home />
      </AuthWrapper>
    ),
    errorElement: (
      <AuthWrapper>
        <Error />
      </AuthWrapper>
    ),
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
