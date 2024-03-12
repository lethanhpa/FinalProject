import React, { memo } from "react";
import { FloatButton } from "antd";

function Account() {
  return (
    <>
      <div className="container my-[50px] flex justify-center">Account nè!</div>{" "}
      <FloatButton.BackTop />
    </>
  );
}

export default memo(Account);
