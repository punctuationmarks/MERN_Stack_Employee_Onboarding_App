import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import ProTipItem from "../proTips/ProTipItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getProTip } from "../../../actions/proTip";

const ProTip = ({ getProTip, proTip: { proTip, loading }, match }) => {
  useEffect(
    () => {
      getProTip(match.params.id);
    },
    [getProTip]
  );

  return loading || proTip === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/proTips" className="btn">
        Back To Protips
      </Link>
      <ProTipItem proTip={proTip} showActions={false} />
      <CommentForm proTipId={proTip._id} />
      <div className="comments">
        {proTip.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} proTipId={proTip._id} />
        ))}
      </div>
    </Fragment>
  );
};

ProTip.propTypes = {
  getProTip: PropTypes.func.isRequired,
  proTip: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  proTip: state.proTip
});

export default connect(
  mapStateToProps,
  { getProTip }
)(ProTip);
