import React from "react";
import Meta from "./../components/Meta";
import Paperbase from "./../components/dashboard/paperbase/Paperbase";
import { requireAuth } from "./../util/auth";

function ScoreboardPage(props) {
    return (
        <>
            <Meta title="Scoreboard" />
            <Paperbase content={props.content} />
        </>
    );
}

export default requireAuth(OverviewPage);
