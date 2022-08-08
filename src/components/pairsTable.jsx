import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import blue from '@mui/material/colors/blue';

export default function PairsTable({
  keys,
  tableData,
  allowClick
}) {
  const [data, setData] = useState(tableData);
  const navigate = useNavigate();

  return (
      <>
        {
          !data.length ?
              <Alert severity="info">The list is empty</Alert> :
              <TableContainer sx={{mb: 2}} component={Paper}>
                <Table sx={{minWidth: 150}} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {keys.map(
                          (key, index) => <TableCell
                              key={key.displayName}
                              align={index === 0
                                  ? 'left'
                                  : 'right'}>{key.displayName}</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      data.map((row) => {
                        return <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onClick={() => {
                              if (allowClick) {
                                navigate(
                                    `/details/${row.name}`);
                              }
                            }}
                            hover
                        >
                          {
                            keys.map((key, index) => {
                              return <TableCell style={{
                                color: index === 0 ? blue[500] : 'inherit'
                              }} align={index === 0 ? 'left' : 'right'}
                                                key={key.name} component="th"
                                                scope="row">
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
        }
      </>
  )
}
