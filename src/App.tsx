import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/core/Layout";
import Home from "./pages/Home";
import Methodology from "./pages/Methodology";
import About from "./pages/About";
import Calculator from "./pages/Calculator";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/methodology" element={<Methodology />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/calculator" element={<Calculator />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
