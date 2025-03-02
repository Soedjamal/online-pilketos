import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginToken from "./pages/LoginToken";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import SuccessPage from "./pages/SuccessPage";
import LoginName from "./pages/LoginName";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginToken />} />

        {/* Proteksi route vote */}
        <Route element={<ProtectedRoute />}>
          <Route path="/input-name" element={<LoginName />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
