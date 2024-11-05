import { Route, Routes } from "react-router-dom";
import "./App.css";
import LatestNews from "./components/LatestNews";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LatestNews />} />
    </Routes>
  );
}

export default App;
