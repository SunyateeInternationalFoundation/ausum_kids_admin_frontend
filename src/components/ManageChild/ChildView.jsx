import axios from "axios";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChildView = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedChild, setEditedChild] = useState(null);
  const [editSection, setEditSection] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/manage-child/${id}`
        );
        setChild(response.data.data);
        setEditedChild(response.data.data);
      } catch (error) {
        console.error("Error fetching child details:", error);
      }
    };
    fetchChildDetails();
  }, []);
  
  async function approveChild(id) {
    try {
      await axios.post(`${import.meta.env.VITE_WEBSITE}/manage-child/${id}`);
      setChild((prev) => ({ ...prev, verified: true }));
      alert("Child verified successfully!");
    } catch (error) {
      console.error("Error verifying child:", error);
    }
  }

  // const handleEdit = () => {
  //   setEditMode(true);
  // };

  const handleCancel = () => {
    setEditMode(false);
    setEditedChild(child);
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await axios.put(
  //       `${import.meta.env.VITE_WEBSITE}/manage-child/${id}`,
  //       editedChild
  //     );
  //     setChild(response.data.data);
  //     setEditMode(false);
  //     alert("Child details updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating child details:", error);
  //     alert("Failed to update child details. Please try again.");
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedChild((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleVerify = () => {
    setChild((prev) => ({ ...prev, verified: true }));
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditSection(section);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedChild((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = () => {
    setEditMode(false);
    setEditSection("");
  };
  if (!child) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 ml-8 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* First Row - First Column */}
        <div className="col-span-3 bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">child Details</h2>
            <div className="flex gap-2">
              {!child.verified && (
                <button
                  onClick={() => approveChild(child._id)}
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
          <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 ml-10">
            {editMode ? (
              <>
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="name"
                  value={editedChild?.basicInfo?.childFullName}
                  onChange={handleChange}
                  placeholder="Child Name"
                />
                <p className="text-gray-600">
                  <strong>Parent's Name:</strong> {child?.basicInfo?.parentGuardianName}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {child?.basicInfo?.address || "Hyderabad"}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Email:</strong> {child?.basicInfo?.email}
                </p>
                <p className="text-gray-600">
                  <strong>City:</strong> {child?.parent?.city || "Hyderbad"}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Phone:</strong> {child?.basicInfo?.phoneNumber}
                </p>
                <p className="text-gray-600">
                  <strong>Pincode:</strong> {child?.parent?.pincode || "500012"}
                </p>
                <p className="text-gray-600">
                  <strong>Verified:</strong> {child.verified ? "Yes" : "No"}
                </p>
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="selectedService"
                  value={editedChild.selectedService}
                  onChange={handleChange}
                  placeholder="Selected Service"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="selectedDate"
                  value={editedChild?.selectedDate}
                  onChange={handleChange}
                  placeholder="Selected Date"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="selectedTime"
                  value={editedChild?.selectedTime}
                  onChange={handleChange}
                  placeholder="Selected Time"
                />
                <textarea
                  className="text-gray-600 border rounded px-2 py-1"
                  name="notes"
                  value={editedChild?.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                />
              </>
            ) : (
              <>
                <p className="text-gray-600">
                  <strong>Child Name:</strong> {child?.basicInfo?.childFullName}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Name:</strong> {child?.basicInfo?.name}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {child?.basicInfo?.address}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Email:</strong> {child?.basicInfo?.email}
                </p>
                <p className="text-gray-600">
                  <strong>City:</strong> {child?.basicInfo?.city || "Hyderabad"}
                </p>
                <p className="text-gray-600">
                  <strong>Parent's Phone:</strong> {child?.basicInfo?.phoneNumber}
                </p>
                <p className="text-gray-600">
                  <strong>Pincode:</strong> {child?.parent?.pincode || "City"}
                </p>
                <p className="text-gray-600">
                  <strong>Verified:</strong> {child.verified ? "Yes" : "No"}
                </p>
                <p className="text-gray-600">
                  <strong>Selected Service:</strong> {child?.selectedService || "Speech therapy"}
                </p>
                <p className="text-gray-600">
                  <strong>Selected Date:</strong> {child?.selectedDate}
                </p>
                <p className="text-gray-600">
                  <strong>Selected Time:</strong> {child?.selectedTime}
                </p>
                <p className="text-gray-600">
                  <strong>Notes:</strong> {child?.notes}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Session Details -{" "}
              <span className="text-gray-500 font-bold">
                {child?.selectedService}
              </span>
            </h2>
            {editMode && (
              <div>
                <button
                  // onClick={handleUpdate}
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

        {/* First Row - Second Column */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mb-4">Parent Information</h3>
              <button
                onClick={() =>
                  (window.location.href = `/parent/${child.parent.id}`)
                }
                className="inline-flex items-center px-3 py-1.5 bg-[#0d9488] text-white rounded-md text-sm font-medium"
              >
                Go to Parent Profile
              </button>
            </div>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">Name:</span> {child?.basicInfo?.parentGuardianName}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {child?.basicInfo?.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {child?.basicInfo?.email}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg border shadow-sm mt-5 p-4">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <p>
                  <span className="font-semibold">Preferred Language:</span>{" "}
                  {child?.basicInfo?.preferredLanguage}
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">Primary Contact</h4>
                  <p>Name: {child?.basicInfo?.primaryContactName}</p>
                  <p>Phone: {child?.basicInfo?.phoneNumber}</p>
                  <p>Relationship: {child?.basicInfo?.primaryRelationship}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Secondary Contact</h4>
                  <p>Name: {child?.basicInfo?.secondaryContactName}</p>
                  <p>Phone: {child?.basicInfo?.secondaryPhone}</p>
                  <p>Relationship: {child?.basicInfo?.secondaryRelationship}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Medical Info */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Medical Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Date of Diagnosis:</span>{" "}
              {child.extraDetails?.medicalInfo?.dateOfDiagnosis}
            </p>
            <p>
              <span className="font-semibold">Diagnosing Specialist:</span>{" "}
              {child?.extraDetails?.medicalInfo?.diagnosingSpecialist}
            </p>
            <p>
              <span className="font-semibold">Co-occurring Conditions:</span>{" "}
              {child?.extraDetails?.medicalInfo?.coOccurringConditions}
            </p>
            <p>
              <span className="font-semibold">Allergies:</span>{" "}
              {child?.extraDetails?.medicalInfo?.allergies}
            </p>
            <p>
              <span className="font-semibold">Medications:</span>{" "}
              {child?.extraDetails?.medicalInfo?.medications}
            </p>
            <p>
              <span className="font-semibold">Additional Notes:</span>{" "}
              {child?.extraDetails?.medicalInfo?.additionalNotes || "NA"}
            </p>
          </div>
        </div>

        {/* Behavioral Info */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Behavioral Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Communication Skills:</span>{" "}
              {child.extraDetails?.behavioralInfo?.communicationSkills}
            </p>
            <p>
              <span className="font-semibold">Communication Details:</span>{" "}
              {child.extraDetails?.behavioralInfo?.communicationDetails}
            </p>
            <p>
              <span className="font-semibold">Social Interaction:</span>{" "}
              {child.extraDetails?.behavioralInfo?.socialInteraction}
            </p>
            <p>
              <span className="font-semibold">Social Interaction Details:</span>{" "}
              {child.extraDetails?.behavioralInfo?.socialInteractionDetails}
            </p>
            <p>
              <span className="font-semibold">Sensory Preferences:</span>{" "}
              {child.extraDetails?.behavioralInfo?.sensoryPreferences}
            </p>
            <p>
              <span className="font-semibold">Sensory Details:</span>{" "}
              {child.extraDetails?.behavioralInfo?.sensoryDetails}
            </p>
          </div>
        </div>

        {/* Therapy History */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Therapy History</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">School Name:</span>{" "}
              {child.extraDetails?.therapyHistory?.schoolName}
            </p>
            <p>
              <span className="font-semibold">Grade Level:</span>{" "}
              {child.extraDetails?.therapyHistory?.gradeLevel}
            </p>
            <p>
              <span className="font-semibold">Speech Therapy:</span>{" "}
              {child.extraDetails?.therapyHistory?.speechTherapy ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Occupational Therapy:</span>{" "}
              {child.extraDetails?.therapyHistory?.occupationalTherapy ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">ABA:</span>{" "}
              {child.extraDetails?.therapyHistory?.aba ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Additional Therapies:</span>{" "}
              {child.extraDetails?.therapyHistory?.additionalTherapies}
            </p>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Admission Goals */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Admission Goals</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Academic Support Goal:</span>{" "}
              {child?.extraDetails?.admissionGoal?.academicSupportGoal}
            </p>
            <p>
              <span className="font-semibold">Behavioral Management Goal:</span>{" "}
              {child?.extraDetails?.admissionGoal?.behavioralManagementGoal}
            </p>
            <p>
              <span className="font-semibold">Communication Goal:</span>{" "}
              {child?.extraDetails?.admissionGoal?.communicationGoal}
            </p>
            <p>
              <span className="font-semibold">Emergency Contact:</span>{" "}
              {child?.extraDetails?.admissionGoal?.emergencyContactName}
            </p>
            <p>
              <span className="font-semibold">
                Emergency Contact Relationship:
              </span>{" "}
              {child?.extraDetails?.admissionGoal?.emergencyContactRelationship}
            </p>
            <p>
              <span className="font-semibold">Parent/Guardian Goals:</span>{" "}
              {child?.extraDetails?.admissionGoal?.parentGuardianGoals}
            </p>
            <p>
              <span className="font-semibold">
                Preferred Therapy Modalities:
              </span>{" "}
              {child?.extraDetails?.admissionGoal?.preferredTherapyModalities.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Reason for Admission:</span>{" "}
              {child?.extraDetails?.admissionGoal?.reasonForAdmission}
            </p>
            <p>
              <span className="font-semibold">Sensory Integration Goal:</span>{" "}
              {child?.extraDetails?.admissionGoal?.sensoryIntegrationGoal}
            </p>
            <p>
              <span className="font-semibold">Social Skills Goal:</span>{" "}
              {child?.extraDetails?.admissionGoal?.socialSkillsGoal}
            </p>
          </div>
        </div>

        {/* Selected Services */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Selected Services</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Service</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* {child.selectedServices.map((service, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{service.serviceName}</td>
                  <td className="px-4 py-2">{service.startDate}</td>
                  <td className="px-4 py-2">{service.status}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChildView;
