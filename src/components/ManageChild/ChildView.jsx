import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChildView = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedChild, setEditedChild] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-child/${id}`
        );
        setChild(response.data.data);
        setEditedChild(response.data.data);
      } catch (error) {
        console.error("Error fetching child details:", error);
      }
    };
    fetchChildDetails();
  }, [id]);
  console.log("child", child);
  async function approveChild(id) {
    try {
      await axios.post(`${import.meta.env.VITE_WEBSITE}/manage-child/${id}`);
      setChild((prev) => ({ ...prev, verified: true }));
      alert("Child verified successfully!");
    } catch (error) {
      console.error("Error verifying child:", error);
    }
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedChild(child);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_WEBSITE}/manage-child/${id}`,
        editedChild
      );
      setChild(response.data.data);
      setEditMode(false);
      alert("Child details updated successfully!");
    } catch (error) {
      console.error("Error updating child details:", error);
      alert("Failed to update child details. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedChild((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!child) return <div>Loading...</div>;

  return (
    <div className="p-4 w-full h-full bg-white flex overflow-y-auto">
      <div className="w-full bg-white rounded-lg overflow-y-auto md:flex-row">
        <div className="relative w-full p-4 flex flex-row gap-6">
          <div className="py-6 w-1/4 h-full bg-gray-100 flex items-center rounded-lg justify-center">
            <img
              src={child.image}
              alt={`${child.name}`}
              className="rounded-lg shadow-md object-cover w-64 h-64"
            />
          </div>
          <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 ml-10">
            {editMode ? (
              <>
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="name"
                  value={editedChild.name}
                  onChange={handleChange}
                  placeholder="Child Name"
                />
                <p className="text-gray-600">
                  <strong>Parent's Name:</strong> {child?.parent?.name}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {child?.parent?.address}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Email:</strong> {child?.parent?.email}
                </p>
                <p className="text-gray-600">
                  <strong>City:</strong> {child?.parent?.city}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Phone:</strong> {child?.parent?.phone}
                </p>
                <p className="text-gray-600">
                  <strong>Pincode:</strong> {child?.parent?.pincode}
                </p>
                <p className="text-gray-600">
                  <strong>Verified:</strong> {child.verified ? "Yes" : "No"}
                </p>
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="selectedService"
                  value={editedChild.selectedService}
                  onChange={handleChange}
                  placeholder="Selected Service"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="selectedDate"
                  value={editedChild.selectedDate}
                  onChange={handleChange}
                  placeholder="Selected Date"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="selectedTime"
                  value={editedChild.selectedTime}
                  onChange={handleChange}
                  placeholder="Selected Time"
                />
                <textarea
                  className="text-gray-600 border rounded px-2 py-1"
                  name="notes"
                  value={editedChild.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                />
              </>
            ) : (
              <>
                <p className="text-gray-600">
                  <strong>Child Name:</strong> {child.name}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Name:</strong> {child?.parent?.name}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {child?.parent?.address}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Email:</strong> {child?.parent?.email}
                </p>
                <p className="text-gray-600">
                  <strong>City:</strong> {child?.parent?.city}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Phone:</strong> {child?.parent?.phone}
                </p>
                <p className="text-gray-600">
                  <strong>Pincode:</strong> {child?.parent?.pincode}
                </p>
                <p className="text-gray-600">
                  <strong>Verified:</strong> {child.verified ? "Yes" : "No"}
                </p>
                <p className="text-gray-600">
                  <strong>Selected Service:</strong> {child.selectedService}
                </p>
                <p className="text-gray-600">
                  <strong>Selected Date:</strong> {child.selectedDate}
                </p>
                <p className="text-gray-600">
                  <strong>Selected Time:</strong> {child.selectedTime}
                </p>
                <p className="text-gray-600">
                  <strong>Notes:</strong> {child.notes}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Session Details -{" "}
              <span className="text-gray-500 font-bold">
                {child.selectedService}
              </span>
            </h2>
            {editMode ? (
              <div>
                <button
                  className="bg-violet-800 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-6 ml-3 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-600 font-semibold text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300"
                onClick={handleEdit}
              >
                Edit Child
              </button>
            )}
          </div>
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Session No</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">
                  Service Provider
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {child?.history?.length > 0 &&
                child?.history?.map((service, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {service.sessionNo}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {service.date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {service.time}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {service.serviceProvider}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {service.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-6 right-6 flex space-x-4">
          <button
            className="bg-violet-800 font-semibold text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
            onClick={() => {
              navigate("/manage-parents/" + child?.parent?._id);
            }}
          >
            Go to Parent's Profile
          </button>
          {!child?.verified && (
            <button
              className="bg-violet-800 font-semibold text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
              onClick={() => approveChild(id)}
            >
              Verify Child
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildView;
