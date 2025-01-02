import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChildView = () => {
  const { id } = useParams();
  const [child, setChild] = useState({
    id: 1,
    name: "Kayathri",
    parentName: "Alagarsamy",
    parentPhone: "1234567890",
    parentEmail: "kayu@gmial.com",
    address: "120, West Street",
    city: "Tamil Nadu",
    pincode: "600001",
    verified: false,
    selectedService: "Speech Therapy",
    selectedDate: "2021-12-12",
    selectedTime: "10:00 AM",
    notes: "This is a test note",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", // Placeholder image
  });
  console.log("id", id);
  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/childrens/${id}`
        );
        setChild(response.data);
      } catch (error) {
        console.error("Error fetching child details:", error);
      }
    };
    fetchChildDetails();
  }, [id]);

  async function approveChild(id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE}/childrens/${id}/verify`
      );
      setChild((prev) => ({ ...prev, verified: true }));
      alert("child verified successfully!");
    } catch (error) {
      console.error("Error verifying child:", error);
    }
  }

  if (!child) return <div>Loading...</div>;

  return (
    <div className="p-8 min-h-screen bg-white flex justify-center items-center overflow-y-auto">
      <div className="max-w-6xl w-full max-w-full bg-white rounded-lg overflow-y-auto flex flex-col md:flex-row relative">
        <div className="w-full md:w-1/3 p-6 bg-gray-100 flex items-center justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1679872282827-ecdb5200142f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={`${child.name}`}
            className="rounded-lg shadow-md object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-2/3 p-8 relative">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {child.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            <p className="text-gray-600">
              <strong>Parent's Name:</strong> {child.parentName}
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> {child.address}
            </p>
            <p className="text-gray-600">
              <strong>Parent's Email:</strong> {child.parentEmail}
            </p>
            <p className="text-gray-600">
              <strong>City:</strong> {child.city}
            </p>
            <p className="text-gray-600">
              <strong>Parent's Phone:</strong> {child.parentPhone}
            </p>
            <p className="text-gray-600">
              <strong>Pincode:</strong> {child.pincode}
            </p>
            <p className="text-gray-600">
              <strong>Verified:</strong> {child.verified ? "Yes" : "No"}
            </p>
            <p className="text-gray-600">
              <strong>Selected Service:</strong> {child.selectedService}
            </p>
            <p className="text-gray-600">
              <strong>Selected Date:</strong> {child.selectedDate}
            </p>
            <p className="text-gray-600">
              <strong>Selected Time:</strong> {child.selectedTime}
            </p>
            <p className="text-gray-600">
              <strong>Notes:</strong> {child.notes}
            </p>
          </div>

          {!child.verified && (
            <button
              className="absolute bottom-6 right-6 bg-violet-800 font-semibold text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
              onClick={() => approveChild(id)}
            >
              Verify Child
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildView;
