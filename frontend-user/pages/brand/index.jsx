import React,{memo} from "react";
import { Button } from 'antd';

function Brand(){
    return(<div className="container"><Button type="primary">Primary Button</Button></div>)
}

export default memo(Brand);