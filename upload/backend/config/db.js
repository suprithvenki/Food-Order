import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://**************@cluster0.sd6qg.mongodb.net/Food_Order_data?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    });
};
