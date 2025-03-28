import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";


const override = {
  display: "block",
  margin: "100px auto",
  textAlign : "center",
};

const Spinner = ({ loading, progressStage }) => {
  return (
    <div style={{textAlign : "center"}}>
      <ClipLoader
        color="#4338ca"
        loading={loading}
        cssOverride={override}        
        size={150}
      />
      {loading && (
        <div>
          <p>{progressStage}</p>
        </div>
      )}
    </div>
  );
};

export default Spinner;
