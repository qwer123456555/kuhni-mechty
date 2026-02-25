import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useYandexMetrika } from "./hooks/useYandexMetrika";
import { Home } from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Gallery from "./pages/Gallery";
import Quiz from "./pages/Quiz";

// Обёртка для хука (хук должен быть внутри BrowserRouter)
function MetrikaTracker() {
  useYandexMetrika();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <MetrikaTracker /> {/* ← добавить эту строку */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;