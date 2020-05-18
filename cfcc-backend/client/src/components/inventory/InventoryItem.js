import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteInventory } from "../../actions/inventory";
import ReactMarkdown from "react-markdown";

const InventoryItem = ({
  deleteInventory,
  auth,
  inventory: { _id, title, supplier, user },
  showActions
}) => (
  <div className="inventory-item bg-white p m">
    <p className="pad-2">
      <ReactMarkdown className="lead" source={title} />
      {/* Only showing the supplier, if it's provided */}
      {supplier && <span className="secondary"> <b>Supplier</b>: <ReactMarkdown className="text-mute" source={supplier} /></span>}
      
    </p>

    {showActions && (
      <Fragment>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteInventory(_id)}
            type="button"
            className="btn btn-danger m"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </Fragment>
    )}
  </div>
);

InventoryItem.defaultProps = {
  showActions: true
};

InventoryItem.propTypes = {
  inventory: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteInventory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteInventory }
)(InventoryItem);
