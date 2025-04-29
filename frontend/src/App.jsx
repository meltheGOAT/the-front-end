// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";
import Home from "./pages/Home";
// // Import your pages/components
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
// import PremiumPosts from "./pages/PremiumPosts";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute allowedRoles={["author", "admin"]} />}>
            <Route path="/CreatePost" element={<CreatePost />} />
          </Route>
          {/* Premium Content Route - Only for logged-in users */}
          {/* <Route
            element={
              <PrivateRoute allowedRoles={["author", "admin", "reader"]} />
            }
          >
            <Route path="/premium" element={<PremiumPosts />} />
          </Route> */}
          {/* Home Route (Accessible by all) */}
          <Route path="/" element={<Home />} />
          {/* logout route */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
