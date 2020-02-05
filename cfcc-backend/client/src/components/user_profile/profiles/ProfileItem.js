import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    bio,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-white">
      <div>{avatar && <img src={avatar} alt="" className="round-img" />}</div>
      <div>
        <h1 className="large">{name}</h1>
        <p className="lead">{bio && <span>{bio}</span>}</p>
        <p>{location && <span>From {location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-black">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
