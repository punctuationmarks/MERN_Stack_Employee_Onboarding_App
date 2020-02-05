import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCoffee } from "../../actions/coffee";

const CoffeeForm = ({ addCoffee }) => {
  const [formData, setFormData] = useState({
    region: "",
    description: ""
  });

  const { region, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addCoffee(formData);
    setFormData("");
  };

  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>New Coffee Item</h3>
        </div>
        <form className="form marg-top-1" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            placeholder="Coffee Region"
            name="region"
            value={region}
            onChange={e => onChange(e)}
            required
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Coffee Description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
            required
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

CoffeeForm.propTypes = {
  addCoffee: PropTypes.func.isRequired
};

export default connect(
  null,
  { addCoffee }
)(CoffeeForm);
