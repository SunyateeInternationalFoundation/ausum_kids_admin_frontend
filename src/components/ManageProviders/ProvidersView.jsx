import axios from "axios";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ProvidersView = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProvider, setEditedProvider] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [provider, setProvider] = useState(null);
  // {
  //   name: "Dr. Sarah Wilson",
  //   image: "/placeholder.svg",
  //   phone: "1234567890",
  //   email: "sarah.wilson@example.com",
  //   address: "123 Healthcare Ave",
  //   city: "Medical City",
  //   state: "MC",
  //   pincode: "12345",
  //   country: "Hyd",
  //   verified: false,
  //   bio: "Specialized in pediatric therapy with over 10 years of experience.",
  //   services: ["Autism Therapy", "Speech Therapy", "Occupational Therapy"],
  //   languages: ["English", "Tamil", "Telugu"],
  //   stats: {
  //     earnings: "₹15,750",
  //     customers: 45,
  //     sessions: 128,
  //   },
  // }
  const customers = [
    {
      id: 1,
      childName: "Alex Johnson",
      service: "Autism Therapy",
      sessions: 12,
      earnings: "₹1,440",
    },
    {
      id: 2,
      childName: "Emma Davis",
      service: "Speech Therapy",
      sessions: 8,
      earnings: "₹960",
    },
    {
      id: 3,
      childName: "Michael Brown",
      service: "Occupational Therapy",
      sessions: 15,
      earnings: "₹1,800",
    },
  ];

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-providers/${id}`
        );
        setProvider(response.data.data);
        setEditedProvider(response.data.data);
      } catch (error) {
        console.error("Error fetching provider details:", error);
      }
    };
    fetchProviderDetails();
  }, []);

  async function approveProvider(id) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_WEBSITE}/manage-providers/${id}`
      );
      setProvider((prev) => ({ ...prev, verified: true }));
      alert("Provider verified successfully!");
    } catch (error) {
      console.error("Error verifying provider:", error);
    }
  }
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProvider((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    console.log("edited-provider", editedProvider);
    try {
      await axios.put(
        `${import.meta.env.VITE_WEBSITE}/manage-providers/${id}`,
        editedProvider
      );
      setProvider(editedProvider);
      setIsEditing(false);
      alert("Service providers details updated successfully!");
    } catch (error) {
      console.error("Error updating service providers:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProvider(provider);
  };
  if (!provider) return <div>Loading...</div>;

  return (
    <div className="container ml-20 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Provider Details Card */}
        <div className="col-span-3 bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Provider Details</h2>
            <div className="flex gap-2">
              {!provider?.verified && (
                <button
                  onClick={() => approveProvider(provider._id)}
                  className="inline-flex items-center px-3 py-1.5 bg-[#0d9488] text-white rounded-md text-sm font-medium"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </button>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-3 py-1.5  rounded-md text-sm font-medium text-white bg-[#db2777]"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/1319763830/photo/portrait-of-smiling-mixed-race-woman-looking-at-camera.jpg?s=2048x2048&w=is&k=20&c=KkJlV0XXR_2nc49c1cvO2_DdRdNvP6qk251Iv77s16Y="
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-center">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProvider.name}
                    onChange={handleEditChange}
                    className="border rounded-md px-2"
                  />
                ) : (
                  <h3 className="text-2xl font-semibold">{provider.name}</h3>
                )}
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    provider.verified
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {provider.verified ? "Verified" : "Pending Verification"}
                </span>
              </div>
              <div className="w-full space-y-2">
                {[
                  "email",
                  "phone",
                  "address",
                  "city",
                  "state",
                  "pincode",
                  "country",
                ].map((field) =>
                  isEditing ? (
                    <div key={field} className="flex justify-between">
                      <span className="text-gray-500 capitalize">{field}:</span>
                      <input
                        type="text"
                        name={field}
                        value={editedProvider[field]}
                        onChange={handleEditChange}
                        className="border rounded-md px-2"
                      />
                    </div>
                  ) : (
                    <div key={field} className="flex justify-between">
                      <span className="text-gray-500 capitalize">{field}:</span>
                      <span>{provider[field]}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className="col-span-2 bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Overview</h2>
          <div className="space-y-6">
            {/* Total Earnings */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-5 border shadow-sm">
              <div>
                <div className="text-2xl font-bold text-black">
                  {provider?.stats?.earnings}
                </div>
                <p className="text-xs text-gray-500">Total Earnings</p>
              </div>
              <div className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Total Customers */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-5 border shadow-sm">
              <div>
                <div className="text-2xl font-bold text-black">
                  {provider?.stats?.customers}
                </div>
                <p className="text-xs text-gray-500">Total Customers</p>
              </div>
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Total Sessions */}
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-5 border shadow-sm">
              <div>
                <div className="text-2xl font-bold text-black">
                  {provider?.stats?.sessions}
                </div>
                <p className="text-xs text-gray-500">Total Sessions</p>
              </div>
              <div className="text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Customers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Child Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sessions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Earnings
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.childName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.sessions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.earnings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <button
              className="inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Provider Bio & Services */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Provider Information</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Bio</h4>
              <p className="text-sm text-gray-600">{provider.bio}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Services</h4>
              <div className="flex flex-wrap gap-2">
                {provider.services.map((service) => (
                  <span
                    key={service}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                  >
                    {service.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {provider.languages.map((language) => (
                  <span
                    key={language}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvidersView;
