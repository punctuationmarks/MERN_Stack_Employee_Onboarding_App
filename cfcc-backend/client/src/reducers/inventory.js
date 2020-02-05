import {
  GET_INVENTORIES,
  INVENTORY_ERROR,
  DELETE_INVENTORY,
  ADD_INVENTORY,
  GET_INVENTORY
} from "../actions/types";

const initialState = {
  inventories: [],
  inventory: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INVENTORIES:
      return {
        ...state,
        inventories: payload,
        loading: false
      };
    case GET_INVENTORY:
      return {
        ...state,
        inventory: payload,
        loading: false
      };
    case ADD_INVENTORY:
      return {
        ...state,
        inventories: [payload, ...state.inventories],
        loading: false
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        inventories: state.inventories.filter(
          inventory => inventory._id !== payload
        ),
        loading: false
      };
    case INVENTORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
