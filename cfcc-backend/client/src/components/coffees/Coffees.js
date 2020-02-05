import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CoffeeItem from "./CoffeeItem";
import CoffeeForm from "./CoffeeForm";
import { getCoffees } from "../../actions/coffee";

const Coffees = ({ getCoffees, coffee: { coffees, loading } }) => {
  useEffect(
    () => {
      getCoffees();
    },
    [getCoffees]
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-blue text-center">Coffees</h1>
      <p className="lead">Coffees and their tasting notes </p>
      <div className="container">
        <div className="coffees">
          {coffees.map(coffee => (
            <CoffeeItem key={coffee._id} coffee={coffee} />
          ))}
        </div>
      </div>
      <CoffeeForm />
    </Fragment>
  );
};

Coffees.propTypes = {
  getCoffees: PropTypes.func.isRequired,
  coffee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coffee: state.coffee
});

export default connect(
  mapStateToProps,
  { getCoffees }
)(Coffees);
