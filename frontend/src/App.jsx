import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppMain from "./AppMain";
import AppCA from "./AppCA";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppMain />} />
        <Route path="ca/*" element={<AppCA />} />
      </Routes>
    </Router>
  );
}

export default App;
