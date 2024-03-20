import express from "express";
// import { PORT, MONGODB } from "./config.js";
import mongoose from "mongoose";
import buildingRoutes from "./routes/buildingRoutes.js";
import hallRoutes from "./routes/hallRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(cors({
  origin: 'https://iit-rms-deployment-test1.vercel.app'
}));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to IIT RMS server!");
});

app.use("/buildings", buildingRoutes);

app.use("/halls", hallRoutes);

app.use("/reservations", reservationRoutes);

app.use("/users", userRoutes);

app.use("/timetables", timetableRoutes);

app.use("/students", studentRoutes);

app.use("/groups", groupRoutes);

// mongoose
//   .connect(MONGODB)
//   .then(() => {
//     console.log("App connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log("Error connecting to MongoDB", error);
//   });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("App connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
