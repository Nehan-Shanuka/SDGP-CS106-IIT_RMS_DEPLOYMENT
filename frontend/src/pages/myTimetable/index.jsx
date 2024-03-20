/* eslint-disable no-unused-vars */
import axios from "axios";
import Calender from "../../components/Calender";
import RedirectButton from "../../components/RedirectButto";
import WeeklyTimetable from "../../pages/weeklyTimetable";
import { Button, Card } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const timeSlotes = [
  {
    groupName: "CS-J",
    course: "BSc Computer Science",
    sessions: [
      {
        day: "Monday",
        timeSessions: {
          time_01: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Lecture",
            subject: "Machine Learning",
            lecturer: "Mr. Nipuna Senanayake",
          },
          time_02: null,
          time_03: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Tutorial",
            subject: "Machine Learning",
            lecturer: "Miss Shashi Thilakarathna",
          },
          time_04: null,
        },
      },
      {
        day: "Tuesday",
        timeSessions: {
          time_01: null,
          time_02: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Lecture",
            subject: "Object Oriented Programming",
            lecturer: "Mr. Nipuna Senanayake",
          },
          time_03: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Tutorial",
            subject: "Object Oriented Programming",
            lecturer: "Miss Shashi Thilakarathna",
          },
          time_04: null,
        },
      },
      {
        day: "Wednesday",
        timeSessions: {
          time_01: null,
          time_02: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Lecture",
            subject: "Object Oriented Programming",
            lecturer: "Mr. Nipuna Senanayake",
          },
          time_03: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Tutorial",
            subject: "Object Oriented Programming",
            lecturer: "Miss Shashi Thilakarathna",
          },
          time_04: null,
        },
      },
      {
        day: "Thursday",
        timeSessions: {
          time_01: null,
          time_02: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Lecture",
            subject: "Object Oriented Programming",
            lecturer: "Mr. Nipuna Senanayake",
          },
          time_03: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Tutorial",
            subject: "Object Oriented Programming",
            lecturer: "Miss Shashi Thilakarathna",
          },
          time_04: null,
        },
      },
      {
        day: "Friday",
        timeSessions: {
          time_01: null,
          time_02: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Lecture",
            subject: "Object Oriented Programming",
            lecturer: "Mr. Nipuna Senanayake",
          },
          time_03: {
            buildingID: "SP",
            hallID: "7LA",
            type: "Tutorial",
            subject: "Object Oriented Programming",
            lecturer: "Miss Shashi Thilakarathna",
          },
          time_04: null,
        },
      },
    ],
  },
  {
    hallNumber: "3LB",
    building: "SP",
    moduleName: "Object Oriented Programming",
    time: "10.30-12.30",
    lecturer: "Mr. A. Smith",
    course: "BSc Computer Science (Level 5)",
    groups: ["CS-I", "CS-J", "CS-K", "CS-L"],
    type: "Tutorial",
  },
  {
    hallNumber: null,
    building: null,
    moduleName: "Nothing Scheduled",
    time: "13.30-15.30",
    lecturer: "Not Assigned",
    course: null,
    groups: null,
    type: null,
  },
  {
    hallNumber: "5LB",
    building: "SP",
    moduleName: "Object Oriented Programming",
    time: "08.30-10.30",
    lecturer: "Mr. A. Smith",
    course: "BSc Computer Science (Level 5)",
    groups: ["CS-I", "CS-J", "CS-K", "CS-L"],
    type: "Lecture",
  },
];

