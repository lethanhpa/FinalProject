import React, {memo} from "react";
import HomePage from "./home/index";
function Home() {
  return (
   <div className="container">
   <HomePage />
   </div>
  );
};

export default memo(Home);
