import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProvidersView = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProvider, setEditedProvider] = useState({});

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-providers/${id}`
        );
        setProvider(response.data.data);
        setEditedProvider(response.data.data);
      } catch (error) {
        console.error("Error fetching provider details:", error);
      }
    };
    fetchProviderDetails();
  }, [id]);

  async function approveProvider(id) {
    try {
      await axios.post(
        `${import.meta.env.VITE_WEBSITE}/manage-providers/${id}`
      );
      setProvider((prev) => ({ ...prev, verified: true }));
      alert("Provider verified successfully!");
    } catch (error) {
      console.error("Error verifying provider:", error);
    }
  }
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProvider((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_WEBSITE}/manage-providers/${id}`,
        editedProvider
      );
      setProvider(editedProvider);
      setIsEditing(false);
      alert("Service providers details updated successfully!");
    } catch (error) {
      console.error("Error updating service providers:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProvider(provider);
  };
  if (!provider) return <div>Loading...</div>;

  return (
    <div className="px-8  min-h-screen bg-white flex justify-between overflow-y-auto">
      <div className="relative w-full max-w-screen mt-10 bg-white rounded-lg ">
        <div className="w-full flex justify-center py-6 bg-gray-100 rounded-t-lg">
          <img
            src="https://plus.unsplash.com/premium_photo-1679872282827-ecdb5200142f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={`${provider.name}`}
            className="rounded-full shadow-md object-cover w-32 h-32"
          />
        </div>

        <div className="w-full p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {provider.serviceName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isEditing ? (
              <>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editedProvider.name}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={editedProvider.phone}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProvider.email}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Service Name</label>
                  <input
                    type="text"
                    name="serviceName"
                    value={editedProvider.serviceName}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={editedProvider.address}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={editedProvider.city}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Pincode:</label>
                  <input
                    type="text"
                    name="pincode"
                    value={editedProvider.pincode}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600">
                  <strong>Name:</strong> {provider.name}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {provider.phone}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {provider.address}
                </p>
                <p className="text-gray-600">
                  <strong>Selected Service:</strong> {provider.serviceName}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {provider.email}
                </p>
                <p className="text-gray-600">
                  <strong>City:</strong> {provider.city}
                </p>
                <p className="text-gray-600">
                  <strong>Verified:</strong> {provider.verified ? "Yes" : "No"}
                </p>
                <p className="text-gray-600">
                  <strong>Pincode:</strong> {provider.pincode}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-violet-800 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-violet-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
            >
              Edit Profile
            </button>
          )}
          {!provider.verified && !isEditing && (
            <button
              className="bg-violet-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
              onClick={() => approveProvider(id)}
            >
              Approve Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProvidersView;
