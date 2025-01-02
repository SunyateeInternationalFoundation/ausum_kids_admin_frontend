import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const ManageParents = () => {
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_WEBSITE}/parents/${id}`);
      setParents((prev) => prev.filter((parent) => parent.id !== id));
    } catch (error) {
      console.error("Error deleting parent:", error);
    }
  };
  console.log("parents", parents);
  return (
    <div className="p-2 bg-gray-100 min-h-screen mt-2">
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
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
                key={parent.id}
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
                    onClick={() => handleDelete(parent.id)}
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
