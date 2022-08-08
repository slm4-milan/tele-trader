import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

export default function PairsTable({
    keys,
    tableData,
    allowClick
}) {
    const navigate = useNavigate();

    return (
        <>
            <TableContainer sx={{mb: 2}} component={Paper}>
                <Table sx={{minWidth: 150}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {keys.map((key, index) => <TableCell key={key.displayName} align={index === 0 ? 'left' : 'right'}>{key.displayName}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableData.map((row) => {
                                return  <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        onClick={() => {
                                            if (allowClick) navigate(`/details/${row.name}`);
                                        }}
                                    >
                                    {
                                        keys.map((key, index) => {
                                            return <TableCell align={index === 0 ? 'left' : 'right'} key={key.name} component="th" scope="row">
                                                {row[key.name] || '/'}
                                            </TableCell>
                                        })
                                    }
                                    </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
