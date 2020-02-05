import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addInventory } from "../../actions/inventory";

const InventoryForm = ({ addInventory }) => {
  const [formData, setFormData] = useState({
    title: "",
    supplier: ""
  });

  const { title, supplier } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addInventory(formData);
  };

  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>New Inventory Item</h3>
        </div>
        <form className="form marg-top-1" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            placeholder="Iventory Item"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
          <input
            type="text"
            placeholder="Supplier"
            name="supplier"
            value={supplier}
            onChange={e => onChange(e)}
          />
          <input
            type="submit"
            className="btn btn-dark marg-top-1 pad-1"
            value="Submit"
          />
        </form>
      </div>
    </Fragment>
  );
};

InventoryForm.propTypes = {
  addInventory: PropTypes.func.isRequired
};

export default connect(
  null,
  { addInventory }
)(InventoryForm);
