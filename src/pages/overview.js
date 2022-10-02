import React from "react";
import Meta from "./../components/Meta";
import Paperbase from "./../components/dashboard/paperbase/Paperbase";
import { requireAuth } from "./../util/auth";

function OverviewPage(props) {
  console.log(props)
  
    return (
    <>
      <Meta title="Overview" />
    <Paperbase content={props.content}/>
    </>
  );
}

export default requireAuth(OverviewPage);
