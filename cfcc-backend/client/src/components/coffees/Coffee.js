import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CoffeeItem from "./CoffeeItem";
import { getCoffee } from "../../actions/coffee";

const Coffee = ({ getCoffee, coffee: { coffee, loading }, match }) => {
  useEffect(
    () => {
      getCoffee(match.params.id);
    },
    [getCoffee]
  );

  return loading || coffee === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/coffees" className="btn m p btn-primary">
        Back To coffees
      </Link>
      <CoffeeItem coffee={coffee} showActions={false} />
    </Fragment>
  );
};

Coffee.propTypes = {
  getCoffee: PropTypes.func.isRequired,
  coffee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coffee: state.coffee
});

export default connect(
  mapStateToProps,
  { getCoffee }
)(Coffee);
