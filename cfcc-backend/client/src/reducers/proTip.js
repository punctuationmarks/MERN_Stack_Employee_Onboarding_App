import {
    GET_PROTIPS,
    PROTIP_ERROR,
    UPDATE_LIKES,
    DELETE_PROTIP,
    ADD_PROTIP,
    GET_PROTIP,
    ADD_PROTIP_COMMENT,
    REMOVE_PROTIP_COMMENT
  } from "../actions/types";
  
  const initialState = {
    proTips: [],
    proTip: null,
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PROTIPS:
        return {
          ...state,
          proTips: payload,
          loading: false
        };
      case GET_PROTIP:
        return {
          ...state,
          proTip: payload,
          loading: false
        };
      case ADD_PROTIP:
        return {
          ...state,
          proTips: [payload, ...state.proTips],
          loading: false
        };
      case DELETE_PROTIP:
        return {
          ...state,
          proTips: state.proTips.filter(proTip => proTip._id !== payload),
          loading: false
        };
      case PROTIP_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case UPDATE_LIKES:
        return {
          ...state,
          proTips: state.proTips.map(proTip =>
            proTip._id === payload.id ? { ...proTip, likes: payload.likes } : proTip
          ),
          loading: false
        };
      case ADD_PROTIP_COMMENT:
        return {
          ...state,
          proTip: { ...state.proTip, comments: payload },
          loading: false
        };
      case REMOVE_PROTIP_COMMENT:
        return {
          ...state,
          proTip: {
            ...state.proTip,
            comments: state.proTip.comments.filter(
              comment => comment._id !== payload
            )
          },
          loading: false
        };
      default:
        return state;
    }
  }
  