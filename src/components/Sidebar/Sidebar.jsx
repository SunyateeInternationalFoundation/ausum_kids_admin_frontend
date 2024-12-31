import { useState } from "react";
import {
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaChild,
  FaTools,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isClose, setIsClose] = useState(false);

  const menuItems = [
    { name: "Manage Parents", path: "manage-parents", icon: <FaUsers /> },
    { name: "Manage Child Profiles", path: "manage-child", icon: <FaChild /> },
    { name: "Manage Services", path: "manage-services", icon: <FaTools /> },
    {
      name: "Analytics & Reports",
      path: "analytics-reports",
      icon: <FaChartBar />,
    },
  ];

  return (
    <div
      className={`flex flex-col ${
        isClose ? "w-20" : "w-64"
      } h-screen bg-gray-100 transition-all duration-300 shadow-lg`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isClose && (
          <div className="flex items-center space-x-2">
            {/* <div className="h-10 w-10 bg-gray-300 rounded-full"></div> */}
            <div>
              <h2 className="text-2xl font-bold">Ausum Kids</h2>
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

      <div className="flex flex-col p-4 space-y-6">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="cursor-pointer">
            <div className="flex items-center space-x-4 hover:bg-gray-200 p-2 rounded-md ">
              <span className="text-lg">{item.icon}</span>
              {!isClose && <span>{item.name}</span>}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto p-4 border-t flex items-center justify-between">
        {!isClose && (
          <div>
            <h4 className="font-bold">Kayathri</h4>
            <p className="text-sm text-gray-500">Kayu@email.com</p>
          </div>
        )}
        {/* <div className="h-8 w-8 bg-gray-300 rounded-full"></div> */}
      </div>
    </div>
  );
};

export default Sidebar;
