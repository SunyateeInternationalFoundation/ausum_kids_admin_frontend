import axios from "axios";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const previewData = {
  id: "1",
  name: "John Doe",
  image: "/placeholder.svg",
  dateOfBirth: "2018-05-15",
  gender: "Male",
  phone: "(555) 123-4567",
  email: "john@example.com",
  address: "123 Main St, City, State",
  verified: false,
  parent: {
    name: "Jane Doe",
    phone: "(555) 987-6543",
    email: "jane@example.com",
    id: "p1",
  },
  preferredLanguage: "English",
  primaryContact: {
    name: "Jane Doe",
    phone: "(555) 987-6543",
    relationship: "Mother",
  },
  secondaryContact: {
    name: "Bob Smith",
    phone: "(555) 246-8135",
    relationship: "Uncle",
  },
  medicalInfo: {
    dateOfDiagnosis: "2022-03-10",
    diagnosingSpecialist: "Dr. Smith",
    coOccurringConditions: "ADHD",
    allergies: "Peanuts",
    medications: "None",
    additionalNotes: "Regular check-ups required",
  },
  behavioralInfo: {
    communicationSkills: "Moderate",
    communicationDetails: "Uses simple sentences",
    socialInteraction: "Good",
    socialInteractionDetails: "Plays well with others",
    sensoryPreferences: "Sensitive to loud sounds",
    sensoryDetails: "Needs quiet environment",
  },
  therapyHistory: {
    schoolName: "Springfield Elementary",
    gradeLevel: "2nd Grade",
    speechTherapy: true,
    occupationalTherapy: true,
    aba: false,
    additionalTherapies: "Music therapy",
  },
  admissionGoal: {
    academicSupportGoal: "Improve reading skills",
    behavioralManagementGoal: "Better focus in class",
    communicationGoal: "Complex sentence formation",
    emergencyContactName: "Jane Doe",
    emergencyContactRelationship: "Mother",
    parentGuardianGoals: "Independence in daily activities",
    preferredTherapyModalities: ["Speech", "OT"],
    reasonForAdmission: "Development support",
    sensoryIntegrationGoal: "Better sound tolerance",
    socialSkillsGoal: "Group participation",
  },
  selectedServices: [
    {
      serviceName: "Speech Therapy",
      startDate: "2023-01-15",
      status: "Active",
    },
    {
      serviceName: "Occupational Therapy",
      startDate: "2023-02-01",
      status: "Active",
    },
  ],
};
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
  }, [id]);
  console.log("child", child);
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
    <div className="container mx-auto p-4 overflow-y-auto">
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
          <div className="p-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/1319763830/photo/portrait-of-smiling-mixed-race-woman-looking-at-camera.jpg?s=2048x2048&w=is&k=20&c=KkJlV0XXR_2nc49c1cvO2_DdRdNvP6qk251Iv77s16Y="
                  alt={child.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-center">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedChild.name}
                    onChange={handleEditChange}
                    className="border rounded-md px-2"
                  />
                ) : (
                  <h3 className="text-2xl font-semibold">{child.name}</h3>
                )}
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    child.verified
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {child.verified ? "Verified" : "Pending Verification"}
                </span>
              </div>
              <div className="w-full space-y-2">
                {["email", "phone", "date of birth", "gender", "address"].map(
                  (field) =>
                    isEditing ? (
                      <div key={field} className="flex justify-between">
                        <span className="text-gray-500 capitalize">
                          {field}:
                        </span>
                        <input
                          type="text"
                          name={field}
                          value={editedChild[field]}
                          onChange={handleEditChange}
                          className="border rounded-md px-2"
                        />
                      </div>
                    ) : (
                      <div key={field} className="flex justify-between">
                        <span className="text-gray-500 capitalize">
                          {field}:
                        </span>
                        <span>{child[field]}</span>
                      </div>
                    )
                )}
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end mt-4">
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
                <span className="font-semibold">Name:</span> {child.parent.name}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {child.parent.phone}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {child.parent.email}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg border shadow-sm mt-5 p-4">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <p>
                  <span className="font-semibold">Preferred Language:</span>{" "}
                  {child.preferredLanguage}
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">Primary Contact</h4>
                  <p>Name: {child.primaryContact.name}</p>
                  <p>Phone: {child.primaryContact.phone}</p>
                  <p>Relationship: {child.primaryContact.relationship}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Secondary Contact</h4>
                  <p>Name: {child.secondaryContact.name}</p>
                  <p>Phone: {child.secondaryContact.phone}</p>
                  <p>Relationship: {child.secondaryContact.relationship}</p>
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
              {child.medicalInfo.dateOfDiagnosis}
            </p>
            <p>
              <span className="font-semibold">Diagnosing Specialist:</span>{" "}
              {child.medicalInfo.diagnosingSpecialist}
            </p>
            <p>
              <span className="font-semibold">Co-occurring Conditions:</span>{" "}
              {child.medicalInfo.coOccurringConditions}
            </p>
            <p>
              <span className="font-semibold">Allergies:</span>{" "}
              {child.medicalInfo.allergies}
            </p>
            <p>
              <span className="font-semibold">Medications:</span>{" "}
              {child.medicalInfo.medications}
            </p>
            <p>
              <span className="font-semibold">Additional Notes:</span>{" "}
              {child.medicalInfo.additionalNotes}
            </p>
          </div>
        </div>

        {/* Behavioral Info */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Behavioral Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Communication Skills:</span>{" "}
              {child.behavioralInfo.communicationSkills}
            </p>
            <p>
              <span className="font-semibold">Communication Details:</span>{" "}
              {child.behavioralInfo.communicationDetails}
            </p>
            <p>
              <span className="font-semibold">Social Interaction:</span>{" "}
              {child.behavioralInfo.socialInteraction}
            </p>
            <p>
              <span className="font-semibold">Social Interaction Details:</span>{" "}
              {child.behavioralInfo.socialInteractionDetails}
            </p>
            <p>
              <span className="font-semibold">Sensory Preferences:</span>{" "}
              {child.behavioralInfo.sensoryPreferences}
            </p>
            <p>
              <span className="font-semibold">Sensory Details:</span>{" "}
              {child.behavioralInfo.sensoryDetails}
            </p>
          </div>
        </div>

        {/* Therapy History */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Therapy History</h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">School Name:</span>{" "}
              {child.therapyHistory.schoolName}
            </p>
            <p>
              <span className="font-semibold">Grade Level:</span>{" "}
              {child.therapyHistory.gradeLevel}
            </p>
            <p>
              <span className="font-semibold">Speech Therapy:</span>{" "}
              {child.therapyHistory.speechTherapy ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Occupational Therapy:</span>{" "}
              {child.therapyHistory.occupationalTherapy ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">ABA:</span>{" "}
              {child.therapyHistory.aba ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Additional Therapies:</span>{" "}
              {child.therapyHistory.additionalTherapies}
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
              {child.admissionGoal.academicSupportGoal}
            </p>
            <p>
              <span className="font-semibold">Behavioral Management Goal:</span>{" "}
              {child.admissionGoal.behavioralManagementGoal}
            </p>
            <p>
              <span className="font-semibold">Communication Goal:</span>{" "}
              {child.admissionGoal.communicationGoal}
            </p>
            <p>
              <span className="font-semibold">Emergency Contact:</span>{" "}
              {child.admissionGoal.emergencyContactName}
            </p>
            <p>
              <span className="font-semibold">
                Emergency Contact Relationship:
              </span>{" "}
              {child.admissionGoal.emergencyContactRelationship}
            </p>
            <p>
              <span className="font-semibold">Parent/Guardian Goals:</span>{" "}
              {child.admissionGoal.parentGuardianGoals}
            </p>
            <p>
              <span className="font-semibold">
                Preferred Therapy Modalities:
              </span>{" "}
              {child.admissionGoal.preferredTherapyModalities.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Reason for Admission:</span>{" "}
              {child.admissionGoal.reasonForAdmission}
            </p>
            <p>
              <span className="font-semibold">Sensory Integration Goal:</span>{" "}
              {child.admissionGoal.sensoryIntegrationGoal}
            </p>
            <p>
              <span className="font-semibold">Social Skills Goal:</span>{" "}
              {child.admissionGoal.socialSkillsGoal}
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
              {child.selectedServices.map((service, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{service.serviceName}</td>
                  <td className="px-4 py-2">{service.startDate}</td>
                  <td className="px-4 py-2">{service.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChildView;
