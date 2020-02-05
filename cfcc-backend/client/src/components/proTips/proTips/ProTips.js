import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import ProTipItem from "./ProTipItem";
import ProTipForm from "./ProTipForm";
import { getProTips } from "../../../actions/proTip";

const ProTips = ({ getProTips, proTip: { proTips, loading } }) => {
  useEffect(
    () => {
      getProTips();
    },
    [getProTips]
  );

  return loading ? (
    <Spinner />
  ) : (
      <Fragment>
        <h1 className="large text-primary text-center">Pro-Tips!</h1>
        <div className="marg-top-2 pad-top-2 text-center">
          <ProTipForm />
        </div>
        <section className="marg-top pad-top">

          <div className="proTips">
            {proTips.map(proTip => (
              <ProTipItem key={proTip._id} proTip={proTip} />
            ))}
          </div>

        </section>
      </Fragment>
    );
};

ProTips.propTypes = {
  getProTips: PropTypes.func.isRequired,
  proTip: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  proTip: state.proTip
});

export default connect(
  mapStateToProps,
  { getProTips }
)(ProTips);
