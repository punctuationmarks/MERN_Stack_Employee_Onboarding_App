import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import About from "../layout/About";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../user_profile/profile-forms/CreateProfile";
import EditProfile from "../user_profile/profile-forms/EditProfile";
import AddExperience from "../user_profile/profile-forms/AddExperience";
import AddEducation from "../user_profile/profile-forms/AddEducation";
import Profiles from "../user_profile/profiles/Profiles";
import Profile from "../user_profile/profile/Profile";
import Posts from "../forum/posts/Posts";
import Post from "../forum/post/Post";
import ProTips from "../proTips/proTips/ProTips";
import ProTip from "../proTips/proTip/ProTip";

import Inventory from "../inventory/Inventory";
import Inventories from "../inventory/Inventories";
import Recipe from "../recipes/Recipe";
import Recipes from "../recipes/Recipes";

import Coffee from "../coffees/Coffee";
import Coffees from "../coffees/Coffees";


import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/proTips" component={ProTips} />
        <PrivateRoute exact path="/proTips/:id" component={ProTip} />
        <PrivateRoute exact path="/inventories" component={Inventories} />
        <PrivateRoute exact path="/inventories/:id" component={Inventory} />
        <PrivateRoute exact path="/recipes" component={Recipes} />
        <PrivateRoute exact path="/recipes/:id" component={Recipe} />
        <PrivateRoute exact path="/coffees" component={Coffees} />
        <PrivateRoute exact path="/coffees/:id" component={Coffee} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
