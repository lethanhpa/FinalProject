import React, { memo } from "react";
import SignIn from "../sign-in";

function Brand() {
  return (
    <div className="container">
      <SignIn />
    </div>
  );
}

export default memo(Brand);
