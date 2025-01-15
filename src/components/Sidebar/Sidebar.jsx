import { useEffect, useRef, useState } from "react";
import {
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaChild,
  FaHandsHelping,
  FaTools,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAdminLogout } from "../../store/AdminSlice";
import AddAdminModel from "./AddAdminModel";
const Sidebar = () => {
  const [isClose, setIsClose] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminDetails = useSelector((state) => state.admin);
  const settingsRef = useRef(null);
  const menuItems = [
    { name: "Manage Parents", path: "/manage-parents", icon: <FaUsers /> },
    { name: "Manage Child Profiles", path: "/manage-child", icon: <FaChild /> },
    { name: "Manage Services", path: "/manage-services", icon: <FaTools /> },
    {
      name: "Analytics & Reports",
      path: "/analytics-reports",
      icon: <FaChartBar />,
    },
    {
      name: "Manage Providers",
      path: "/manage-providers",
      icon: <FaHandsHelping />,
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`flex flex-col ${
        isClose ? "w-20" : "w-64"
      } h-screen bg-white transition-all duration-300 shadow-lg overflow-y-auto`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isClose && (
          <div className="flex items-center space-x-2">
            {/* <div className="h-10 w-10 bg-gray-300 rounded-full"></div> */}
            <div>
              <h2 className="text-2xl font-bold">Ausum Kids</h2>
              <p className="text-xl font-semibold text-gray-500">
                {"Logged in as "}
                {adminDetails.firstName || adminDetails.email}
              </p>
            </div>
          </div>
        )}
        <button
          className="p-2 rounded-md hover:bg-gray-200"
          onClick={() => setIsClose(!isClose)}
        >
          {isClose ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <div className="flex flex-col p-4 space-y-6 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="cursor-pointer">
            <div className="flex items-center space-x-4 text-pink-700 hover:bg-gray-200 p-2 rounded-md ">
              <span className="text-lg">{item.icon}</span>
              {!isClose && <span>{item.name}</span>}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto p-4 border-t flex items-center justify-between relative">
        {!isClose && (
          <div ref={settingsRef}>
            <button
              className="flex items-center space-x-4 hover:bg-gray-200 p-2 rounded-md "
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <IoIosSettings className="text-lg mr-2" />
              Settings
            </button>

            {isOpen && (
              <div className="absolute bottom-14 right-14 bg-white shadow-md border rounded-md w-40 z-50">
                <button
                  className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/admin-profile");
                  }}
                >
                  Profile <FaUser className="mt-1 ml-2" />
                </button>
                {adminDetails.isSuperAdmin && (
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                      setIsModalOpen(true);
                    }}
                  >
                    Add Admin
                  </button>
                )}
                <button
                  className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    dispatch(setAdminLogout());
                    window.location.href = "http://localhost:3000";
                  }}
                >
                  Log Out <FiLogOut className="mt-1 ml-2" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <AddAdminModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
