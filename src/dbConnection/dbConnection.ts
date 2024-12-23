import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGOOSE_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB Connnected");
    });

    connection.on("error", (err) => {
      console.log("DB connection error", err);
    });

    process.exit();
  } catch (error) {
    console.log("somthing went wrong while connecting DB");
    console.log(error);
  }
};
