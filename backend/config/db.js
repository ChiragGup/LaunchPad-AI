import mongoose from "mongoose";

const dataBaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(mongoose.connection.name);
    console.log("database connected 🗄️");

  } catch (error) {
    console.log("database not connected:", error);
  }
};

export default dataBaseConnection;