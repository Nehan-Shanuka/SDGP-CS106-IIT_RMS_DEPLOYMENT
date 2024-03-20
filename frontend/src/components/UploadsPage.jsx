import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Uploadicon from "../images/6323.jpg";
import Card from "@mui/material/Card";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  marginInlineStart: "10",
});

export default function InputFileUpload() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadMessage(null);
  };

  const handleFileUpload = async (dataType) => {
    try {
      if (!file) {
        setUploadMessage("No file selected");
        setOpenSnackbar(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const fileContent = event.target.result;
          const parsedData = JSON.parse(fileContent);

          // Determine the type of data and send it to the appropriate endpoint
          let endpoint;
          switch (dataType) {
            case "timetables":
              endpoint =
                "https://sdgp-cs106-iit-rms-deployment.onrender.com/timetables";
              break;
            case "resources":
              endpoint =
                "https://sdgp-cs106-iit-rms-deployment.onrender.com/halls";
              break;
            case "students":
              endpoint =
                "https://sdgp-cs106-iit-rms-deployment.onrender.com/students";
              break;
            case "lecturers":
              endpoint =
                "https://sdgp-cs106-iit-rms-deployment.onrender.com/lecturers";
              break;
            default:
              setUploadMessage("Invalid data type");
              setOpenSnackbar(true);
              return;
          }

          // Make a POST request to the backend API endpoint
          const response = await axios.post(endpoint, parsedData);

          setUploadMessage("File uploaded successfully");
          setOpenSnackbar(true);
          console.log("File uploaded successfully", response.data);
        } catch (error) {
          setUploadMessage("Error uploading file");
          setOpenSnackbar(true);
          console.error("Error parsing JSON or uploading file", error);
        }
      };

      reader.readAsText(file);
    } catch (error) {
      setUploadMessage("Error uploading file");
      setOpenSnackbar(true);
      console.error("Error uploading file", error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div
      style={{ paddingBottom: "6rem", marginLeft: "20px", marginRight: "1rem" }}
    >
      <div
        style={{
          display: "flex",
          marginTop: "30px",
          justifyContent: "space-between",
          padding: "0 12rem",
        }}
      >
        <Card sx={{ border: 2, borderColor: "black" }}>
          <div>
            <img
              src={Uploadicon}
              style={{ width: "10rem", marginLeft: "17%" }}
            />
            <Button
              style={{ width: "15rem" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onClick={() => handleFileUpload("timetables")}
            >
              Upload Timetable JSON File
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </div>
        </Card>

        <Card sx={{ border: 2, borderColor: "black" }}>
          <div>
            <img
              src={Uploadicon}
              style={{ width: "10rem", marginLeft: "17%" }}
            />
            <Button
              style={{ width: "15rem" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onClick={() => handleFileUpload("resources")}
            >
              Upload Resources JSON File
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </div>
        </Card>

        <Card sx={{ border: 2, borderColor: "black" }}>
          <div>
            <img
              src={Uploadicon}
              style={{ width: "10rem", marginLeft: "17%" }}
            />
            <Button
              style={{ width: "15rem" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onClick={() => handleFileUpload("students")}
            >
              Upload Student List JSON File
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </div>
        </Card>

        <Card sx={{ border: 2, borderColor: "black" }}>
          <div>
            <img
              src={Uploadicon}
              style={{ width: "10rem", marginLeft: "17%" }}
            />
            <Button
              style={{ width: "15rem" }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onClick={() => handleFileUpload("lecturers")}
            >
              Upload Lecturer Details JSON File
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
          </div>
        </Card>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {uploadMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
