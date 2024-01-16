// Toast
import { Suspense, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
// router
import Account from "features/Account";
import AccountListener from "features/Account/AccountListener";
import SignInScreen from "features/Auth/SignInScreen";
import gardensListScreen from 'features/gardensListScreen';
import UsersListScreen from 'features/UsersListScreen';
import AppDialog from "general/components/AppDialog";
import AppNotFound from "general/components/AppNotFound";
import GuestRoute from "general/components/AppRoutes/GuestRoute";
import PrivateRoute from 'general/components/AppRoutes/PrivateRoute';
import AppToast from 'general/components/AppToast';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DevicesListScreen from "features/DevicesListScreen";

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
                        
                        <Route
                            path=""
                            element={
                                // auth ? (
                                <PrivateRoute>
                                    <UsersListScreen />
                                </PrivateRoute>
                                // ) : (
                                //     <SignInScreen />
                                // )
                            }
                        />
                        <Route
                            path="users"
                            element={
                                // auth ? (
                                <PrivateRoute>
                                    <UsersListScreen />
                                </PrivateRoute>
                                // ) : (
                                //     <SignInScreen />
                                // )
                            }
                        />
                        {/* garden */}
                        <Route
                            path="gardens"
                            element={
                                // auth ? (
                                <PrivateRoute>
                                    <gardensListScreen />
                                </PrivateRoute>
                                // ) : (
                                //     <SignInScreen />
                                // )
                            }
                        />


                        <Route
                            path="devices"
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
            {/* <DashboardListener /> */}
            {/* Firebase Listener */}
            {/* <FirebaseListener /> */}
        </>
    );
}

export default App;
