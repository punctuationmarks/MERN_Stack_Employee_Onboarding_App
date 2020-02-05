import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRecipe } from "../../actions/recipe";

const RecipeForm = ({ addRecipe }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const { title, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addRecipe(formData);
    setFormData("");
  };

  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>New Drink Recipe</h3>
        </div>
        <form className="form marg-top-1" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            placeholder="Recipe Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Recipe Description"
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

RecipeForm.propTypes = {
  addRecipe: PropTypes.func.isRequired
};

export default connect(
  null,
  { addRecipe }
)(RecipeForm);
