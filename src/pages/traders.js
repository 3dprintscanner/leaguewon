import React from "react";
import { requireAuth } from "./../util/auth";
import Paper from '@material-ui/core/Paper'

function TradersPage(props) {
  return (
    <>
        <Paper>
            pepo traders
        </Paper>        
    </>
  );
}

export default requireAuth(TradersPage);
