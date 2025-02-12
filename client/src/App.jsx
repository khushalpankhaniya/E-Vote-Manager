import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Vote from "./pages/Vote.jsx";
import withAuth from "./auth/withAuth.jsx";
import withoutAuth from "./auth/withoutAuth.jsx";
import ForgotPassword from "./pages/forgetPassword.jsx";
import VoteCount from "./pages/VoteCount.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={withAuth(Home)} />
        <Route path="/login" element={withoutAuth(Login)} />
        <Route path="/signup" element={withoutAuth(Signup)} />
        <Route path="/profile" element={withAuth(Profile)} />
        <Route path="/admin-dashboard" element={withAuth(AdminDashboard)} />
        <Route path="/vote" element={withAuth(Vote)} />
        <Route path="/votecount" element={withAuth(VoteCount)} />
        <Route path="/forgetpassword" element={withAuth(ForgotPassword)} />
      </Routes>
    </Router>
  );
};

export default App;
