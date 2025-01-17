import { Outlet, Route, Routes } from "react-router-dom";
import AdminProfile from "../AdminLogin/AdminProfile";
import AnalyticsReports from "../AnalyticsReports/AnalyticsReports";
import ChildView from "../ManageChild/ChildView";
import ManageChild from "../ManageChild/ManageChild";
import ManageParents from "../ManageParents/ManageParents";
import ParentsView from "../ManageParents/ParentsView";
import ManageProviders from "../ManageProviders/ManageProviders";
import ProvidersView from "../ManageProviders/ProvidersView";
import ManageServices from "../ManageServices/ManageServices";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
  return (
    <div>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div
          style={{ width: "100%", paddingLeft: "5rem" }}
          className="bg-gray-100 h-screen"
        >
          <Routes>
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/manage-parents" element={<ManageParents />} />
            <Route path="/manage-parents/:id" element={<ParentsView />} />
            <Route path="/manage-child" element={<ManageChild />} />
            <Route path="/manage-child/:id" element={<ChildView />} />
            <Route path="/manage-services" element={<ManageServices />} />
            <Route path="/manage-providers" element={<ManageProviders />} />
            <Route path="/manage-providers/:id" element={<ProvidersView />} />
            <Route path="/analytics-reports" element={<AnalyticsReports />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
