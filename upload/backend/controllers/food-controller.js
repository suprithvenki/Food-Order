import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  // Proceed only if both req.body and req.file contain expected data
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.price ||
    !req.body.category
  ) {
    return res.status(400).json({
      success: false,
      message: "One or more required fields are missing from request body",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image file is missing from request",
    });
  }
  const imagePath = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imagePath,
  });

  try {
    await food.save();
    res
      .status(201)
      .json({ success: true, message: "Food Added Successfully", food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Database Error" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
