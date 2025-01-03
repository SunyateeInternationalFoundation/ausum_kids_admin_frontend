import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChildView = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-child/${id}`
        );

        setChild(response.data.data);
      } catch (error) {
        console.error("Error fetching child details:", error);
      }
    };
    fetchChildDetails();
  }, [id]);
  console.log(child);
  async function approveChild(id) {
    try {
      await axios.post(`${import.meta.env.VITE_WEBSITE}/manage-child/${id}`);
      setChild((prev) => ({ ...prev, verified: true }));
      alert("Child verified successfully!");
    } catch (error) {
      console.error("Error verifying child:", error);
    }
  }

  if (!child) return <div>Loading...</div>;

  return (
    <div className="p-4 w-full h-full bg-white flex overflow-y-auto">
      <div className="w-full bg-white rounded-lg overflow-y-auto md:flex-row">
        <div className="relative w-full p-4 flex flex-row gap-6">
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
              <strong>Parent's Name:</strong> {child.parent.name}
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> {child.parent.address}
            </p>
            <p className="text-gray-600">
              <strong>Parent's Email:</strong> {child.parent.email}
            </p>
            <p className="text-gray-600">
              <strong>City:</strong> {child.parent.city}
            </p>
            <p className="text-gray-600">
              <strong>Parent's Phone:</strong> {child.parent.phone}
            </p>
            <p className="text-gray-600">
              <strong>Pincode:</strong> {child.parent.pincode}
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
          <button
            className="bg-violet-800 font-semibold text-white py-3 px-6 rounded-lg shadow-lg hover:bg-violet-600 transition duration-300"
            onClick={() => {
              navigate("/manage-parents/" + child.parent._id);
            }}
          >
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
