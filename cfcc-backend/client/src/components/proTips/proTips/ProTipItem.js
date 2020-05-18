import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deleteProTip } from "../../../actions/proTip";
import ReactMarkdown from "react-markdown";

const ProTipItem = ({
  addLike,
  removeLike,
  deleteProTip,
  auth,
  proTip: { _id, title, text, name, avatar, user, likes, comments, date },
  showActions
}) => (
    <div className="proTip bg-white pad-1 marg-top-1">
      <div>
        <h2>{title}</h2>
        <div>
          <Link to={`/profile/${user}`}>
            <h5>tip by {name}</h5>
          </Link>
        </div>
        <p className="proTip-date">
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
      </div>
      <div>
        <p className="marg-top-1">
          <ReactMarkdown source={text} />
        </p>


        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/proTips/${_id}`} class="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deleteProTip(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>

    </div>
  );

ProTipItem.defaultProps = {
  showActions: true
};

ProTipItem.propTypes = {
  proTip: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteProTip: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deleteProTip }
)(ProTipItem);
