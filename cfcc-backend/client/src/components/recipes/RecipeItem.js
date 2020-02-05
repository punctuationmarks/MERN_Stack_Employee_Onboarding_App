import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteRecipe } from "../../actions/recipe";

const RecipeItem = ({
  deleteRecipe,
  auth,
  recipe: { _id, title, description, user, date },
  showActions
}) => (
  <div className="recipe bg-dark pad-1 marg-top-1">
    <p className="lead">{title}</p>
    <p className="secondary">{description}</p>

    {showActions && (
      <Fragment>
        <div className="container">
          <Link to={`/recipes/${_id}`} class="btn btn-light">
            More Detail
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteRecipe(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </Fragment>
    )}
  </div>
);

RecipeItem.defaultProps = {
  showActions: true
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteRecipe }
)(RecipeItem);
