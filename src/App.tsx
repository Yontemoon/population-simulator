import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import DeathSimulator from "./pages/DeathSimulator/DeathSimulator";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="flex-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deaths" element={<DeathSimulator />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
