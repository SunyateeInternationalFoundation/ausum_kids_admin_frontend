import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ManageChild = () => {
  const navigate = useNavigate();
  const [childrens, setChildrens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newChild, setNewChild] = useState({
    name: "",
    parent: {
      name: "",
      address: "",
      email: "",
      city: "",
      phone: "",
      pincode: "",
    },
    verified: false,
    selectedService: "",
    selectedDate: "",
    selectedTime: "",
    notes: "",
  });

  useEffect(() => {
    const fetchChildrens = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-child`
        );
        setChildrens(response.data.data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };
    fetchChildrens();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("parent.")) {
      const field = name.split(".")[1];
      setNewChild((prev) => ({
        ...prev,
        parent: {
          ...prev.parent,
          [field]: value,
        },
      }));
    } else {
      setNewChild((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE}/manage-child`,
        newChild
      );
      setChildrens((prev) => [...prev, response.data]);
      setShowModal(false);
      setNewChild({
        name: "",
        parent: {
          name: "",
          address: "",
          email: "",
          city: "",
          phone: "",
          pincode: "",
        },
        verified: false,
        selectedService: "",
        selectedDate: "",
        selectedTime: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding child:", error);
    }
  };

  // Handle delete action for a child
  const handleDelete = async (id, name) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_WEBSITE}/manage-child/${id}`);
      setChildrens((prev) => prev.filter((child) => child._id !== id));
    } catch (error) {
      console.error("Error deleting child:", error);
    }
  };

  return (
    <div className="p-2 bg-gray-100 mt-5 max-w-screen max-h-screen overflow-y-auto">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded-lg absolute top-4 right-4 mb-10"
      >
        Add Child
      </button>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Add Child</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Child's Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newChild?.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Parent's Name
                </label>
                <input
                  type="text"
                  name="parent.name"
                  value={newChild?.parent?.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Parent's Email
                </label>
                <input
                  type="email"
                  name="parent.email"
                  value={newChild?.parent?.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Parent's Phone
                </label>
                <input
                  type="text"
                  name="parent.phone"
                  value={newChild?.parent?.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Selected Service
                </label>
                <input
                  type="text"
                  name="selectedService"
                  value={newChild?.selectedService}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Selected Time
                </label>
                <input
                  type="text"
                  name="selectedTime"
                  value={newChild?.selectedTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Selected Date
                </label>
                <input
                  type="text"
                  name="selectedDate"
                  value={newChild?.selectedDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Child
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white mt-12">
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
                Parent's Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">
                Parent's Phone
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {childrens.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No children found!
                </td>
              </tr>
            )}
            {childrens.map((child) => (
              <tr
                key={child._id}
                className="bg-white border-b hover:bg-gray-50 transition duration-150 cursor-pointer"
                onClick={() => navigate(`/manage-child/${child._id}`)}
              >
                <td className="px-6 py-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${child.name}`}
                    alt={`${child.name} profile`}
                    className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {child?.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {child?.parent?.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {child?.parent?.phone}
                </td>
                <td
                  className="px-6 py-4 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleDelete(child._id, child.name)}
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

export default ManageChild;
