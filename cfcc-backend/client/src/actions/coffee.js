import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_COFFEES,
  COFFEE_ERROR,
  DELETE_COFFEE,
  ADD_COFFEE,
  GET_COFFEE
} from "./types";

// Get coffees
export const getCoffees = () => async dispatch => {
  try {
    const res = await axios.get("/api/coffees");

    dispatch({
      type: GET_COFFEES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COFFEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete coffee
export const deleteCoffee = id => async dispatch => {
  if (window.confirm("You sure you want to delete that coffee?"))
    try {
      await axios.delete(`/api/coffees/${id}`);

      dispatch({
        type: DELETE_COFFEE,
        payload: id
      });

      dispatch(setAlert("Coffee Removed", "success"));
    } catch (err) {
      dispatch({
        type: COFFEE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Add coffee
export const addCoffee = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/coffees", formData, config);

    dispatch({
      type: ADD_COFFEE,
      payload: res.data
    });

    dispatch(setAlert("Coffee Created", "success"));
  } catch (err) {
    dispatch({
      type: COFFEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get coffee
export const getCoffee = id => async dispatch => {
  try {
    const res = await axios.get(`/api/coffees/${id}`);

    dispatch({
      type: GET_COFFEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COFFEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
