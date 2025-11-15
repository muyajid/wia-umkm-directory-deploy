import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DaftarUmkm from "./pages/pages-daftar-umkm";
import HomePage from "./pages/pages-homepage";
import DetailUmkm from "./pages/pages-detail-umkm";
import AdminUmkm from "./pages/pages-profile-umkm";
import RegisterPage from "./pages/pages-register-umkm";
import ScrollToTop from "./component/ScrollToTop";


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/daftar-umkm" element={<DaftarUmkm />} />
        <Route path="/umkm/:id" element={<DetailUmkm />} />
        <Route path="/profile-umkm" element={<AdminUmkm />} /> 
        <Route path="/register-page" element={<RegisterPage />} /> 
        {/* <Route path="/login-page" element={<LoginPage />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
