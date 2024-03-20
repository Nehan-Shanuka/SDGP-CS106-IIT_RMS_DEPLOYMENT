/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const moduleNames = [
  "Object Oriented Programming",
  "Database Management Systems",
  "Software Development Group Project",
  "Client Server Architecture",
  "Machine Learning",
  "Data Structures and Algorithms",
  "Mobile Application Development",
];

export default function RequestForm({
  onRegistationFormChange,
  hall,
  buildings,
  dateSelected,
  dayFromCalender,
}) {
  const [registationForm, setRegistationForm] = useState(false);
  const [checked, setChecked] = useState([false, false, false, false]);
  const [disabled, setDisabled] = useState([false, false, false, false]);
  const [radioValue, setRadioValue] = useState();
  const [date, setDate] = useState(dateSelected);
  const [daySelected, setDaySelected] = useState(dayFromCalender);

  const [moduleName, setModuleName] = useState("");
  const [open, setOpen] = useState(false);

  const [description, setDescription] = useState("");

  // Get the hall id
  const hallID = hall._id;

  // Devide the date into year, month and day
  const year = dateSelected.$y;
  const month = dateSelected.$M;
  const day = dateSelected.$D;

  // console.log(dayFromCalender)

  // Convert the date to UTC format
  const convertedDateToUTCFormat = new Date(Date.UTC(year, month, day));

  // Format the date to yyyy-mm-dd
  const formatedDate =
    convertedDateToUTCFormat.getFullYear() +
    "-" +
    "0" +
    (convertedDateToUTCFormat.getMonth() + 1) +
    "-" +
    convertedDateToUTCFormat.getDate();

  // Check if the date is selected
  useEffect(() => {
    const handleCheckBoxes = () => {
      let dateNotFounded = true;
      hall.timetableSessions.forEach((timetableSession) => {
        // console.log("timetable day", timetableSession.day)
        // console.log("day", day)
        if (timetableSession.day === dayFromCalender) {
          dateNotFounded = false;
          console.log("timeTableSession", dayFromCalender);
          // console.log("Entered the timetable session", timetableSession.reservations.time_01 === null ? false : true);
          // dateNotFounded = false;
          setDisabled([
            timetableSession.reservations.time_01 !== null,
            timetableSession.reservations.time_02 !== null,
            timetableSession.reservations.time_03 !== null,
            timetableSession.reservations.time_04 !== null,
          ]);
          // console.log(disabled);
          hall.plannedSessions.forEach((plannedSession) => {
            const plannedSessionDate = new Date(plannedSession.date);
            const formatedReservationDate =
              plannedSessionDate.getFullYear() +
              "-" +
              "0" +
              (plannedSessionDate.getMonth() + 1) +
              "-" +
              plannedSessionDate.getDate();
            // console.log("plannedSession.date", formatedReservationDate);
            console.log("newNewDate", formatedReservationDate);
            if (formatedReservationDate === formatedDate) {
              // console.log("Entered the planned session", formatedReservationDate);
              dateNotFounded = false;
              // console.log(disabled);
              // console.log(plannedSession.reservations.time_01 === null && disabled[0]);
              setDisabled([
                plannedSession.reservations.time_01 !== null ||
                  timetableSession.reservations.time_01 !== null,
                plannedSession.reservations.time_02 !== null ||
                  timetableSession.reservations.time_02 !== null,
                plannedSession.reservations.time_03 !== null ||
                  timetableSession.reservations.time_03 !== null,
                plannedSession.reservations.time_04 !== null ||
                  timetableSession.reservations.time_04 !== null,
              ]);
              // console.log(disabled);
            }
            // console.log(timetableSession.reservations.time_01 !== null)
            // console.log(timetableSession.reservations.time_02 !== null)
            // console.log(timetableSession.reservations.time_03 !== null)
            // console.log(timetableSession.reservations.time_04 !== null)
            // console.log(plannedSession.reservations.time_01 !== null)
            // console.log(plannedSession.reservations.time_02 !== null)
            // console.log(plannedSession.reservations.time_03 !== null)
            // console.log(plannedSession.reservations.time_04 !== null)
            console.log(
              plannedSession.reservations.time_01 !== null ||
                timetableSession.reservations.time_01 !== null,
              " ",
              plannedSession.reservations.time_02 !== null ||
                timetableSession.reservations.time_02 !== null,
              " ",
              plannedSession.reservations.time_03 !== null ||
                timetableSession.reservations.time_03 !== null,
              " ",
              plannedSession.reservations.time_04 !== null ||
                timetableSession.reservations.time_04 !== null
            );
          });
        }
        if (dateNotFounded) {
          setDisabled([false, false, false, false]);
        }
      });

      // hall.plannedSessions.forEach((plannedSession) => {
      //   const plannedSessionDate = new Date(plannedSession.date);
      //   const formatedReservationDate =
      //     plannedSessionDate.getFullYear() +
      //     "-" +
      //     "0" +
      //     (plannedSessionDate.getMonth() + 1) +
      //     "-" +
      //     plannedSessionDate.getDate();
      //   // console.log("plannedSession.date", formatedReservationDate);
      //   // console.log("newNewDate", formatedReservationDate);
      //   if (formatedReservationDate === formatedDate) {
      //     console.log("Entered the planned session", formatedReservationDate);
      //     dateNotFounded = false;
      //     console.log(disabled);
      //     console.log(plannedSession.reservations.time_01 === null && disabled[0]);
      //     setDisabled([
      //       plannedSession.reservations.time_01 === null && disabled[0],
      //       plannedSession.reservations.time_02 === null && disabled[1],
      //       plannedSession.reservations.time_03 === null && disabled[2],
      //       plannedSession.reservations.time_04 === null && disabled[3],
      //     ]);
      //     console.log(disabled);
      //   }
      // });
    };

    // console.log("Entered")
    // if (dateSelected) {
    handleCheckBoxes();
  }, [dateSelected]);

  // console.log(dateSelected, dayFromCalender)

  // Handle the request to make a reservation
  const handleRequest = async () => {
    axios
      .post(
        `https://sdgp-cs106-iit-rms-deployment.onrender.com/reservations/${hallID}`,
        {
          date: formatedDate,
          time: checked[0]
            ? "08.30 - 10.30"
            : checked[1]
            ? "10.30 - 12.30"
            : checked[2]
            ? "13.30 - 15.30"
            : "15.30 - 17.30",
          subject: moduleName,
          lecturer: "Mr. Sampath Perera",
          type: radioValue,
          confirmation: false,
          description: description,
        }
      )
      .then((response) => {
        alert("Reservation added successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle the radio button change
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  // Handle the "all" checkbox change
  const handleChangeAllCheckBox = (event) => {
    setChecked([
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };

  // Handle the checkbox change
  const handleChangeCheckBox1 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
  };

  const handleChangeCheckBox2 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
  };

  const handleChangeCheckBox3 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
  };

  const handleChangeCheckBox4 = (event) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked]);
  };

  // Update the registation form active status
  useEffect(
    (changedRegistationForm) => {
      setRegistationForm(changedRegistationForm);
    },
    [registationForm],
    onRegistationFormChange
  );

  // Handle the description change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Handle the module name change
  const handleModuleNameChange = (event) => {
    setModuleName(event.target.value);
  };

  // Handle the open and close of the module name select
  const handleClose = () => {
    setOpen(false);
  };

  // Handle the open and close of the module name select
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#723E7A",
        borderRadius: 5,
        height: "100%",
        color: "#fff",
        padding: 1 * 3,
      }}
    >
      <div>
        <div className="flex justify-between items-center">
          <div className="w-1/4">
            <p className="pl-5 text-5xl">{hall.hallID}</p>
          </div>

          <div>
            <div>
              <p className="text-xl">Date: {formatedDate}</p>
            </div>
          </div>

          <div className="flex flex-row-reverse items-center w-36 pr-5">
            <div className="flex justify-center w-16 h-16 rounded-full bg-stone-200 text-black">
              <p className="flex justify-center items-center text-4xl">
                {
                  buildings.find((building) => building._id === hall.buildingID)
                    .buildingID
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-full bg-white my-4 h-0.5" />

      <div className="flex justify-between">
        <div className="flex flex-col">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "#fff",
                    },
                  }}
                  checked={checked[0] && checked[1] && checked[2] && checked[3]}
                  onChange={handleChangeAllCheckBox}
                  disabled={true}
                  {...label}
                />
              }
              label="All Day"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "#fff",
                    },
                  }}
                  checked={checked[0]}
                  onChange={handleChangeCheckBox1}
                  disabled={disabled[0]}
                  {...label}
                />
              }
              label="08.30 AM - 10.30 AM"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "#fff",
                    },
                  }}
                  checked={checked[1]}
                  onChange={handleChangeCheckBox2}
                  disabled={disabled[1]}
                  {...label}
                />
              }
              label="10.30 AM - 12.30 PM"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "#fff",
                    },
                  }}
                  checked={checked[2]}
                  onChange={handleChangeCheckBox3}
                  disabled={disabled[2]}
                  {...label}
                />
              }
              label="13.30 PM - 03.30 PM"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "#fff",
                    },
                  }}
                  checked={checked[3]}
                  onChange={handleChangeCheckBox4}
                  disabled={disabled[3]}
                  {...label}
                />
              }
              label="03.30 PM - 05.30 PM"
            />
          </FormGroup>
        </div>

        <div className="flex flex-col">
          <FormGroup>
            <RadioGroup value={radioValue} onChange={handleRadioChange}>
              <FormControlLabel
                value={"Rescheduled Lecture"}
                control={
                  <Radio
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": {
                        color: "#fff",
                      },
                    }}
                  />
                }
                label="Rescheduled Lecture"
              />
              <FormControlLabel
                value={"Rescheduled Tutorial"}
                control={
                  <Radio
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": {
                        color: "#fff",
                      },
                    }}
                  />
                }
                label="Rescheduled Tutorial"
              />
              <FormControlLabel
                value={"Examination"}
                control={
                  <Radio
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": {
                        color: "#fff",
                      },
                    }}
                  />
                }
                label="Examination"
              />
              <FormControlLabel
                value={"Viva"}
                control={
                  <Radio
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": {
                        color: "#fff",
                      },
                    }}
                  />
                }
                label="Viva"
              />
              <FormControlLabel
                value={"Other"}
                control={
                  <Radio
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": {
                        color: "#fff",
                      },
                    }}
                  />
                }
                label="Other"
              />
            </RadioGroup>
          </FormGroup>
        </div>
      </div>

      <div className="bg-stone-200 rounded mt-5">
        <FormControl sx={{ width: "100%" }} color="success">
          <InputLabel id="demo-controlled-open-select-label">
            Select Module
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={moduleName}
            label="Module Name"
            onChange={handleModuleNameChange}
          >
            {moduleNames.map((name, index) => (
              <MenuItem key={index} value={name}>
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="w-full bg-stone-200 rounded my-5">
        <TextField
          sx={{
            width: "100%",
            borderRadius: 10,
          }}
          label="Brief Description"
          color="success"
          variant="filled"
          multiline
          rows={2}
          onChange={handleDescriptionChange}
        />
      </div>

      <div className="grid justify-items-center">
        <div className="flex justify-between w-9/12">
          <Button
            style={{
              backgroundColor: "#D9D9D9",
              color: "#000",
              width: "150px",
              alignItems: "center",
              borderRadius: 25,
            }}
            onClick={() => {
              onRegistationFormChange(false);
            }}
          >
            <h5
              style={{
                margin: 0,
              }}
            >
              Back to Options
            </h5>
          </Button>

          <Button
            style={{
              backgroundColor: "#D9D9D9",
              color: "#000",
              width: "150px",
              alignItems: "center",
              borderRadius: 25,
            }}
            onClick={handleRequest}
          >
            <h5
              style={{
                margin: 0,
              }}
            >
              Make Request
            </h5>
          </Button>
        </div>
      </div>
    </Box>
  );
}
