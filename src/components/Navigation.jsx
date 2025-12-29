import { Component, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./landing/Landing";
import NewUser from "./newUser/NewUser";
import Admin from "./admin/Admin";

const LoginForm = lazy(() => import("./login/Login"));
const Restaurants = lazy(() => import("./restaurants/Restaurants"));
const OAuthSuccess = lazy(() => import("./oauth-success"));

import {
  ADMIN_LANDING_PAGE,
  BASE_PAGE_PATH,
  CREATE_USER_PAGE,
  LANDING_PAGE,
  LOGIN_PAGE,
  OAUTH_PAGE,
  RES_PAGE,
} from "./Constants";
import AuthLayout from "./AuthLayout";
import GlobalSearch from "./globalSearch";

function NavigationWrapper() {
  const location = useLocation();

  // Pages where GlobalSearch should NOT appear
  const hideGlobalSearch = [LOGIN_PAGE, CREATE_USER_PAGE].includes(location.pathname);

  return (
    <>
      {!hideGlobalSearch && <GlobalSearch />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={BASE_PAGE_PATH} element={<Navigate to={LOGIN_PAGE} />} />

          <Route path={LOGIN_PAGE} element={<LoginForm />} />
          <Route path={CREATE_USER_PAGE} element={<NewUser />} />

          <Route element={<AuthLayout />}>
            <Route path={RES_PAGE} element={<Restaurants />} />
            <Route path={LANDING_PAGE} element={<Landing />} />
            <Route path={ADMIN_LANDING_PAGE} element={<Admin />} />
            <Route path={OAUTH_PAGE} element={<OAuthSuccess />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default NavigationWrapper;
