import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <div className="container">
        <ToastContainer position="top-center" />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
