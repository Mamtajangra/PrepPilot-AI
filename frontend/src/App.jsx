import { Routes, Route } from "react-router-dom";
import AIQuiz from "./pages/AIQuiz/AIQuiz";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import GeneratePlan from "./pages/GeneratePlan/GeneratePlan";
import MyPlans from "./pages/MyPlans/MyPlans";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import CalendarPage from "./pages/Calendar/CalendarPage";
import Analytics from "./pages/Analytics/Analytics";
import AIPlanner from "./pages/AIPlanner/AIPlanner";
import Progress from "./pages/Progress/Progress";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ai-quiz" element={<AIQuiz />} />
      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/generate-plan"
        element={
          <ProtectedRoute>
            <GeneratePlan />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-plans"
        element={
          <ProtectedRoute>
            <MyPlans />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-planner"
        element={
          <ProtectedRoute>
            <AIPlanner />
          </ProtectedRoute>
        }
      />

      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;