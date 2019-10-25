import { createServer } from "http";
import { app } from "./server/app";
import { initWebSocket } from "./server/ws";
import { paths } from "./consts";

const PORT = parseInt(process.env.PORT) || 80;
const server = createServer(app);

server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});

initWebSocket(server, paths.ws);
