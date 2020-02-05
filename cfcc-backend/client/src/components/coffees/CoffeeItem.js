import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteCoffee } from "../../actions/coffee";

const dCoffeeItem = ({
  deleteCoffee,
  auth,
  coffee: { _id, region, description, user, date },
  showActions
}) => (
  <div className="coffee bg-dark pad-1 marg-top-1">
    <p className="lead">{region}</p>
    <p className="secondary">{description}</p>
    <p> Posted on <Moment format="DD/MM/YYYY">{date}</Moment></p>

    {showActions && (
      <Fragment>
        <div className="container">
          <Link to={`/coffees/${_id}`} class="btn btn-light">
            More Detail
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteCoffee(_id)}
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

dCoffeeItem.defaultProps = {
  showActions: true
};

dCoffeeItem.propTypes = {
  coffee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteCoffee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteCoffee }
)(dCoffeeItem);
