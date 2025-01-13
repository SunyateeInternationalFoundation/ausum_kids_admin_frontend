import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageParents = () => {
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("grid");
  const [newParent, setNewParent] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    verified: false,
    image: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // useEffect(() => {
  //   const fetchParents = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_WEBSITE}/manage-parents`
  //       );
  //       setParents(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching parents:", error);
  //     }
  //   };
  //   fetchParents();
  // }, []);

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

  // const handleDelete = async (id, name) => {
  //   try {
  //     const isConfirmed = confirm(`Are you sure you want to delete ${name} ?`);
  //     console.log("isConfirmed", isConfirmed);
  //     if (isConfirmed) {
  //       await axios.delete(
  //         `${import.meta.env.VITE_WEBSITE}/manage-parents/${id}`
  //       );

  //       setParents((prev) => prev.filter((parent) => parent.id !== id));
  //     }
  //   } catch (error) {
  //     console.error("Error deleting parent:", error);
  //   }
  // };

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
        verified: false,
        image: "",
      });
    } catch (error) {
      console.error("Error adding parent:", error);
    }
  };

  useEffect(() => {
    const fetchParents = async (page) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-parents?page=${page}`
        );
        setParents(response.data.data);
        setTotalPages(response.data.meta.totalPages);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };
    fetchParents(currentPage);
  }, [currentPage]);

  const handleDelete = async (id, name) => {
    try {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete ${name}?`
      );
      if (isConfirmed) {
        await axios.delete(
          `${import.meta.env.VITE_WEBSITE}/manage-parents/${id}`
        );
        setParents(parents.filter((parent) => parent._id !== id));
      }
    } catch (error) {
      console.error("Error deleting parent:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Parents</h1>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 border rounded-md bg-white text-sm">
            <option value="newly">Newly Added</option>
            <option value="oldest">Oldest Added</option>
            <option value="name">Name</option>
          </select>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Add Parent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {parents.map((parent) => (
          <div
            key={parent._id}
            className="bg-white rounded-lg shadow-md w-full overflow-hidden"
            onClick={() => {
              console.log("parent.id", parent._id);

              navigate(`/manage-parents/${parent._id}`);
            }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={`https://ui-avatars.com/api/?name=${parent.name}`}
                      alt={`${parent.name} profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{parent.name}</div>
                    {/* <div className="text-sm text-gray-500">
                    Added on: {parent.addedOn}
                  </div> */}
                  </div>
                </div>
                {/* <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="h-4 w-4" />
              </button> */}
              </div>
              <div className="flex justify-between gap-4 mt-4">
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-semibold">{parent.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-semibold">{parent.email}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">Address</div>
                <div className="font-semibold">
                  {`${parent.address}, ${parent.city}, ${parent.pincode}`}
                </div>
              </div>
              <div className="mt-4 flex justify-end ">
                <button
                  onClick={() => handleDelete(parent._id, parent.name)}
                  className="bg-pink-100 w-20 rounded-lg text-pink-800 hover:text-red-700 transition duration-150"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-l-md bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 border-t border-b bg-white">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-r-md bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Parent</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newParent.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={newParent.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newParent.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={newParent.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={newParent.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={newParent.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Parent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageParents;
