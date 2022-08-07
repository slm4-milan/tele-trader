import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name: string,
    last: number,
    change: number,
    changePercent: number,
    high: number,
    low: number,
) {
    return {name, last, change, changePercent, high, low};
}

const rows = [
    createData('BTCUSD', 32866, 1492, 0.04, 33639, 30968),
    createData('ETHUSD', 32866, 1492, 0.04, 33639, 30968),
    createData('LTCUSD', 32866, 1492, 0.04, 33639, 30968),
    createData('LTCBTC', 32866, 1492, 0.04, 33639, 30968),
    createData('ETHBTC', 32866, 1492, 0.04, 33639, 30968),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 150}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Last</TableCell>
                        <TableCell align="right">Change</TableCell>
                        <TableCell align="right">Change Percent</TableCell>
                        <TableCell align="right">High</TableCell>
                        <TableCell align="right">Low</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell className="trading-pairs" component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.last}</TableCell>
                            <TableCell align="right">{row.change}</TableCell>
                            <TableCell align="right">{`${row.changePercent}%`}</TableCell>
                            <TableCell align="right">{row.high}</TableCell>
                            <TableCell align="right">{row.low}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
