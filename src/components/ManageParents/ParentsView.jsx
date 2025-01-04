import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ParentsView = () => {
  const { id } = useParams();
  const [parent, setParent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedParent, setEditedParent] = useState({});
  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-parents/${id}`
        );
        setParent(response.data.data);
        setEditedParent(response.data.data);
      } catch (error) {
        console.error("Error fetching parent details:", error);
      }
    };
    fetchParentDetails();
  }, [id]);

  async function approveParent(id) {
    try {
      await axios.patch(`${import.meta.env.VITE_WEBSITE}/manage-parents/${id}`);
      setParent((prev) => ({ ...prev, verified: true }));
      alert("Parent verified successfully!");
    } catch (error) {
      console.error("Error verifying parent:", error);
    }
  }
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedParent((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_WEBSITE}/manage-parents/${id}`,
        editedParent
      );
      setParent(editedParent);
      setIsEditing(false);
      alert("Parent details updated successfully!");
    } catch (error) {
      console.error("Error updating parent:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedParent(parent);
  };
  if (!parent) return <div>Loading...</div>;

  return (
    <div className="px-8 min-h-screen bg-white flex justify-between overflow-y-auto">
      <div className="relative w-full max-w-screen mt-10 bg-white rounded-lg">
        <div className="w-full flex justify-center py-6 bg-gray-100 rounded-t-lg">
          <img
            src="https://plus.unsplash.com/premium_photo-1679872282827-ecdb5200142f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={`${parent.name}`}
            className="rounded-full shadow-md object-cover w-32 h-32"
          />
        </div>

        <div className="w-full p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {parent.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isEditing ? (
              <>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editedParent.name}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={editedParent.phone}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editedParent.email}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={editedParent.address}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={editedParent.city}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Pincode:</label>
                  <input
                    type="text"
                    name="pincode"
                    value={editedParent.pincode}
                    onChange={handleEditChange}
                    className="mt-2 p-2 border rounded"
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {parent.phone}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {parent.address}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {parent.email}
                </p>
                <p className="text-gray-600">
                  <strong>City:</strong> {parent.city}
                </p>
                <p className="text-gray-600">
                  <strong>Verified:</strong> {parent.verified ? "Yes" : "No"}
                </p>
                <p className="text-gray-600">
                  <strong>Pincode:</strong> {parent.pincode}
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
          {!parent.verified && !isEditing && (
            <button
              className="bg-violet-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
              onClick={() => approveParent(id)}
            >
              Approve Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentsView;
