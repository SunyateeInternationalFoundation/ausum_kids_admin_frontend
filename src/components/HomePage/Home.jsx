import { Outlet, Route, Routes } from "react-router-dom";
import AdminProfile from "../AdminLogin/AdminProfile";
import AnalyticsReports from "../AnalyticsReports/AnalyticsReports";
import ChildView from "../ManageChild/ChildView";
import ManageChild from "../ManageChild/ManageChild";
import ManageParents from "../ManageParents/ManageParents";
import ParentsView from "../ManageParents/ParentsView";
import ManageServices from "../ManageServices/ManageServices";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div style={{ width: "100%" }} className="bg-gray-100">
          <Routes>
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/manage-parents" element={<ManageParents />} />
            <Route path="/manage-parents/:id" element={<ParentsView />} />
            <Route path="/manage-child" element={<ManageChild />} />
            <Route path="/manage-child/:id" element={<ChildView />} />
            <Route path="/manage-services" element={<ManageServices />} />
            <Route path="/analytics-reports" element={<AnalyticsReports />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
