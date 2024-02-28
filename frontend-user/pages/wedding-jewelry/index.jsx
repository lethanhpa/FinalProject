import React, { memo } from "react";
import Marry from "./marry";
import Memory from "./memory";
import Propose from "./propose";
function WeddingJewelry() {
  return (
    <>
      <div className="container">
        <Propose />
        <Marry />
        <Memory />
      </div>
    </>
  );
}
export default memo(WeddingJewelry);
