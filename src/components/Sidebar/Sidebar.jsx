import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  LayoutDashboard,
  LogOut,
  Settings,
  Star,
  User,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminLogout } from "../../store/AdminSlice";
import AddAdminModel from "./AddAdminModel";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminDetails = useSelector((state) => state.admin);
  const [isClose, setIsClose] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settingsRef = useRef(null);

  const menuItems = [
    { icon: LayoutDashboard, label: "Manage Parents", path: "/manage-parents" },
    { icon: User, label: "Manage Child Profiles", path: "/manage-child" },
    { icon: Heart, label: "Manage Services", path: "/manage-services" },
    { icon: Star, label: "Analytics & Reports", path: "/analytics-reports" },
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
        isClose ? "w-20" : "w-64"
      } h-screen bg-white transition-all duration-300 shadow-lg overflow-y-auto`}
    >
      <div className="flex items-center justify-between p-6 border-b">
        {!isClose && (
          <div>
            <h2 className="text-2xl font-bold">Ausum Kids</h2>
            <p className="text-sm text-gray-500">
              {`Logged in as ${adminDetails.firstName || adminDetails.email}`}
            </p>
          </div>
        )}
        <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsClose(!isClose)}
        >
          {isClose ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <div className="flex-1 py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="w-4 h-4" />
                {!isClose && <span>{item.label}</span>}
              </button>
            </li>
          ))}

          <li>
            <button
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="w-4 h-4" />
              {!isClose && <span>Settings</span>}
            </button>
            {isSettingsOpen && (
              <ul className="mt-1 ml-6 space-y-1">
                <li>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                    onClick={() => handleNavigation("/admin-profile")}
                  >
                    <User className="w-4 h-4" />
                    {!isClose && <span>Profile</span>}
                  </button>
                </li>
                {adminDetails.isSuperAdmin && (
                  <li>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
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

      <div className="border-t p-4">
        <button
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50"
          onClick={() => {
            dispatch(setAdminLogout());
            window.location.href = "/";
          }}
        >
          <LogOut className="w-4 h-4" />
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
