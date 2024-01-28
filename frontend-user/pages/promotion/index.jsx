import React, { memo } from "react";
import SignUp from "../sign-up";
function Promotion() {
  return (
    <div className="container">
      <SignUp />
    </div>
  );
}

export default memo(Promotion);
