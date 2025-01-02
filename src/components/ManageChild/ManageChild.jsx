import axios from "axios";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const ManageChild = () => {
  const navigate = useNavigate();
  const [childrens, setChildrens] = useState([
    {
      id: 1,
      name: "Kayathri",
      parentName: "Alagarsamy",
      parentPhone: "1234567890",
    },
    {
      id: 2,
      name: "UdhayaSurya",
      parentName: "Surya",
      parentPhone: "9876543210",
    },
  ]);

  // useEffect(() => {
  //   const fetchchildrens = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_WEBSITE}/childrens`
  //       );
  //       setChildrens(response.data);
  //     } catch (error) {
  //       console.error("Error fetching childrens:", error);
  //     }
  //   };
  //   fetchchildrens();
  // }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_WEBSITE}/childrens/${id}`);
      setChildrens((prev) => prev.filter((child) => child.id !== id));
    } catch (error) {
      console.error("Error deleting child:", error);
    }
  };
  console.log("childrens", childrens);
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-10">
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
                Parent's Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold tracking-wider">
                Parent's Phone Number
              </th>

              {/* <th className="px-6 py-3 text-sm font-semibold tracking-wider text-center">
                Verification
              </th> */}
              <th className="px-6 py-3 text-sm font-semibold tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {childrens.map((child) => (
              <tr
                key={child.id}
                className="bg-white border-b hover:bg-gray-50 transition duration-150 cursor-pointer"
                onClick={(e) => {
                  console.log("child.id", child.id);
                  navigate(`/manage-child/${child.id}`);
                }}
              >
                <td className="px-6 py-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${child.name}`}
                    alt={`${child.name} profile`}
                    className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {child.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{child.parentName}</td>
                <td className="px-6 py-4 text-gray-600">{child.parentPhone}</td>

                {/* <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={child.verified}
                    onChange={() => handleVerify(child.id)}
                    className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                </td> */}
                <td
                  className="px-6 py-4 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <button
                    onClick={(e) => {
                      handleDelete(child.id);
                    }}
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
