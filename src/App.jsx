import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Home from "./components/HomePage/Home";

function App() {
  const adminDetails = useSelector((state) => state.admin);
  const isAuth = adminDetails?.isLogin;
  return (
    <>
      <Routes>
        {!isAuth ? (
          <Route path="/" element={<AdminLogin />}></Route>
        ) : (
          <Route path="/*" element={<Home />}></Route>
        )}
      </Routes>
    </>
  );
}

export default App;
