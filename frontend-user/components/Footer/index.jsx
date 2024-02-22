import React, { memo } from "react";
import TopFooter from "./top-footer";
import ListFooter from "./list-footer";

function Footer() {
  return (
    <footer className="border-t border-primry">
      <TopFooter/>
      <ListFooter/>
    </footer>
  );
}
export default memo(Footer);
