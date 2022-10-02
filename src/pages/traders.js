import React from "react";
import { requireAuth } from "./../util/auth";
import Paperbase from "./../components/dashboard/paperbase/Paperbase";
import Meta from "./../components/Meta";

function TradersPage(props) {
    return (
        <>
            <Meta title="Traders" />
            <Paperbase content={props.content} />
        </>
    );
}

export default requireAuth(TradersPage);
