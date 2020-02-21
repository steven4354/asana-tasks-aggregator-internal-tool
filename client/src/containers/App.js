import React from 'react';
import NavBar from "./../components/NavBar"

export default ({ children }) => {
  return (
    <div>
      <NavBar/>
      <div className='container jumbotron'>
        {children}
      </div>
      
    </div>
  )
};
  