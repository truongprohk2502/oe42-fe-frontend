import React, { useState } from "react";
import "./style.sass";
import PropTypes from "prop-types";

function CustomInput({ innerRef, field, type, icon, ...props }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="custom-input-container">
      {type === "password" && (
        <i
          className={`fa ${showPass ? "fa-eye-slash" : "fa-eye"} pass-icon`}
          onClick={() => setShowPass(!showPass)}
        ></i>
      )}
      <input
        ref={innerRef ? innerRef : null}
        type={type === "password" ? (showPass ? "text" : "password") : type}
        autoComplete="off"
        {...field}
        {...props}
      />
      <i className={`fa fa-${icon} main-icon`}></i>
    </div>
  );
}

CustomInput.propTypes = {
  innerRef: PropTypes.object,
  field: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default CustomInput;
