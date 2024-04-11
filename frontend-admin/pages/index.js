import React, { memo, useState } from "react";
import HomePage from "./home";
import SigIn from "../pages/sign-in";

function Home() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {!isLogin ? (
        <SigIn setIsLogin={setIsLogin} />
      ) : (
        <HomePage />
      )}
    </>
  );
};

export default memo(Home);
