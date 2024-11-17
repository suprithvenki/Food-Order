import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // useEffect(
  //   () => {
  //     console.log(data);
  //   },
  //   [data] //data=data updates this fn gets executed
  // );

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 25,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Order placement failed!");
      }
    } catch (error) {
      alert("Error placing the order: " + error.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email "
          name="email"
          onChange={onChangeHandler}
          value={data.email}
        />
        <input
          required
          type="text"
          placeholder="Street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
          />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="ZipCode"
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
          />
          <input
            required
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
          />
        </div>
        <input
          required
          type="tel"
          placeholder="Phone +91"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>
                <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                {getTotalCartAmount()}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>
                <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                {getTotalCartAmount() === 0 ? 0 : 25}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 25}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
