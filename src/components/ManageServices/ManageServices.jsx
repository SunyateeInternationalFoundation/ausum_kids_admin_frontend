// import axios from "axios";
// import { default as React, default as React, useEffect, useState } from "react";

// const ManageServices = () => {
//   const [services, setServices] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentService, setCurrentService] = useState({
//     id: null,
//     name: "",
//     about: "",
//     price: "",
//   });

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get("/api/services"); // Replace with your API endpoint
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       if (currentService.id) {
//         await axios.put(`/api/services/${currentService.id}`, currentService);
//       } else {
//         await axios.post("/api/services", currentService);
//       }
//       fetchServices();
//       setIsModalOpen(false);
//       setCurrentService({ id: null, name: "", about: "", price: "" });
//     } catch (error) {
//       console.error("Error submitting service:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this service?")) {
//       try {
//         await axios.delete(`/api/services/${id}`);
//         fetchServices();
//       } catch (error) {
//         console.error("Error deleting service:", error);
//       }
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-gray-500 text-xl font-bold text-center mb-6">
//         Manage Services
//       </h1>
//       <div className="flex justify-end mb-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
//           onClick={() => {
//             setCurrentService({ id: null, name: "", about: "", price: "" });
//             setIsModalOpen(true);
//           }}
//         >
//           Add Service
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {services.map((service) => (
//           <div
//             key={service.id}
//             className="bg-white shadow-md p-4 rounded-lg border border-gray-300"
//           >
//             <div className="flex justify-between mb-2">
//               <button
//                 className="text-blue-500 hover:underline"
//                 onClick={() => {
//                   setCurrentService(service);
//                   setIsModalOpen(true);
//                 }}
//               >
//                 Edit
//               </button>
//               <button
//                 className="text-red-500 hover:underline"
//                 onClick={() => handleDelete(service.id)}
//               >
//                 Delete
//               </button>
//             </div>
//             <h2 className="text-lg font-bold text-gray-700">{service.name}</h2>
//             <p className="text-gray-600">{service.about}</p>
//             <p className="text-gray-800 font-semibold">Price: ${service.price}</p>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">
//               {currentService.id ? "Edit Service" : "Add Service"}
//             </h2>
//             <input
//               type="text"
//               placeholder="Service Name"
//               value={currentService.name}
//               onChange={(e) =>
//                 setCurrentService({ ...currentService, name: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <textarea
//               placeholder="About Service"
//               value={currentService.about}
//               onChange={(e) =>
//                 setCurrentService({ ...currentService, about: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded mb-4"
//             ></textarea>
//             <input
//               type="number"
//               placeholder="Price"
//               value={currentService.price}
//               onChange={(e) =>
//                 setCurrentService({ ...currentService, price: e.target.value })
//               }
//               className="w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <div className="flex justify-end">
//               <button
//                 className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={handleSubmit}
//               >
//                 {currentService.id ? "Update" : "Add"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageServices;
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
const initialServices = [
  {
    _id: 1,
    name: "Autism Therapy",
    about: "Specialized therapy for children with autism.",
    price: 2000,
  },
  {
    _id: 2,
    name: "Speech Therapy",
    about: "Improves speech and communication skills.",
    price: 1500,
  },
  {
    _id: 3,
    name: "Occupational Therapy",
    about:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 1800,
  },
  {
    _id: 4,
    name: "Behavior Therapy",
    about: "Addresses challenging behaviors.",
    price: 2200,
  },
  {
    _id: 5,
    name: "Special Education",
    about: "Personalized education for special needs.",
    price: 2500,
  },
  {
    id: 6,
    name: "Psychological Counseling",
    about: "Emotional and mental health support.",
    price: 2000,
  },
];

const ManageServices = () => {
  const [services, setServices] = useState(initialServices);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: null,
    name: "",
    about: "",
    price: "",
  });
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleReadMore = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openModal = (service = null) => {
    setModalOpen(true);
    setCurrentService(service || { _id: null, name: "", about: "", price: "" });
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentService({ id: null, name: "", about: "", price: "" });
  };

  const handleSave = () => {
    if (currentService.id) {
      // Edit service
      setServices((prev) =>
        prev.map((service) =>
          service._id === currentService.id ? currentService : service
        )
      );
    } else {
      // Add new service
      const newService = {
        ...currentService,
        _id: services.length + 1,
      };
      setServices((prev) => [...prev, newService]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((service) => service._id !== id));
    }
  };

  return (
    <div className="p-8 overflow-y-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-violet-800 to-violet-600 text-white font-semibold px-4 py-2 rounded shadow-lg hover:from-violet-700 hover:to-violet-500"
        >
          Add Service
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const isExpanded = expandedIds.includes(service._id);
          return (
            <div
              key={service._id}
              className={`border rounded-lg p-4 shadow-md bg-white flex flex-col justify-between transition-all duration-300 
                h-[350px]
              `}
            >
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  {service.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  {isExpanded
                    ? service.about
                    : `${service.about.slice(0, 200)}...`}
                  {service.about.length > 100 && (
                    <span
                      onClick={() => toggleReadMore(service._id)}
                      className="text-blue-500 cursor-pointer"
                    >
                      {isExpanded ? " Read Less" : " Read More"}
                    </span>
                  )}
                </p>
                <p className="text-gray-800 font-semibold mt-4">
                  Price: ₹{service.price}
                </p>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => openModal(service)}
                  className="bg-green-600 text-white px-4 py-1 rounded shadow-md hover:bg-green-500"
                >
                  <FaEdit className="inline-block mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded shadow-md hover:bg-red-500"
                >
                  <RiDeleteBin6Line className="inline-block mr-2" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {currentService.id ? "Edit Service" : "Add Service"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">
                  Service Name
                </label>
                <input
                  type="text"
                  value={currentService.name}
                  onChange={(e) =>
                    setCurrentService((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">
                  About Service
                </label>
                <textarea
                  value={currentService.about}
                  onChange={(e) =>
                    setCurrentService((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Price</label>
                <input
                  type="number"
                  value={currentService.price}
                  onChange={(e) =>
                    setCurrentService((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
