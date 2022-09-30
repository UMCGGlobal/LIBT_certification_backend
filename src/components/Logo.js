import React from 'react';

function Logo(props) {
  return (
    <img
      alt="Logo"
      src="/static/LIBT_logo.png"
      {...props}
    />
  );
}

export default Logo;
