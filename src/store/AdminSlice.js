import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  adminId: "",
  email: "",
  isSuperAdmin: false,
  isLogin: false,
};

if (localStorage.getItem("admin")) {
  const { email, isSuperAdmin, adminId } = JSON.parse(
    localStorage.getItem("admin")
  );

  initialState = {
    adminId,
    email,
    isSuperAdmin,
    isLogin: true,
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

    setAdminLogout: (state, action) => {
      localStorage.clear();
      state.adminId = "";
      state.email = "";
      state.isSuperAdmin = false;
      state.isLogin = false;
    },
  },
});

export const { setAdminLogin, setAdminLogout } = AdminSlice.actions;

export default AdminSlice.reducer;
