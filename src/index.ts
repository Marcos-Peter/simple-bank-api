import { server } from "./server";
import { config } from './config';

server.listen(config.port, () => {
  console.log(`[Server]: Server running at - https://localhost:${config.port}`);
});
