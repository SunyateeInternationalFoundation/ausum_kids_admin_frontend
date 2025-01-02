import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ParentsView = () => {
  const { id } = useParams();
  const [parent, setParent] = useState({
    id: 1,
    name: "Kayathri",
    phone: "1234567890",
    email: "kayu@gmail.com",
    address: "120, West Street",
    city: "Tamil Nadu",
    pincode: "600001",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Placeholder image
  });

  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/parents/${id}`
        );
        setParent(response.data);
      } catch (error) {
        console.error("Error fetching parent details:", error);
      }
    };
    fetchParentDetails();
  }, [id]);

  async function approveParent(id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE}/parents/${id}/verify`
      );
      setParent((prev) => ({ ...prev, verified: true }));
      alert("Parent verified successfully!");
    } catch (error) {
      console.error("Error verifying parent:", error);
    }
  }

  if (!parent) return <div>Loading...</div>;

  return (
    <div className="p-8 min-h-screen bg-white flex justify-center items-center overflow-y-auto">
      <div className="max-w-6xl w-full max-w-full bg-white shadow-2xl rounded-lg overflow-y-auto flex flex-col md:flex-row relative">
        <div className="w-full md:w-1/3 p-6 bg-gray-100 flex items-center justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1679872282827-ecdb5200142f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={`${parent.name}`}
            className="rounded-lg shadow-md object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-2/3 p-8 relative">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {parent.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            <p className="text-gray-600">
              <strong>Phone:</strong> {parent.phone}
            </p>

            <p className="text-gray-600">
              <strong>Address:</strong> {parent.address}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {parent.email}
            </p>
            <p className="text-gray-600">
              <strong>City:</strong> {parent.city}
            </p>
            <p className="text-gray-600">
              <strong>Verified:</strong> {parent.verified ? "Yes" : "No"}
            </p>
            <p className="text-gray-600">
              <strong>Pincode:</strong> {parent.pincode}
            </p>
          </div>

          {!parent.verified && (
            <button
              className="absolute bottom-6 right-6 bg-violet-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
              onClick={() => approveParent(id)}
            >
              Approve Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentsView;
