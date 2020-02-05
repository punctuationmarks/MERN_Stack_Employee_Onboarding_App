import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_RECIPES,
  RECIPE_ERROR,
  DELETE_RECIPE,
  ADD_RECIPE,
  GET_RECIPE
} from "./types";

// Get recipes
export const getRecipes = () => async dispatch => {
  try {
    const res = await axios.get("/api/recipes");

    dispatch({
      type: GET_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete recipe
export const deleteRecipe = id => async dispatch => {
  if (window.confirm("You sure you want to delete that recipe?"))
    try {
      await axios.delete(`/api/recipes/${id}`);

      dispatch({
        type: DELETE_RECIPE,
        payload: id
      });

      dispatch(setAlert("Recipe Removed", "success"));
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Add recipe
export const addRecipe = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/recipes", formData, config);

    dispatch({
      type: ADD_RECIPE,
      payload: res.data
    });

    dispatch(setAlert("Recipe Created", "success"));
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get recipe
export const getRecipe = id => async dispatch => {
  try {
    const res = await axios.get(`/api/recipes/${id}`);

    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
