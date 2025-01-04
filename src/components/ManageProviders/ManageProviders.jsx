import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ManageProviders = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-providers`
        );
        console.log("response", response);
        setProviders(response.data.data);
      } catch (error) {
        console.error("Error fetching Providers:", error);
      }
    };
    fetchProviders();
  }, []);

  const handleDelete = async (id, name) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_WEBSITE}/manage-providers/${id}`
      );
      setProviders((prev) => prev.filter((provider) => provider._id !== id));
    } catch (error) {
      console.error("Error deleting Provider:", error);
    }
  };

  return (
    <div className="p-2 bg-gray-100 mt-5 max-w-screen max-h-screen overflow-y-auto">
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">
                Profile
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">
                Service Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {providers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No Providers found!
                </td>
              </tr>
            )}
            {providers.map((provider) => (
              <tr
                key={provider._id}
                className="bg-white border-b hover:bg-gray-50 transition duration-150 cursor-pointer"
                onClick={() => navigate(`/manage-providers/${provider._id}`)}
              >
                <td className="px-6 py-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${provider.name}`}
                    alt={`${provider.name} profile`}
                    className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {provider.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{provider.phone}</td>
                <td className="px-6 py-4 text-gray-600">{provider.email}</td>
                <td className="px-6 py-4 text-gray-600">
                  {provider.serviceName}
                </td>
                <td
                  className="px-6 py-4 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleDelete(provider._id, provider.name)}
                    className="text-red-500 hover:text-red-700 transition duration-150"
                  >
                    <RiDeleteBin6Line size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProviders;
