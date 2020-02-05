import {
    GET_COFFEES,
    COFFEE_ERROR,
    DELETE_COFFEE,
    ADD_COFFEE,
    GET_COFFEE
  } from "../actions/types";
  
  const initialState = {
    coffees: [],
    coffee: null,
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_COFFEES:
        return {
          ...state,
          coffees: payload,
          loading: false
        };
      case GET_COFFEE:
        return {
          ...state,
          coffee: payload,
          loading: false
        };
      case ADD_COFFEE:
        return {
          ...state,
          coffees: [payload, ...state.coffees],
          loading: false
        };
      case DELETE_COFFEE:
        return {
          ...state,
          coffees: state.coffees.filter(coffee => coffee._id !== payload),
          loading: false
        };
      case COFFEE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
  }
  