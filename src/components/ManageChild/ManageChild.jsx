import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageChild = () => {
  const navigate = useNavigate();
  const [childrens, setChildrens] = useState([]);
  const [parents, setParents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newChild, setNewChild] = useState({
    basicInfo: {
      childFullName: "",
      parentGuardianName: "",
      email: "",
      phoneNumber: "",
    },
    diagnosis: "",
    parentId: "",
  });

  useEffect(() => {
    const fetchChildrens = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-child`
        );
        setChildrens(response.data.data);
        console.log("CHILDRENS", childrens);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };
    fetchChildrens();
  }, []);

  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-parents`
        );
        setParents(response.data.data);
      } catch (error) {
        console.error("Error fetching parent details:", error);
      }
    };
    fetchParentDetails();
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name.startsWith("basicInfo.")) {
  //     const field = name.split(".")[1];
  //     setNewChild((prev) => ({
  //       ...prev,
  //       basicInfo: {
  //         ...prev.basicInfo,
  //         [field]: value,
  //       },
  //     }));
  //   } else {
  //     setNewChild((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "parentId") {
      const selectedParent = parents.find((parent) => parent._id === value);
      setNewChild((prev) => ({
        ...prev,
        parentId: value,
        basicInfo: {
          ...prev.basicInfo,
          parentGuardianName: selectedParent.name,
          email: selectedParent.email,
          phoneNumber: selectedParent.phone,
        },
      }));
    } else if (name.startsWith("basicInfo.")) {
      const field = name.split(".")[1];
      setNewChild((prev) => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
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
      setChildrens((prev) => [...prev, response.data.data]);
      setShowModal(false);
      setNewChild({
        basicInfo: {
          childFullName: "",
          parentGuardianName: "",
          email: "",
          phoneNumber: "",
        },
        diagnosis: "",
        parentId: "",
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
      setChildrens((prev) => prev.filter((child) => child?._id !== id));
    } catch (error) {
      console.error("Error deleting child:", error);
    }
  };

  return (
    <div className="p-6 ml-20">
      <div className="p-2 bg-gray-100 max-w-screen max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Manage Childrens</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            Add Child
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mr-10">
          {childrens.length === 0 ? (
            <div className="col-span-full text-center py-4 text-gray-500">
              No childrens found!
            </div>
          ) : (
            childrens.map((child) => (
              <div
                key={child?._id}
                className="bg-white rounded-lg shadow-md w-full overflow-hidden cursor-pointer"
                onClick={() => navigate(`/manage-child/${child?._id}`)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-semibold">
                      {child?.basicInfo?.childFullName
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {child?.basicInfo?.childFullName}
                    </h2>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-semibold">
                        {child?.basicInfo?.phoneNumber}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-semibold">
                        {child?.basicInfo?.email}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(child?._id, child?.name);
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
                    name="basicInfo.childFullName"
                    value={newChild?.basicInfo?.childFullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Child's DOB
                  </label>
                  <input
                    type="date"
                    name="basicInfo.dateOfBirth"
                    value={newChild?.basicInfo?.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Child's Diagnosing
                  </label>
                  <input
                    type="text"
                    name="diognose"
                    value={newChild?.diognose}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Parent
                  </label>
                  <select
                    name="parentId"
                    value={newChild.parentId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="" disabled>
                      Select a Parent
                    </option>
                    {parents.map((parent) => (
                      <option key={parent._id} value={parent._id}>
                        {parent.name}
                      </option>
                    ))}
                  </select>
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
        {/* <div className="overflow-x-auto shadow-md rounded-lg bg-white mt-12">
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
                key={child?._id}
                className="bg-white border-b hover:bg-gray-50 transition duration-150 cursor-pointer"
                onClick={() => navigate(`/manage-child/${child?._id}`)}
              >
                <td className="px-6 py-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${child.name}`}
                    alt={`${child.name} profile`}
                    className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {child?.basicInfo?.childFullName}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {child?.basicInfo?.parentGuardianName}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {child?.basicInfo?.primaryPhone}
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
      </div> */}
      </div>
    </div>
  );
};

export default ManageChild;
