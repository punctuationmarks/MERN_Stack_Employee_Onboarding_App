import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProTip } from "../../../actions/proTip";

const ProTipForm = ({ addProTip }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: ""
  });

  const { title, text } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addProTip(formData);
    setFormData(" ");
  };

  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Protips!</h3>
          <p>Do you have a tip that might help other people do their job better or make life better?</p>
        </div>
        <form className="form marg-top-1" onSubmit={e => onSubmit(e)}>
          <input
            type="text"
            placeholder="What's your protip?"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
          <textarea
            placeholder="..."
            name="text"
            value={text}
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

ProTipForm.propTypes = {
  addProTip: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProTip }
)(ProTipForm);
