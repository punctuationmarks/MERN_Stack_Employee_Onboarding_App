import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RecipeItem from "./RecipeItem";
import RecipeForm from "./RecipeForm";
import { getRecipes } from "../../actions/recipe";

const Recipes = ({ getRecipes, recipe: { recipes, loading } }) => {
  useEffect(
    () => {
      getRecipes();
    },
    [getRecipes]
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-blue text-center">Drink Recipes</h1>
      <div className="container">
        <div className="recipes">
          {recipes.map(recipe => (
            <RecipeItem key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
      <RecipeForm />
    </Fragment>
  );
};

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(Recipes);
