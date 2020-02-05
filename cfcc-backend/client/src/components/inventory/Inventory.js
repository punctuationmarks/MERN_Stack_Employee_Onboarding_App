import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import InventoryItem from "./InventoryItem";
import { getInventory } from "../../actions/inventory";

const Inventory = ({
  getInventory,
  inventory: { inventory, loading },
  match
}) => {
  useEffect(
    () => {
      getInventory(match.params.id);
    },
    [getInventory]
  );

  return loading || inventory === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/inventories" className="btn">
        Back To inventories
      </Link>
      <InventoryItem inventory={inventory} showActions={false} />
    </Fragment>
  );
};

Inventory.propTypes = {
  getInventory: PropTypes.func.isRequired,
  inventory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  inventory: state.inventory
});

export default connect(
  mapStateToProps,
  { getInventory }
)(Inventory);
