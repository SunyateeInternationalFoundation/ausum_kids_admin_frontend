import axios from "axios";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChildView = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [editedChild, setEditedChild] = useState(null);
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
      const response = await axios.patch(
        `${import.meta.env.VITE_WEBSITE}/manage-child/${id}`
      );
      if (response.data.success) {
        setChild((prev) => ({ ...prev, verified: true }));
        alert("Child verified successfully!");
      }
    } catch (error) {
      console.error("Error verifying child:", error);
    }
  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditedChild(child);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedChild((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_WEBSITE}/manage-child/${id}`,
        editedChild
      );
      setChild(response.data.data);
      setIsEditing(false);
      alert("Child details updated successfully!");
    } catch (error) {
      console.error("Error updating child details:", error);
      alert("Failed to update child details. Please try again.");
    }
  };
  if (!child) return <div>Loading...</div>;
  console.log("child", child);
  return (
    <div className="container mx-auto p-4 ml-20 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="col-span-3 bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Child Details</h2>
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
                className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-white bg-[#db2777]"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </button>
            </div>
          </div>
          <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 ml-10">
            {isEditing ? (
              <>
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="childFullName"
                  value={editedChild?.basicInfo?.childFullName || ""}
                  onChange={handleEditChange}
                  placeholder="Child Name"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="parentGuardianName"
                  value={editedChild?.basicInfo?.parentGuardianName || ""}
                  onChange={handleEditChange}
                  placeholder="Parent/Guardian Name"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="address"
                  value={editedChild?.basicInfo?.address || ""}
                  onChange={handleEditChange}
                  placeholder="Address"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="email"
                  value={editedChild?.basicInfo?.email || ""}
                  onChange={handleEditChange}
                  placeholder="Parent's Email"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="dateOfBirth"
                  value={editedChild?.basicInfo?.dateOfBirth || ""}
                  onChange={handleEditChange}
                  placeholder="Date Of Birth"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="phoneNumber"
                  value={editedChild?.basicInfo?.phoneNumber || ""}
                  onChange={handleEditChange}
                  placeholder="Phone Number"
                />
                <input
                  className="text-gray-600 border rounded px-2 py-1"
                  name="gender"
                  value={editedChild?.basicInfo?.gender || ""}
                  onChange={handleEditChange}
                  placeholder="Gender"
                />
                <p className="text-gray-600">
                  <strong>Verified:</strong> {child.verified ? "Yes" : "No"}
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600">
                  <strong>Child Name:</strong>{" "}
                  {child?.basicInfo?.childFullName || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Parent/Guardian Name:</strong>{" "}
                  {child?.basicInfo?.parentGuardianName || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {child?.basicInfo?.address || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {child?.basicInfo?.email || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Date Of Birth:</strong>{" "}
                  {child?.basicInfo?.dateOfBirth || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Phone Number:</strong>{" "}
                  {child?.basicInfo?.phoneNumber || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Gender:</strong> {child?.basicInfo?.gender || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Verified:</strong> {child.verified ? "Yes" : "No"}
                </p>
              </>
            )}
          </div>
          {isEditing && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
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
        <div className="col-span-2">
          <div className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mb-4">Parent Information</h3>
              <button
                onClick={() =>
                  (window.location.href = `/manage-parents/${child.parentId}`)
                }
                className="inline-flex items-center px-3 py-1.5 bg-[#0d9488] text-white rounded-md text-sm font-medium"
              >
                Go to Parent Profile
              </button>
            </div>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {child?.basicInfo?.parentGuardianName}
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
              <span className="font-semibold">
                Primary Healthcare Provider Name:
              </span>{" "}
              {child?.extraDetails?.medicalInfo
                ?.primaryHealthcareProviderName || "NA"}
            </p>
            <p>
              <span className="font-semibold">
                Primary Healthcare Provider Contact:
              </span>{" "}
              {child?.extraDetails?.medicalInfo
                ?.primaryHealthcareProviderContact || "NA"}
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
            <p>
              <span className="font-semibold">Repetitive Behaviors:</span>{" "}
              {child.extraDetails?.behavioralInfo?.calmingStrategies}
            </p>
            <p>
              <span className="font-semibold">Triggers for Meltdowns:</span>{" "}
              {child.extraDetails?.behavioralInfo?.meltdownTriggers}
            </p>
            <p>
              <span className="font-semibold">Strategies that Help Calm:</span>{" "}
              {child.extraDetails?.behavioralInfo?.repetitiveBehaviors}
            </p>
          </div>
        </div>

        {/* Therapy History */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">
            Education and Therapy History
          </h3>
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
              {child.extraDetails?.therapyHistory?.occupationalTherapy
                ? "Yes"
                : "No"}
            </p>
            <p>
              <span className="font-semibold">ABA:</span>{" "}
              {child.extraDetails?.therapyHistory?.aba ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Additional Therapies:</span>{" "}
              {child.extraDetails?.therapyHistory?.additionalTherapies}
            </p>
            <p>
              <span className="font-semibold">
                Goals Achieved Through Therapy:
              </span>{" "}
              {child.extraDetails?.therapyHistory?.challengesObserved}
            </p>
            <p>
              <span className="font-semibold">Challenges Observed:</span>{" "}
              {child.extraDetails?.therapyHistory?.goalsAchieved}
            </p>
            <p>
              <span className="font-semibold">Strengths and Interests:</span>{" "}
              {child.extraDetails?.therapyHistory?.strengthsAndInterests}
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
              <span className="font-semibold">Reason for Admission:</span>{" "}
              {child?.extraDetails?.admissionGoal?.reasonForAdmission}
            </p>
            <p>
              <span className="font-semibold">Parent/Guardian Goals:</span>{" "}
              {child?.extraDetails?.admissionGoal?.parentGuardianGoals}
            </p>
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
              <span className="font-semibold">
                Preferred Therapy Modalities:
              </span>{" "}
              {child?.extraDetails?.admissionGoal?.preferredTherapyModalities.join(
                ", "
              )}
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
