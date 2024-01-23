import React, {memo} from "react";
import TopHeader from "./top-header";
import Navigation from "./navigation";

function Header(){
    return(<div className="sticky top-0 z-40 bg-white shadow">
        <TopHeader/>    
        <Navigation/>
    </div>)
}
export default memo(Header);
