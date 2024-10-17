import http from 'http';

import { app } from './app.ts';
import { config } from './config.ts';
import { createDbConnection } from './pgsql/pgConnection.ts';

app.set('port', config.port);

const server = http.createServer(app);

server.listen(config.port);
server.once('listening', createDbConnection);

server.on('listening', onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr && addr.port);
  console.log('Listening on ' + bind);
}
