import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_INVENTORIES,
  INVENTORY_ERROR,
  DELETE_INVENTORY,
  ADD_INVENTORY,
  GET_INVENTORY
} from "./types";

// Get inventories
export const getInventories = () => async dispatch => {
  try {
    const res = await axios.get("/api/inventories");

    dispatch({
      type: GET_INVENTORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete inventory
export const deleteInventory = id => async dispatch => {
  if (window.confirm("You sure you want to delete that inventory item?"))
    try {
      await axios.delete(`/api/inventories/${id}`);

      dispatch({
        type: DELETE_INVENTORY,
        payload: id
      });

      dispatch(setAlert("Inventory Removed", "success"));
    } catch (err) {
      dispatch({
        type: INVENTORY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Add inventory
export const addInventory = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/inventories", formData, config);

    dispatch({
      type: ADD_INVENTORY,
      payload: res.data
    });

    dispatch(setAlert("Inventory Created", "success"));
  } catch (err) {
    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get inventory
export const getInventory = id => async dispatch => {
  try {
    const res = await axios.get(`/api/inventories/${id}`);

    dispatch({
      type: GET_INVENTORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INVENTORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
