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
import {memo, useContext, useEffect, useState} from 'react';
import {WebSocketContext} from '../context/webSocketContext';
import {formatCurrency} from '../services/api';
import blue from '@mui/material/colors/blue';
import currencyFormatter from 'currency-formatter';

let wsChannels = [];

function PairsTable({
  keys,
  tableData,
  allowClick,
  autoUpdate = false
}) {
  const [data, setData] = useState(tableData);
  const navigate = useNavigate();
  const {wss, isWSActive} = useContext(WebSocketContext);

  useEffect(() => {
    if (autoUpdate && isWSActive) {
      tableData.forEach((pair) => {
        wss.send(JSON.stringify({
          "event": "subscribe",
          "channel": 'ticker',
          symbol: `t${pair.name.toUpperCase()}`
        }));
      });
    }
  }, [autoUpdate, tableData, isWSActive, wss])

  useEffect(() => {
    if (wss) {
      wss.onmessage = (msg) => {
        if (msg) {
          const message = JSON.parse(msg.data);
          if (message.event === 'subscribed') {
            wsChannels = [
              ...wsChannels,
              {
                chanId: message.chanId,
                name: message.pair
              }
            ];

            setData((data) => {
              const copy = [...data];
              const pairIndex = copy.findIndex(
                  (pair) => pair.name === message.pair)
              if (pairIndex !== -1) {
                copy[pairIndex].chanId = message.chanId;
              }

              return copy;
            })
          }

          if (message.event === 'error') {
            console.error(`WebSocket error: ${JSON.stringify(msg.data)}`);
          }

          if (message instanceof Array && message[1] instanceof Array) {
            setData((data) => {
              const copy = [...data];
              const pairIndex = copy.findIndex(
                  (pair) => pair.chanId === message[0]);

              if (pairIndex !== -1) {
                const change_percent = currencyFormatter.format(
                    message[1][5] * 100, {decimal: '.'});
                copy[pairIndex] = {
                  ...copy[pairIndex],
                  last_price: formatCurrency(message[1][6]),
                  high: formatCurrency(message[1][8]),
                  low: formatCurrency(message[1][9]),
                  change: formatCurrency(message[1][4]),
                  change_percent: change_percent > 0 ? `+${change_percent}%`
                      : `${change_percent}%`
                }
              }

              return copy;
            })
          }
        }
      };

      return () => {
        if (wsChannels.length) {
          wsChannels.forEach((channel) => {
            wss.send(JSON.stringify({
              "event": "unsubscribe",
              chanId: channel.chanId
            }));
          });

          wsChannels = [];
        }
      }
    }
  }, [tableData, wss])

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

export default memo(PairsTable);