import { Routes, Route } from 'react-router-dom';
import Header from "./app/components/Header";
import Home from "./app/pages/Home"
import UMKM from "./app/pages/UMKM"
import Contact from "./app/pages/Contact"
import Survey from "./app/pages/Survey"
import "./styles/App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/umkm" element={<UMKM />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </>
  )
}

export default App
