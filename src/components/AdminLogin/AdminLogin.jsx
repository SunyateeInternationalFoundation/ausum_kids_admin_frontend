import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminLogin } from "../../store/AdminSlice";
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.trim().length == 0) {
      alert("Invalid Form, Email Address can not be empty");
      return;
    }

    // if (formData.password.length < 8) {
    //   alert(
    //     "Invalid Form, Password must contain greater than or equal to 8 characters."
    //   );
    //   return;
    // }
    try {
      console.log(formData);
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE}/login`,
        formData
      );

      if (response.data.success) {
        console.log("response.data.admin", response.data.admin);
        const data = response.data.admin;
        const payload = {
          adminId: data._id,
          email: data.email,
          isSuperAdmin: data.isSuperAdmin,
          isLogin: true,
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
        };
        setMessage("Login successful!");
        alert("Login successful!");
        setIsError(false);
        dispatch(setAdminLogin(payload));
        navigate("/manage-parents");
      } else {
        setMessage(response.data.message || "Login failed.");
        setIsError(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.message);
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2 text-center pb-5">
            Admin Login
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your email and password to Sign In.
          </p>

          {message && (
            <div
              className={`mb-4 ${isError ? "text-red-500" : "text-green-500"}`}
            >
              {message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Your email</label>
              <input
                type="email"
                name="email"
                placeholder="name@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              SIGN IN
            </button>
          </form>
        </div>

        <div className="hidden md:block bg-black"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
