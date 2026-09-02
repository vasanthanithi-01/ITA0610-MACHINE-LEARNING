import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Preprocessing from "./pages/Preprocessing";
import ModelAdvisor from "./pages/ModelAdvisor";
import PreprocessingResults from "./pages/PreprocessingResults";
import ModelComparison from "./pages/ModelComparison";
import FinalReport from "./pages/FinalReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
	<Route path="/model-advisor" element={<ModelAdvisor />} />
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/preprocessing" element={<Preprocessing />} />
	<Route
  path="/preprocessing-results"
  element={<PreprocessingResults />}
/>
	<Route
  path="/model-comparison"
  element={<ModelComparison />}
/>
	<Route
  path="/report"
  element={<FinalReport />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;