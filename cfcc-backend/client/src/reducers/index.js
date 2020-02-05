import { combineReducers } from "redux";
import alert from "./alert";
import proTip from "./proTip";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import recipe from "./recipe";
import inventory from "./inventory";
import coffee from "./coffee";

export default combineReducers({
  alert,
  proTip,
  auth,
  coffee,
  inventory,
  post,
  profile,
  recipe
});
