import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ManageProviders = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProvider, setNewProvider] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    serviceName: "",
    email: "",
  });

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProvider((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProvider = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE}/manage-providers`,
        newProvider
      );
      setProviders((prev) => [...prev, response.data]);
      setIsModalOpen(false);
      setNewProvider({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        serviceName: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding Provider:", error);
    }
  };
  return (
    <div className="p-2 bg-gray-100 mt-5 max-w-screen max-h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Providers</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add Provider
        </button>
      </div>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Add New Provider</h2>
            <form onSubmit={handleAddProvider}>
              <div className="mb-1">
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProvider.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block mb-2 text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={newProvider.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block mb-2 text-sm font-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={newProvider.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block mb-2 text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={newProvider.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block mb-2 text-sm font-medium">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={newProvider.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block mb-2 text-sm font-medium">
                  Service Name
                </label>
                <input
                  type="text"
                  name="serviceName"
                  value={newProvider.serviceName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newProvider.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProviders;
