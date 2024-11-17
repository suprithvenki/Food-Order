import userModel from "../models/userModel.js";

//add items from user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById({ _id: req.body.userId });
    //we get this userId using middleware
    //when requesting we send the token not the user id
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      /// if there is no entry with item id then we  create new entry
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To cart" });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "Error" });
  }
};

//remove items from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    //update new cart data
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "removed from cart successfully" });
  } catch (error) {
    console.log(error);

    res.json({ success: true, message: "Error" });
  }
};

//fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId); // Check if userData is null
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Use an empty object if cartData is null
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
