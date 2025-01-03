import axios from "axios";
import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ManageChild = () => {
  const navigate = useNavigate();
  const [childrens, setChildrens] = useState([]);

  useEffect(() => {
    const fetchChildrens = async () => {
      try {
        const response = await axios.get( 
          `${import.meta.env.VITE_WEBSITE}/manage-child`
        );
        console.log("response", response);
        setChildrens(response.data.data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };
    fetchChildrens();
  }, []);

  const handleDelete = async (id, name) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!isConfirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_WEBSITE}/manage-child/${id}`);
      setChildrens((prev) => prev.filter((child) => child._id !== id));
    } catch (error) {
      console.error("Error deleting child:", error);
    }
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen mt-5">
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">Profile</th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">Name</th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">Parent's Name</th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">
                Parent's Phone Number
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
                <td className="px-6 py-4 text-gray-700 font-medium">{child.name}</td>
                <td className="px-6 py-4 text-gray-600">{child.parentName}</td>
                <td className="px-6 py-4 text-gray-600">{child.parentPhone}</td>
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
