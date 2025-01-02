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
    totalSessions: 5,
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    history: [
      {
        time: "10:00 AM",
        date: "2021-12-12",
        serviceProvider: "Dr.Smith",
        sessionNo: 1,
        status: "Completed",
      },
      {
        time: "2:00 PM",
        date: "2021-12-15",
        serviceProvider: "Dr.John",
        sessionNo: 2,
        status: "Completed",
      },
      {
        time: "10:00 AM",
        date: "2021-12-12",
        serviceProvider: "Dr.Smith",
        sessionNo: 3,
        status: "Pending",
      },
      {
        time: "2:00 PM",
        date: "2021-12-15",
        serviceProvider: "Dr.John",
        sessionNo: 4,
        status: "Pending",
      },
      {
        time: "10:00 AM",
        date: "2021-12-12",
        serviceProvider: "Dr.Smith",
        sessionNo: 5,
        status: "Pending",
      },
    ],
  });

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
      await axios.post(
        `${import.meta.env.VITE_WEBSITE}/childrens/${id}/verify`
      );
      setChild((prev) => ({ ...prev, verified: true }));
      alert("Child verified successfully!");
    } catch (error) {
      console.error("Error verifying child:", error);
    }
  }

  if (!child) return <div>Loading...</div>;

  return (
    <div className="p-8 w-full h-full bg-white flex justify-center items-center overflow-y-auto">
      <div className="w-full bg-white rounded-lg overflow-y-auto md:flex-row">
        <div className="relative w-full p-8 flex flex-row gap-6">
          <div className="py-6 w-1/4 h-full bg-gray-100 flex items-center rounded-lg justify-center">
            <img
              src={child.image}
              alt={`${child.name}`}
              className="rounded-lg shadow-md object-cover w-64 h-64"
            />
          </div>
          <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 ml-10">
            <p className="text-gray-600">
              <strong>Child Name:</strong> {child.name}
            </p>
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
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Session Details -{" "}
            <span className="text-gray-500 font-bold">
              {child.selectedService}
            </span>
          </h2>
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Session No</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">
                  Service Provider
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {child.history.map((service, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {service.sessionNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {service.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {service.time}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {service.serviceProvider}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {service.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-6 right-6 flex space-x-4">
          <button className="bg-violet-800 font-semibold text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300">
            Go to Parent's Profile
          </button>
          {!child.verified && (
            <button
              className="bg-violet-800 font-semibold text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
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
