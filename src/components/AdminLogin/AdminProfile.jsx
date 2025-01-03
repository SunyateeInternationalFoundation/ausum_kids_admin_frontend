import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminDetails } from "../../store/AdminSlice";
const AdminProfile = () => {
  const adminDetails = useSelector((state) => state.admin);
  console.log("adminDetails", adminDetails);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    setFormData({
      firstName: adminDetails?.firstName || "",
      lastName: adminDetails?.lastName || "",
    });
  }, [adminDetails]);
  console.log(formData);
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_WEBSITE}/update-profile`,
        { ...formData, email: adminDetails.email }
      );
      alert(response.data.message || "Profile updated successfully!");
      dispatch(updateAdminDetails(formData));
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
    console.log("Updated Data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white mx-20 shadow-md rounded-md max-h-screen  max-w-screen mt-20 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            className={`w-full border ${
              isEditing ? "border-gray-300" : "border-transparent"
            } p-2 rounded-md`}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            className={`w-full border ${
              isEditing ? "border-gray-300" : "border-transparent"
            } p-2 rounded-md`}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={adminDetails.email}
            disabled
            className="w-full border border-gray-300 p-2 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <button
            className="px-4 py-1 mt-5 bg-blue-500 text-white rounded-md"
            onClick={() => setIsChangePasswordOpen(true)}
          >
            Change Password
          </button>
        </div>

        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleEditToggle}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
