import React from "react";
import { requireAuth } from "./../util/auth";

function CommunityPage(props) {
  return (
    <>
      community page
    </>
  );
}

export default requireAuth(CommunityPage);
