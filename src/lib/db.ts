import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export const connectDB = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the database.");
  } catch (error) {
    console.log('===================================================================');
    console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR");
    console.log("DB CONTINENT CONNECTION AFFECTED!!");
    console.error("Danger mode on!! at DB in connection ::: ", error);
    process.exit(1);
  }
};
