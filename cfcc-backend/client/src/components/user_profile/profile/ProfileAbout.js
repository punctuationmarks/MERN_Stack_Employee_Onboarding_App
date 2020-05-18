import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className="profile-about bg-white pad-2">
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {skills.map((skill, index) => (
        <div key={index} className="pad-1">
          <i className="fas fa-check" /> {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
