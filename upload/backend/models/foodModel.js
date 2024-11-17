import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required:true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// mongoose.models.food=if model is already present;

//else mongoose.model will be used

export default foodModel;
