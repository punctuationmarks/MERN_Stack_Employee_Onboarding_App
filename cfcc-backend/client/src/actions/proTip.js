import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROTIPS,
  PROTIP_ERROR,
  UPDATE__PROTIP_LIKES,
  DELETE_PROTIP,
  ADD_PROTIP,
  GET_PROTIP,
  ADD_PROTIP_COMMENT,
  REMOVE_PROTIP_COMMENT
} from "./types";

// Get proTips
export const getProTips = () => async dispatch => {
  try {
    const res = await axios.get("/api/proTips");

    dispatch({
      type: GET_PROTIPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROTIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/proTips/like/${id}`);

    dispatch({
      type: UPDATE__PROTIP_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PROTIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/proTips/unlike/${id}`);

    dispatch({
      type: UPDATE__PROTIP_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PROTIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete proTip
export const deleteProTip = id => async dispatch => {
  try {
    await axios.delete(`/api/proTips/${id}`);

    dispatch({
      type: DELETE_PROTIP,
      payload: id
    });

    dispatch(setAlert("ProTip Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROTIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add proTip
export const addProTip = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/proTips", formData, config);

    dispatch({
      type: ADD_PROTIP,
      payload: res.data
    });

    dispatch(setAlert("ProTip Created", "success"));
  } catch (err) {
    dispatch({
      type: PROTIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get proTip
export const getProTip = id => async dispatch => {
  try {
    const res = await axios.get(`/api/proTips/${id}`);

    dispatch({
      type: GET_PROTIP,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROTIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (proTipId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/proTips/comment/${proTipId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_PROTIP_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: PROTIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (proTipId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/proTips/comment/${proTipId}/${commentId}`);

    dispatch({
      type: REMOVE_PROTIP_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROTIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
