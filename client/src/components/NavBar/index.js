import React from 'react';


const NavBar = () => {


  return (
    <div>
        <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
                <button className="btn btn-outline-success" type="button" ><a href="/asana">Asana</a></button>
                <button className="btn btn-outline-success" type="button"><a href="/">Main</a></button>
                <button className="btn btn-outline-success" type="button"><a href="/signout">Exit</a></button>
            </form>
        </nav>
      
    </div>
  );
};

export default NavBar;