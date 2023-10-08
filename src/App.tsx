import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Thêm các tuyến đường khác */}
      </Routes>
    </Router>
  );
}

export default App;
