import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function mapData(rowData){
    if(!rowData){
        return []
    }
    const result = rowData.map((row) => ({id: row.id, blockNumber: row['block_number'], time: new Date(row.timestamp * 1000).toISOString(), mint: row['transaction_data'].mints.length > 0, burn: row['transaction_data'].burns.length > 0, swap: row['transaction_data'].swaps.length > 0}))
    return result;
}

export default function TradeTable(props) {
  const classes = useStyles();

  const { data } = props;

  const tableData = mapData(data);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Block number</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Mint</TableCell>
            <TableCell align="right">Burn</TableCell>
            <TableCell align="right">Swap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.blockNumber}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.mint ? <DoneIcon/> : undefined }</TableCell>
              <TableCell align="right">{row.burn ? <DoneIcon/> : undefined }</TableCell>
              <TableCell align="right">{row.swap ? <DoneIcon/> : undefined }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}