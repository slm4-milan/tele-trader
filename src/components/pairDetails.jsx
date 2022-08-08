import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";

function createData(
    symbol,
    last,
    high,
    low,
) {
    return {symbol, last, high, low};
}

const rows = [
    createData('BTCUSD', 32866, 1492, 0.04),
];

export default function PairDetails() {
    return (
        <React.Fragment>
            <TableContainer sx={{mb: 2}} component={Paper}>
                <Table sx={{minWidth: 150}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell align="right">Last price</TableCell>
                            <TableCell align="right">High</TableCell>
                            <TableCell align="right">Low</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.symbol}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell className="trading-pairs" component="th" scope="row">
                                    {row.symbol}
                                </TableCell>
                                <TableCell align="right">{row.last}</TableCell>
                                <TableCell align="right">{row.high}</TableCell>
                                <TableCell align="right">{row.low}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button className="btn"
                    color="inherit">Add to favorites</Button>
            <Button className="btn-red"
                    color="inherit">Remove from favorites</Button>
        </React.Fragment>
    );
}
