import { server } from "./server";
import { config } from './config';

server.listen(config.PORT, () => {
  console.log(`[Server]: Server running at - https://localhost:${config.PORT}`);
});
