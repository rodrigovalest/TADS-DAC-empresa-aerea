"use client";

import authService from "@/services/auth-service";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    authService.logout()
    .then(() => window.location.href = "/")
    .catch((err) => console.error(err));
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default Logout;
