import {
  Calendar,
  Heart,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAdminLogout } from "../../store/AdminSlice";
import AddAdminModel from "./AddAdminModel";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const adminDetails = useSelector((state) => state.admin);
  const [isClose, setIsClose] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settingsRef = useRef(null);

  const menuItems = [
    { icon: LayoutDashboard, label: "Manage Parents", path: "/manage-parents" },
    { icon: User, label: "Manage Child Profiles", path: "/manage-child" },
    { icon: Heart, label: "Manage Therapies", path: "/manage-services" },
    // { icon: Star, label: "Analytics & Reports", path: "/analytics-reports" },
    { icon: Calendar, label: "Manage Providers", path: "/manage-providers" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`flex flex-col ${
        isClose ? "w-28" : "w-58"
      } h-screen bg-white transition-all duration-300 shadow-lg overflow-y-auto`}
    >
      <div className="flex flex-col items-center px-6 py-4 ">
        <img
          src="https://ausumkids.com/wp-content/uploads/2024/08/Untitled-design-6-e1723961711858.png"
          alt="Ausum Kids Logo"
          className="w-20 h-20"
        />
      </div>

      <div className="flex items-center justify-center px-6 py-2 border-b">
        {!isClose && (
          <div className="text-left">
            <h2 className="text-2xl font-bold">Ausum Kids</h2>
            <p className="text-sm text-gray-500">
              {`Logged in as ${adminDetails.firstName || adminDetails.email}`}
            </p>
          </div>
        )}
        {/* <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsClose(!isClose)}
        >
          {isClose ? <ChevronRight /> : <ChevronLeft />}
        </button> */}
      </div>

      <div className="flex-1 py-6 px-5">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-lg text-lg hover:text-blue-600  hover:bg-gray-100
                  ${
                    location.pathname.includes(item.path)
                      ? "text-blue-600 bg-gray-100"
                      : "text-gray-600"
                  }`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="w-6 h-6" />
                {!isClose && <span className="truncate">{item.label}</span>}
              </button>
            </li>
          ))}

          <li>
            <button
              className="w-full flex items-center gap-4 px-5 py-3 rounded-lg text-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="w-6 h-6" />
              {!isClose && <span>Settings</span>}
            </button>
            {isSettingsOpen && (
              <ul className="mt-2 ml-8 space-y-2">
                <li>
                  <button
                    className={`w-full flex items-center gap-4 px-5 py-3 rounded-lg text-lg hover:text-blue-600  hover:bg-gray-100
                    ${
                      location.pathname === "/admin-profile"
                        ? "text-blue-600 bg-gray-100"
                        : "text-gray-600"
                    }`}
                    onClick={() => handleNavigation("/admin-profile")}
                  >
                    <User className="w-5 h-5" />
                    {!isClose && <span>Profile</span>}
                  </button>
                </li>
                {adminDetails.isSuperAdmin && (
                  <li>
                    <button
                      className="w-full flex items-center gap-4 px-5 py-3 rounded-lg text-lg text-gray-600 hover:bg-gray-100"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <span>Add Admin</span>
                    </button>
                  </li>
                )}
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div className="border-t px-5 py-4">
        <button
          className="w-full flex items-center gap-4 px-5 py-3 rounded-lg text-lg text-red-500 hover:bg-red-50"
          onClick={() => {
            dispatch(setAdminLogout());
            window.location.href = "/";
          }}
        >
          <LogOut className="w-5 h-5" />
          {!isClose && <span>Logout</span>}
        </button>
      </div>

      <AddAdminModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
