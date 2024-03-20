/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RedirectButton from "../RedirectButto";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

const Item = styled("div")(({ theme, color }) => ({
  backgroundColor: color,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  borderRadius: "10px",
  margin: "10px",
}));

const NestedGrid = ({ user }) => {
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sdgp-cs106-iit-rms-deployment.onrender.com/timetables"
        );
        console.log("Response data:", response.data);
        setTimetableData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const colors = ["#FF9999", "#99FF99", "#9999FF", "#FFFF99"];

  console.log("user", user);

  return (
    <div className="flex flex-col">
      <div className="grid justify-items-end">
        <div className="mr-10">
          <RedirectButton path="/my-timetable" text="Show Daily" />
        </div>
      </div>

      <Box
        sx={{
          flexGrow: 1,
          marginTop: "50px",
          marginLeft: "50px",
          marginRight: "0px",
          border: "2px solid black",
          borderColor: "black",
          padding: "40px",
          width: "90%",
          borderRadius: "30px",
          backgroundColor: "lightgrey",
          "@media screen and (max-width: 768px)": {
            marginLeft: "0",
            marginTop: "20px",
            width: "90%",
            padding: "20px",
          },
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{
            overflowX: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
            (weekday, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "20px", textAlign: "center" }}
                  >
                    {weekday}
                  </Typography>
                  {timetableData
                    .filter(
                      (item) =>
                        item.sessions?.some(
                          (session) => session.day === weekday
                        ) &&
                        item.groupName === user?.group &&
                        item.course === user?.course
                    )
                    .map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {item.sessions
                          .filter((session) => session.day === weekday)
                          .map((session, sessionIndex) => (
                            <div key={sessionIndex}>
                              {session.timeSessions &&
                                Object.keys(session.timeSessions).map(
                                  (timeKey, colorIndex) => (
                                    <Tooltip
                                      key={timeKey}
                                      title={
                                        session.timeSessions[timeKey]?.lecturer
                                      }
                                    >
                                      <Item
                                        color={
                                          session.timeSessions[timeKey] === null
                                            ? "#723E7A"
                                            : "#3E737A"
                                        }
                                        // style={{ fontSize: "15px" }}
                                        sx={{ color: "#fff" }}
                                      >
                                        {/* <span style={{ fontSize: "20px" }}> */}
                                        <div className="flex justify-between mx-0">
                                          <div className="text-[1.4rem]">
                                            {
                                              session.timeSessions[timeKey]
                                                ?.hallID
                                            }
                                          </div>
                                          <div className="flex items-center bg-[#D9D9D9] w-fit text-black rounded-md text-[1.2rem] text-center px-1 align-center">
                                            <div>
                                              {session.timeSessions[
                                                timeKey
                                              ]?.type
                                                .replace("Lecture", "LEC")
                                                .replace("Tutorial", "TUT")}
                                            </div>
                                          </div>
                                          <div className="flex items-center bg-[#D9D9D9] w-fit text-black rounded-full text-[1.2rem] text-center px-1 align-center">
                                            <div>
                                              {
                                                session.timeSessions[timeKey]
                                                  ?.buildingID
                                              }
                                            </div>
                                          </div>
                                        </div>
                                        {/* </span> */}
                                        <div>
                                          <div className="text-sm my-1">
                                            {timeKey === "time_01"
                                              ? "08.30 - 10.30"
                                              : timeKey === "time_02"
                                              ? "10.30 - 12.30"
                                              : timeKey === "time_03"
                                              ? "13.30 - 15.30"
                                              : "15.30 - 17.30"}
                                          </div>
                                        </div>
                                        <div className="text-base my-2">
                                          {/* Apply font size  "Topic" */}
                                          {session.timeSessions[timeKey]
                                            ?.subject ===
                                          "Object Oriented Programming"
                                            ? "OOP"
                                            : session.timeSessions[timeKey]
                                                ?.subject}
                                        </div>
                                      </Item>
                                    </Tooltip>
                                  )
                                )}
                            </div>
                          ))}
                      </div>
                    ))}
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default NestedGrid;
