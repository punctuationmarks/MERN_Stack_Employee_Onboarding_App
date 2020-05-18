import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";


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
        <h2 className="medium">
          <ReactMarkdown source={name} />
        </h2>
        <p className="lead">

          {bio && <ReactMarkdown source={bio} />}

        </p>
        <p>{location && <span>from {location}</span>}</p>
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
