import axios from "axios";
import { Calendar, Check, IndianRupee, Pencil } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ParentsView = () => {
  const { id } = useParams();
  const [parent, setParent] = useState({
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St",
    city: "New York",
    pincode: "10001",
    verified: false,
    image:
      "https://media.istockphoto.com/id/2052635887/photo/portrait-of-indian-young-woman-wearing-casual-clothing-isolated-on-white-background-stock.jpg?s=2048x2048&w=is&k=20&c=v_ZKLokz6oua50P-EXsKiddd8An8ktEJWLc0xo2Ycww=",
    children: [
      { id: "1", name: "Emma Johnson", age: 8 },
      { id: "2", name: "Noah Johnson", age: 6 },
    ],
    totalSessions: 24,
    totalSpent: 2400,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedParent, setEditedParent] = useState(parent);

  async function approveParent(id) {
    try {
      await axios.patch(`${import.meta.env.VITE_WEBSITE}/manage-parents/${id}`);
      setParent((prev) => ({ ...prev, verified: true }));
      alert("Parent verified successfully!");
    } catch (error) {
      console.error("Error verifying parent:", error);
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedParent((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_WEBSITE}/manage-parents/${id}`,
        editedParent
      );
      setParent(editedParent);
      setIsEditing(false);
      alert("Parent details updated successfully!");
    } catch (error) {
      console.error("Error updating parent:", error);
    }
  };
  // useEffect(() => {
  //   const fetchParentDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_WEBSITE}/manage-parents/${id}`
  //       );
  //       setParent(response.data.data);
  //       setEditedParent(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching parent details:", error);
  //     }
  //   };
  //   fetchParentDetails();
  // }, [id]);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedParent(parent);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Parent Information Card */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Parent Information</h2>
            <div className="flex gap-2">
              {!parent.verified && (
                <button
                  onClick={() => approveParent(parent.id)}
                  className="inline-flex items-center px-3 py-1.5 bg-[#0d9488] text-white rounded-md text-sm font-medium"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Verify
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
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={parent.image}
                  alt={parent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-center">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedParent.name}
                    onChange={handleEditChange}
                    className="border rounded-md px-2 py-1"
                  />
                ) : (
                  <h3 className="text-2xl font-semibold">{parent.name}</h3>
                )}
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    parent.verified
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {parent.verified ? "Verified" : "Pending Verification"}
                </span>
              </div>
              <div className="w-full space-y-2">
                {["email", "phone", "address", "city", "pincode"].map((field) =>
                  isEditing ? (
                    <div key={field} className="flex justify-between">
                      <span className="text-gray-500 capitalize">{field}:</span>
                      <input
                        type="text"
                        name={field}
                        value={editedParent[field]}
                        onChange={handleEditChange}
                        className="border rounded-md px-2 py-1"
                      />
                    </div>
                  ) : (
                    <div key={field} className="flex justify-between">
                      <span className="text-gray-500 capitalize">{field}:</span>
                      <span>{parent[field]}</span>
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

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold">Children</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {parent?.children?.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-pink-50 border border-pink-200 shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center">
                      <span className="text-lg font-medium">
                        {child.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-sm text-gray-500">Age: {child.age}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-[#db2777]">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Total Sessions</h2>
            <Calendar className="h-4 w-4 text-green-500" />
          </div>
          <div className="px-6 pt-2 pb-4">
            <div className="text-3xl font-bold">{parent.totalSessions}</div>
            <p className="text-xs text-gray-500">Sessions completed</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Total Spent</h2>
            <IndianRupee className="h-4 w-4 text-orange-500" />
          </div>
          <div className="px-6 pt-2 pb-4">
            <div className="text-3xl font-bold">₹{parent.totalSpent}</div>
            <p className="text-xs text-gray-500">Amount spent on sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsView;
