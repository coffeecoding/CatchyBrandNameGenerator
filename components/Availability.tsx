import React from "react";

const Availability = ({ value }) => {
  return (
    <div>
      <div className="row">
        {value === true ? (
          <div className="circleGreen" />
        ) : (
          <div className="circleRed" />
        )}
        {value === true ? "Available" : "Taken"}
      </div>
      <style jsx>
        {`
          .row {
            display: flex;
            align-items: center;
          }

          .circleRed {
            background: gray;
            border-radius: 50%;
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }

          .circleGreen {
            background: greenyellow;
            border-radius: 50%;
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default Availability;
