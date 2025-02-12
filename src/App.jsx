import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/protectedRoute";
import LoginToken from "./pages/LoginToken";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginToken />} />

        {/* Proteksi route vote */}
        <Route element={<ProtectedRoute />}>
          <Route path="/vote" element={<VotePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
