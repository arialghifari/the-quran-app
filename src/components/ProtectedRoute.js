import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children, loginOnlyPage = true }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && loginOnlyPage) return navigate("/login");
    if (user && !loginOnlyPage) return navigate("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return children;
};

export default ProtectedRoute;
