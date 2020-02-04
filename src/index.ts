import { createServer } from "http";
import { app } from "./server/app";
import { initWebSocket } from "./server/wss";
import { paths } from "./common/paths";
import { Project } from "./common/entities/Project";
import { getDB } from "./server/dataBase";
import { Logger } from "./common/Logger";
import './server/exit';

const console = new Logger();

const PORT = parseInt(process.env.PORT) || 80;
const server = createServer(app);

console.warn('======== SERVER START ========      ');

server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});

initWebSocket(server, paths.ws);

const p = new Project('namee', 'pathh', 'descriptionn333');
console.log("log: p", p);

const dbConnect = async () => {
	const dbConnection = await getDB('mongodb://mongo:27017/terminal_emulator');
	console.log("log: dbConnect -> dbConnection", dbConnection);
	// dbConnection.collection('projects').update()
}
dbConnect();
