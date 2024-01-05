// Toast
import React from "react";
import { Suspense, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
// router
import AppDialog from "general/components/AppDialog";
import AppNotFound from "general/components/AppNotFound";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInScreen from "features/Auth/SignInScreen";
import SignUpScreen from "features/Auth/SignUpScreen";
import HomeScreen from "features/Home/Screens/HomeScreen";
import GuestRoute from "general/components/AppRoutes/GuestRoute";
import RoomsListScreen from "features/Room/RoomsListScreen";
import DevicesListScreen from "features/Device/DevicesListScreen";
import Dashboard from "features/Dashboard";
import AccountListener from "features/Account/AccountListener";
import Account from "features/Account";
import HomeListener from "features/Home/HomeListener";
import AppToast from "general/components/AppToast";
import PrivateRoute from "general/components/AppRoutes/PrivateRoute";
import RequestToResetPass from "features/Auth/RequestToResetPass";
// Load BS

require("bootstrap/dist/js/bootstrap.min");

const sTag = "[App]";

function App() {
    // MARK: --- Hooks ---
    useEffect(() => {
        console.log(`${sTag} did load`);
        // injectStore(store);

        return () => {
            console.log(`${sTag} will dismiss`);
        };
    }, []);
    // const auth = useSelector((state) => state?.auth?.loggedIn);
    // const auth = UserHelper.checkAccessTokenValid();

    return (
        <>
            {/* Router */}
            {/* <BrowserRouter> */}
            <BrowserRouter>
                {/* Suspense */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {/* Admin */}
                        {/* <Route path="/admin/*" element={<Admin />} /> */}

                        {/* Dashboard */}
                        <Route
                            path=""
                            element={
                                // auth ? (
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                                // ) : (
                                //     <SignInScreen />
                                // )
                            }
                        />
                        <Route
                            path="dashboard"
                            element={
                                // auth ? (
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                                // ) : (
                                //     <SignInScreen />
                                // )
                            }
                        />
                        {/* Home */}
                        <Route
                            path="home"
                            element={
                                // auth ? (
                                <PrivateRoute>
                                    <HomeScreen />
                                </PrivateRoute>
                                // ) : (
                                //     <SignInScreen />
                                // )
                            }
                        />

                        <Route
                            path="rooms-list"
                            element={
                                // auth ? (
                                <PrivateRoute>
                                    <RoomsListScreen />
                                </PrivateRoute>
                                // ) : (
                                //     <SignInScreen />
                                // )
                            }
                        />

                        <Route
                            path="devices-list"
                            element={
                                // auth ? (
                                <PrivateRoute>
                                    <DevicesListScreen />
                                </PrivateRoute>
                                // ) : (
                                //     <SignInScreen />
                                // )
                            }
                        />

                        {/* Account */}
                        <Route
                            path="account/*"
                            element={
                                <PrivateRoute>
                                    <Account />
                                </PrivateRoute>
                            }
                        />
                        {/* Sign in */}
                        <Route
                            path="/sign-in"
                            element={
                                <GuestRoute>
                                    <SignInScreen />
                                </GuestRoute>
                            }
                        />
                        {/* Sign up */}
                        <Route
                            path="/sign-up"
                            element={
                                <GuestRoute>
                                    <SignUpScreen />
                                </GuestRoute>
                            }
                        />

                        {/* Request to reset pass */}
                        <Route
                            path="/request-to-reset-pass"
                            element={
                                <GuestRoute>
                                    <RequestToResetPass />
                                </GuestRoute>
                            }
                        />
                        {/* Not Found */}
                        <Route path="*" element={<AppNotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
            {/* </BrowserRouter> */}

            {/* App Dialog */}
            <AppDialog />
            {/* Toast */}
            <AppToast />
            {/* Listener */}
            {/* <DataCommonListener /> */}
            {/* Account Listener */}
            <AccountListener />
            <HomeListener />
            {/* <DashboardListener /> */}
            {/* Firebase Listener */}
            {/* <FirebaseListener /> */}
        </>
    );
}

export default App;
