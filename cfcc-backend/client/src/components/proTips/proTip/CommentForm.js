import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../../actions/proTip";

const CommentForm = ({ proTipId, addComment }) => {
  const [text, setText] = useState("");

  return (
    <div className="proTip-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form
        className="form marg-top-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(proTipId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          placeholder="..."
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark marg-top-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
