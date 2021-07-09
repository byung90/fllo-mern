import React from "react";

const PropertyContainer = () => {
  return (
    <div className="d-flex flex-wrap">
      <div className="card col-3">
        <a href=""><img src="..." className="card-img-top" alt="..." /></a>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <a href=""><p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p></a>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        </div>

      </div>
    </div >
  );
};

export default PropertyContainer;