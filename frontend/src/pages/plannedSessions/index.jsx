/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Button, Card } from "@mui/material";
import Calender from "../../components/Calender";
import ReservationHallList from "../../components/PlannedSessionHallList";
import Time from "../../components/TimeSlection";
import Location from "../../components/LocationSelection";
import Degree from "../../components/DegreeSelection";
import Level from "../../components/LevelSelection";
import Module from "../../components/ModuleSelection";
import Type from "../../components/TypeSelection";
import Group from "../../components/GroupSelection";
import axios from "axios";

export default function PlannedSessions() {
  const [reservations, setReservations] = useState([]);
  const [halls, setHalls] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [buildingID, setBuildingID] = useState([]);
  const [confirmation] = useState(true);
  const [selectedDate, setSelectedDate] = useState();
  const [moduleName, setModuleName] = useState([]);
  const [day, setDay] = useState();
  const [type, setType] = useState([]);

  const handleDayChange = (day) => {
    setDay(day);
  };

  useEffect(() => {
    const url = `https://sdgp-cs106-iit-rms-deployment.onrender.com/reservations?confirmation=${confirmation}&subject=${moduleName}&buildingID=${buildingID}&type=${type}`;
    axios
      .get(url)
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [confirmation, moduleName, buildingID, type, day, selectedDate]);

  useEffect(() => {
    const url = `https://sdgp-cs106-iit-rms-deployment.onrender.com/halls?buildingID=${buildingID}`;
    axios
      .get(url)
      .then((response) => {
        setHalls(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [buildingID]);

  useEffect(() => {
    axios
      .get("https://sdgp-cs106-iit-rms-deployment.onrender.com/buildings")
      .then((response) => {
        setBuildings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLocationChange = (locationName) => {
    setBuildingID(locationName);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleModuleChange = (moduleSelect) => {
    setModuleName(moduleSelect);
  };

  const handleTypeChange = (typeSelect) => {
    setType(typeSelect);
  };

  console.log("Hi", selectedDate);

  return (
    <>
      <section className="flex gap-0 bg-gray-200">
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 3,
            height: "90vh",
            width: "100%",
          }}
        >
          <div>
            <Calender
              onDateChange={handleDateChange}
              onDayChange={handleDayChange}
            />
            <Location onLocationChange={handleLocationChange} />
            <Module onModuleChange={handleModuleChange} />
            <Type onTypeChange={handleTypeChange} />
          </div>

          <div>
            {/* <Time />
            <Degree />
            <Level /> */}
            {/* <Group /> */}
            {/* <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: 1,
                width: "100%",
                backgroundColor: "#D9D9D9",
                color: "#000",

                ":hover": {
                  backgroundColor: "#3E737A",
                  color: "#fff",
                },
              }}
            >
              Search
            </Button> */}
          </div>
          <ReservationHallList
            color={"#3E737A"}
            status={"Planned Sessions"}
            newcourses={reservations}
            newhalls={halls}
            newbuildings={buildings}
          />
        </Card>
      </section>
    </>
  );
}