export default function MyTimetable() {
  const [selectedDate, setSelectedDate] = useState();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const [day, setDay] = useState(daysOfWeek[today.getDay()]);
  const [timetables, setTimetables] = useState([]);
  const [group, setGroup] = useState("CS-J");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDayChange = (day) => {
    setDay(day);
  };

  useEffect(() => {
    const url = `https://sdgp-cs106-iit-rms-deployment.onrender.com/timetables`;
    axios
      .get(url)
      .then((response) => {
        setTimetables(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [item, setItem] = useState([]);

  useEffect(() => {
    console.log("Timetable", timetables);
    console.log("Day", day);
    // Update the item array whenever the day state changes
    setItem(generateItems());
    // console.log("Item", item);
  }, [day, timetables, group]);

  const filteredTimetable = timetables.filter(
    (slot) => slot.groupName === group
  );

  const generateItems = () => {
    const item = [];
    let sessionsArray = [];

    console.log("Filtered Timetable", filteredTimetable);

    filteredTimetable.forEach((slot) => {
      slot.sessions.forEach((session) => {
        console.log("Day", session.day, " - ", day);
        if (session.day === day) {
          sessionsArray = [];
          console.log("Session", sessionsArray);
          session.timeSessions["time_01"] !== null
            ? sessionsArray.push(session.timeSessions["time_01"])
            : sessionsArray.push(null);
          session.timeSessions["time_02"] !== null
            ? sessionsArray.push(session.timeSessions["time_02"])
            : sessionsArray.push(null);
          session.timeSessions["time_03"] !== null
            ? sessionsArray.push(session.timeSessions["time_03"])
            : sessionsArray.push(null);
          session.timeSessions["time_04"] !== null
            ? sessionsArray.push(session.timeSessions["time_04"])
            : sessionsArray.push(null);
        } else {
          // sessionsArray = [];
          // sessionsArray.push(null);
          // sessionsArray.push(null);
          // sessionsArray.push(null);
          // sessionsArray.push(null);
        }
      });
    });

    console.log("Sessions", sessionsArray);

    for (let i = 0; i < 4; i++) {
      // console.log("I", i);
      if (sessionsArray[i] === null || sessionsArray[i] === undefined) {
        item.push(
          <Box
            sx={{
              backgroundColor:
                sessionsArray[i] !== null && sessionsArray[i] !== undefined
                  ? "#3E737A"
                  : "#723E7A",
              color: "#fff",
              borderRadius: 5,
              padding: 2,
              justifyContent: "space-between",
              width: "23rem",
            }}
          >
            <div className="flex justify-between items-center">
              <p className="text-xl">
                {i === 0
                  ? "08.30 - 10.30"
                  : i === 1
                  ? "10.30 - 12.30"
                  : i === 2
                  ? "13.30 - 15.30"
                  : "15.30 - 17.30"}
              </p>
              <div>
                <Button
                  sx={{
                    backgroundColor:
                      (sessionsArray[i] !== null) !== null
                        ? "#D9D9D9"
                        : undefined,
                    color: "#000",
                  }}
                >
                  {"  -  "}
                </Button>
              </div>
            </div>

            <p className="text-2xl mt-2.5 mb-1.5">Nothing Scheduled</p>
            <p className="text-xl mt-1.5 mb-1.5">Not Selected</p>

            <div className="flex justify-between items-center">
              <p className="text-5xl"></p>
              <div className="flex justify-center items-center text-center text-black w-20 h-20 bg-stone-200 rounded-full relative">
                <p className="flex items-center text-4xl font-semi-bold text-center">
                  {/* {sessions[i].buildingID} */}
                </p>
              </div>
            </div>
          </Box>
        );
      } else {
        item.push(
          <Box
            sx={{
              backgroundColor:
                sessionsArray[i] !== null ? "#3E737A" : "#723E7A",
              color: "#fff",
              borderRadius: 5,
              padding: 2,
              justifyContent: "space-between",
              width: "23rem",
            }}
          >
            <div className="flex justify-between items-center">
              <p className="text-xl">
                {i === 0
                  ? "08.30 - 10.30"
                  : i === 1
                  ? "10.30 - 12.30"
                  : i === 2
                  ? "13.30 - 15.30"
                  : "15.30 - 17.30"}
              </p>
              <div>
                <Button
                  sx={{
                    backgroundColor:
                      (sessionsArray[i] !== null) !== null
                        ? "#D9D9D9"
                        : undefined,
                    color: "#000",
                  }}
                >
                  {sessionsArray[i].type}
                </Button>
              </div>
            </div>

            <p className="text-2xl mt-2.5 mb-1.5">{sessionsArray[i].subject}</p>
            <p className="text-xl mt-1.5 mb-1.5">{sessionsArray[i].lecturer}</p>

            <div className="flex justify-between items-center">
              <p className="text-5xl">{sessionsArray[i].hallID}</p>
              <div className="flex justify-center items-center text-center text-black w-20 h-20 bg-stone-200 rounded-full relative">
                <p className="flex items-center text-4xl font-semi-bold text-center">
                  {sessionsArray[i].buildingID}
                </p>
              </div>
            </div>
          </Box>
        );
      }
    }
    console.log("Item", item);
    return item;
  };

  return (
    <div className="flex flex-col">
      <div className="grid justify-items-end">
        <div className="mr-10">
          <RedirectButton path="/weekly-timetble" text="Show Weekly" />
        </div>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 5,
          width: "100%",
        }}
      >
        <div>
          <Calender
            onDateChange={handleDateChange}
            onDayChange={handleDayChange}
          />
        </div>

        <div>
          <Card
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: 3,
              padding: 3,
              width: "auto",
              backgroundColor: "#D9D9D9",
              borderRadius: 5,
            }}
          >
            {item}
          </Card>
        </div>
      </Box>
    </div>
  );
}
