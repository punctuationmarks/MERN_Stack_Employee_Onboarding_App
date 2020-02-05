import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import InventoryItem from "./InventoryItem";
import InventoryForm from "./InventoryForm";
import { getInventories } from "../../actions/inventory";

const Inventories = ({
  getInventories,
  inventory: { inventories, loading }
}) => {
  useEffect(
    () => {
      getInventories();
    },
    [getInventories]
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-blue text-center">Inventory</h1>
      <div className="container">
        <div className="inventories">
          {inventories.map(inventory => (
            <InventoryItem key={inventory._id} inventory={inventory} />
          ))}
        </div>
      </div>
      <InventoryForm />
    </Fragment>
  );
};

Inventories.propTypes = {
  getInventories: PropTypes.func.isRequired,
  inventory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  inventory: state.inventory
});

export default connect(
  mapStateToProps,
  { getInventories }
)(Inventories);
