import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { getMeApi } from "../api";
import { StatusCodes } from "http-status-codes";
import { setCurrentUser } from "../redux/reducers/appReducer";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.app.currentUser);

  useEffect(() => {
    const handleAsyncCall = async () => {
      if (!currentUser) {
        const getMeRequest = await getMeApi();

        if (getMeRequest.status === StatusCodes.OK) {
          dispatch(setCurrentUser(getMeRequest.data));
        } else {
          navigate("/login");
        }
      } else if (location.pathname.includes("login")) {
        navigate("/");
      }
    };
    handleAsyncCall();
  }, [currentUser, dispatch, location.pathname, navigate]);

  return <>{children}</>;
}
