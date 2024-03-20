/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Calender from "../../components/Calender";
import Location from "../../components/LocationSelection";
import AvailableHallList from "../../components/AvailableHallList";
import axios from "axios";

export default function Reservation({ isSidebarOpen }) {
  const [halls, setHalls] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [buildingID, setBuildingID] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [day, setDay] = useState();

  const handleDayChange = (day) => {
    setDay(day);
  };

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

  return (
    <>
      <section className="flex gap-0 bg-gray-200">
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX: isSidebarOpen ? 3 : 15,
            paddingY: 3,
            height: "90vh",
            width: "100%",
            transitionDelay: "1s",
          }}
        >
          <div>
            <Calender
              onDateChange={handleDateChange}
              onDayChange={handleDayChange}
            />
            <Location onLocationChange={handleLocationChange} />
          </div>

          <AvailableHallList
            color={"#723E7A"}
            status={"Reservation"}
            halls={halls}
            buildings={buildings}
            dateSelected={selectedDate}
            day={day}
          />
        </Card>
      </section>
    </>
  );
}
