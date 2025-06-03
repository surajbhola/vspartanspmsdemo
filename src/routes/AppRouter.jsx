import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {Home} from "../pages/Home/Home";
import About from "../pages/About/About";
import {Team} from "../pages/Team/Team";
import Offerings from "../pages/Offerings/Offerings";
import Resources from "../pages/Resources/Resources";
import Calculators from "../pages/Calculators/Calculators";
import ContactUs from "../pages/ContactUs/ContactUs";


const AppRouter = () => {
  return (
    <Router>
      <Header />

      <main style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/offerings" element={<Offerings />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/calculators" element={<Calculators />} />
          {/* <Route path="/faqs" element={<FAQs />} /> */}
          {/* <Route path="/career" element={<Career />} /> */}
          <Route path="/contact" element={<ContactUs />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default AppRouter;
