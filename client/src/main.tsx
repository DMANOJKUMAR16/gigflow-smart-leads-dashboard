import * as React from "react";
import * as ReactDOM from "react-dom/client";import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LeadsPage from "./pages/dashboard/LeadsPage";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient();
ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/leads"
            element={<LeadsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);