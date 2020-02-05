import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RecipeItem from "./RecipeItem";
import { getRecipe } from "../../actions/recipe";

const Recipe = ({ getRecipe, recipe: { recipe, loading }, match }) => {
  useEffect(
    () => {
      getRecipe(match.params.id);
    },
    [getRecipe]
  );

  return loading || recipe === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/recipes" className="btn m p btn-primary">
        Back To recipes
      </Link>
      <RecipeItem recipe={recipe} showActions={false} />
    </Fragment>
  );
};

Recipe.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipe }
)(Recipe);
