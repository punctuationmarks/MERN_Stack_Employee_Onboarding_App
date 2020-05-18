import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <section className="dashboard">
          <div className="container-z-2">
            <h1 className="large text-primary">Welcome</h1>
            <i className="fas fa-user" />
            <p className="lead">{user && user.name}, how are you today?
        <br /> !!!New Updates!!! on the site are faster load times, tweaked the color scheme, and now you can use markdown to style your posts.
        If you don't know markdown, it's amazing and here is a <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank" rel="noopener noreferrer">
                cheetsheet
                </a>. There are also bugs in this code, like how you'll have to reload the page if you want to keep entering posts (super annoying, I know), so I'll try to work on those sometime soon. 
            </p>
        <br /><br />
            {profile !== null ? (
              <Fragment>
                <div className="marg-1">
                  <p className="lead">
                    Want to update or edit your profile? Just a way for us to get to
                    know each other better, look out for each other and start
                    conversation.
              </p>
                  <DashboardActions />
                  <Experience experience={profile.experience} />
                  <Education education={profile.education} />

                  <div className="marg-top-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAccount()}
                    >
                      <i className="fas fa-user-minus" /> Delete My Account
                </button>
                  </div>
                </div>
              </Fragment>
            ) : (
                <Fragment>
                  <p>You have not yet setup a profile, please add some info</p>
                  <Link to="/create-profile" className="btn btn-primary marg-top-1">
                    Create Profile
            </Link>
                </Fragment>
              )}
          </div>
        </section>
      </Fragment>
    );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
