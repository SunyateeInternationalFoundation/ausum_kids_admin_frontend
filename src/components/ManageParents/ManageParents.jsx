import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const ManageParents = () => {
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newParent, setNewParent] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-parents`
        );
        setParents(response.data.data);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };
    fetchParents();
  }, []);

  // const handleVerify = async (id) => {
  //   try {
  //     await axios.put(`${import.meta.env.VITE_WEBSITE}/parents/${id}`);
  //     setParents((prev) =>
  //       prev.map((parent) =>
  //         parent.id === id ? { ...parent, verified: !parent.verified } : parent
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating verification:", error);
  //   }
  // };

  const handleDelete = async (id, name) => {
    try {
      const isConfirmed = confirm(`Are you sure you want to delete ${name} ?`);
      console.log("isConfirmed", isConfirmed);
      if (isConfirmed) {
        await axios.delete(
          `${import.meta.env.VITE_WEBSITE}/manage-parents/${id}`
        );

        setParents((prev) => prev.filter((parent) => parent.id !== id));
      }
    } catch (error) {
      console.error("Error deleting parent:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_WEBSITE}/manage-parents`,
        newParent
      );
      setParents((prev) => [...prev, newParent]);
      setShowModal(false);
      setNewParent({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
      });
    } catch (error) {
      console.error("Error adding parent:", error);
    }
  };

  return (
    <div className="p-2 bg-gray-100 max-h-screen mt-2 overflow-y-auto">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white p-2 rounded-lg absolute top-4 right-4 mb-10"
      >
        Add Parent
      </button>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Parent</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newParent.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={newParent.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newParent.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={newParent.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={newParent.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={newParent.pincode}
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
                  Add Parent
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
              <th className="px-4 py-2 text-sm font-semibold tracking-wider">
                Profile
              </th>
              <th className="px-4 py-2 text-sm font-semibold tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-sm font-semibold tracking-wider">
                Phone Number
              </th>
              <th className="px-4 py-2 text-sm font-semibold tracking-wider">
                Email
              </th>
              <th className="px-4 py-2 text-sm font-semibold tracking-wider">
                Address
              </th>
              {/* <th className="px-6 py-3 text-sm font-semibold tracking-wider text-center">
                Verification
              </th> */}
              <th className="px-4 py-2 text-sm font-semibold tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent) => (
              <tr
                key={parent._id}
                className="bg-white border-b hover:bg-gray-50 transition duration-150 cursor-pointer"
                onClick={() => {
                  console.log("parent.id", parent._id);
                  navigate(`/manage-parents/${parent._id}`);
                }}
              >
                <td className="px-4 py-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${parent.name}`}
                    alt={`${parent.name} profile`}
                    className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-sm"
                  />
                </td>
                <td className="px-4 py-2 text-gray-700 font-medium">
                  {parent.name}
                </td>
                <td className="px-4 py-2 text-gray-600">{parent.phone}</td>
                <td className="px-4 py-2 text-gray-600">{parent.email}</td>
                <td className="px-4 py-2 text-gray-600">{parent.address}</td>
                {/* <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={parent.verified}
                    onChange={() => handleVerify(parent.id)}
                    className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                </td> */}
                <td
                  className="px-4 py-2 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleDelete(parent._id, parent.name)}
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

export default ManageParents;
