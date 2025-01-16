import axios from "axios";
import { useEffect, useState } from "react";
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
    serviceName: [],
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
    if (name === "serviceName") {
      setNewProvider((prev) => ({
        ...prev,
        serviceName: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setNewProvider((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProvider = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE}/manage-providers`,
        newProvider
      );
      setProviders((prev) => [...prev, response.data.data]);
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
    <div className="p-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {providers.length === 0 ? (
            <div className="col-span-full text-center py-4 text-gray-500">
              No Providers found!
            </div>
          ) : (
            providers.map((provider) => (
              <div
                key={provider._id}
                className="bg-white rounded-lg shadow-md w-full overflow-hidden cursor-pointer"
                onClick={() => navigate(`/manage-providers/${provider._id}`)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-semibold">
                      {provider.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {provider.name}
                    </h2>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-semibold">{provider.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-semibold">{provider.email}</div>
                    </div>
                  </div>

                  <div className="mt-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(provider._id, provider.name);
                      }}
                      className="bg-pink-100 w-20 rounded-lg text-pink-800 hover:text-red-700 transition duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
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
                  <label className="block mb-2 text-sm font-medium">
                    Phone
                  </label>
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
                    value={newProvider.serviceName.join(", ")}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter services separated by commas"
                    required
                  />
                </div>
                <div className="mb-1">
                  <label className="block mb-2 text-sm font-medium">
                    Email
                  </label>
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
    </div>
  );
};

export default ManageProviders;
