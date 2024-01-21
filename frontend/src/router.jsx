import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";

import { useSelector } from "react-redux";

const Router = () => {
  const user = useSelector((state) => state.users.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* outside */}
        <Route exact path="/" element={<Landing />} />
        {/* inside COACH */}
        <Route
          path="/home"
          element={
            user && Object.keys(user).length !== 0 ? (
              <Home />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
