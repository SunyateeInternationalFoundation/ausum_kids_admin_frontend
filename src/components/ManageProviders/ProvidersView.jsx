import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProvidersView = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState({
    id: 1,
    image: "",
    name: "kayu",
    phone: "1233455677",
    email: "kayu@gmail.com",
    serviceName: "autism therapy",
    address: "bangalore",
    city: "bangalore",
    pincode: "560001",
  });

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-providers/${id}`
        );

        setProvider(response.data.data);
      } catch (error) {
        console.error("Error fetching provider details:", error);
      }
    };
    fetchProviderDetails();
  }, [id]);
  console.log(provider);
  async function approveProvider(id) {
    try {
      await axios.post(
        `${import.meta.env.VITE_WEBSITE}/manage-providers/${id}`
      );
      setProvider((prev) => ({ ...prev, verified: true }));
      alert("provider verified successfully!");
    } catch (error) {
      console.error("Error verifying provider:", error);
    }
  }

  if (!provider) return <div>Loading...</div>;

  return (
    <div className="p-8 min-h-screen bg-white flex justify-center items-center overflow-y-auto">
      <div className="w-full max-w-full bg-white rounded-lg overflow-y-auto flex flex-col md:flex-row relative">
        <div className="w-full md:w-1/3 p-6 bg-gray-100 flex items-center justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1679872282827-ecdb5200142f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={`${provider.name}`}
            className="rounded-lg shadow-md object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-2/3 p-8 relative">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {provider.serviceName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            <p className="text-gray-600">
              <strong>Name:</strong> {provider.name}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {provider.phone}
            </p>

            <p className="text-gray-600">
              <strong>Address:</strong> {provider.address}
            </p>
            <p className="text-gray-600">
              <strong>Selected Service:</strong> {provider.serviceName}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {provider.email}
            </p>
            <p className="text-gray-600">
              <strong>City:</strong> {provider.city}
            </p>
            <p className="text-gray-600">
              <strong>Verified:</strong> {provider.verified ? "Yes" : "No"}
            </p>
            <p className="text-gray-600">
              <strong>Pincode:</strong> {provider.pincode}
            </p>
          </div>

          {!provider.verified && (
            <button
              className="absolute bottom-6 right-6 bg-violet-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
              onClick={() => approveProvider(id)}
            >
              Approve Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProvidersView;
