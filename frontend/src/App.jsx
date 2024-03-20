/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import MyTimetable from "./pages/myTimetable";
import WeeklyTimetable from "./pages/weeklyTimetable";
import Reservation from "./pages/reservations";
import PlannedSessions from "./pages/plannedSessions";
import Navbar from "./components/Navbar";
import ExpandableReviewReservation from "./pages/expandableReviewPage";
import UploadsPage from "./pages/Upload";
import Userprofile from "./pages/UserProfile/index";
import Home from "./pages/home/index";
import Authenticator from "./pages/authentication";
import SplashScreen from "./pages/splashScreen";
import SorryCall from "./components/SorryCall";
import axios from "axios";
import Grouptimetable from "./pages/grouptimetable";

export default function App() {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isWelcome, setIsWelcome] = useState(true);
  const [onBoardUser, setOnBoardUser] = useState();
  const [users, setUsers] = useState();
  const [userFromDB, setUserFromDB] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://sdgp-cs106-iit-rms-deployment.onrender.com/users"
        );
        if (response.status === 200) {
          setUsers(response.data);
          // setOnBoardUser(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the timeout value as needed
  }, []);

  const handleStateChange = (state) => {
    setIsWelcome(state);
  };

  const handleOpen = (open) => {
    setIsSidebar(open);
  };

  const handleUser = (user) => {
    setOnBoardUser(user);
    users?.map((userFromDB) => {
      if (userFromDB.email === user.email) {
        setUserFromDB(userFromDB);
        setIsAuthenticated(true);
      }
    });
    // setIsAuthenticated(true);
  };

  console.log("in app ", isAuthenticated);
  console.log("in app", onBoardUser);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : !isAuthenticated ? (
        <Authenticator userOnBoard={handleUser} />
      ) : isWelcome ? (
        <Home onStateChange={handleStateChange} />
      ) : (
        !isWelcome && (
          <div
            className={`${
              isWelcome && "overflow-hidden"
            }relative flex h-screen`}
          >
            <Navbar onSidebarOpen={handleOpen} />
            <main className="w-full">
              <Topbar />
              <Routes>
                <Route path="/" element={<MyTimetable />} />
                <Route path="/my-timetable" element={<MyTimetable />} />
                <Route
                  path="/reservations"
                  element={<Reservation isSidebarOpen={isSidebar} />}
                />
                <Route path="/planned-sessions" element={<PlannedSessions />} />
                <Route path="/student-grouping" />
                {userFromDB.adminPrivilege ? (
                  <Route
                    path="/review-requests"
                    element={<ExpandableReviewReservation />}
                  />
                ) : (
                  <Route path="/review-requests" element={<SorryCall />} />
                )}
                <Route path="/group-timetable" element={<Grouptimetable />} />
                <Route
                  path="/weekly-timetble"
                  element={<WeeklyTimetable user={userFromDB} />}
                />
                <Route
                  path="/my-profile"
                  element={<Userprofile userFromDB={userFromDB} />}
                />
                <Route path="/data-upload" element={<UploadsPage />} />
              </Routes>
            </main>
          </div>
        )
      )}
    </>
  );
}
