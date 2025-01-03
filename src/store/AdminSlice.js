import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  adminId: "",
  email: "",
  isSuperAdmin: false,
  isLogin: false,
  firstName: "",
  lastName: "",
};

if (localStorage.getItem("admin")) {
  const { email, isSuperAdmin, adminId, firstName, lastName } = JSON.parse(
    localStorage.getItem("admin")
  );

  initialState = {
    adminId,
    email,
    isSuperAdmin,
    isLogin: true,
    firstName,
    lastName,
  };
}

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLogin: (state, action) => {
      const { adminId, email, isSuperAdmin } = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
      state.adminId = adminId;
      state.isLogin = true;
      state.email = email;
      state.isSuperAdmin = isSuperAdmin;
    },
    updateAdminDetails: (state, action) => {
      const { firstName, lastName } = action.payload;
      state.firstName = firstName ?? state.firstName;
      state.lastName = lastName ?? state.lastName;
      const updatedDetails = { ...state, firstName, lastName };
      localStorage.setItem("admin", JSON.stringify(updatedDetails));
    },
    setAdminLogout: (state, action) => {
      localStorage.clear();
      state.adminId = "";
      state.email = "";
      state.isSuperAdmin = false;
      state.isLogin = false;
    },
  },
});

export const { setAdminLogin, setAdminLogout, updateAdminDetails } =
  AdminSlice.actions;

export default AdminSlice.reducer;
