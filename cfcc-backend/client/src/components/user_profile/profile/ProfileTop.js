import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

const ProfileTop = ({
  profile: {
    location,
    bio,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className="profile-top bg-primary pad-2">
      <img className="round-img marg-top-1" src={avatar} alt="" />
      <h2 className="medium">{name}</h2>
      <p className="lead">
        {bio && <ReactMarkdown source={bio}/>}
        </p>
      <p>{location && <span>From {location}</span>}</p>
      <div className="icons marg-top-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x" />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x" />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x" />
          </a>
        )}
        {social && social.snapchat && (
          <a href={social.snapchat} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-snapchat-ghost fa-2x" />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
