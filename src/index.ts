import { createServer } from "http";
import { app } from "./server/app";
import { initWebSocket } from "./server/wss";
import { paths } from "./common/paths";
import { initDB } from "./server/database";
import { Logger } from "./common/Logger";
import './server/exit';

const console = new Logger();

const PORT = parseInt(process.env.PORT) || 80;
const server = createServer(app);

console.warn('======== SERVER START ========');

server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});

initWebSocket(server, paths.ws);

initDB();
