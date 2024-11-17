import orderModel from "../models/order-model.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use the secret key

// Placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:3000";

  try {
    // Create new order in MongoDB
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    console.log("Order saved:", newOrder);

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Preparing line items for Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Price in paise (e.g., 100 rupees = 10000 paise)
      },
      quantity: item.quantity, // Quantity of each item
    }));

    // Add delivery charges as a separate line item
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 25 * 100,
      },
      quantity: 1,
    });

    console.log("Line items for Stripe:", line_items);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // Redirect on cancel
    });

    console.log("Stripe session created successfully:", session);

    // Return session URL to frontend
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Order Placement Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Unknown error occurred",
    });
  }
};

//temporary payment verification system
//if payment is false we delete that data from the database
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

//user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: "error" });
  }
};

//listing orders for admin pannel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
