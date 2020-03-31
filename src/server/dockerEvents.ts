import { spawn } from "child_process";
import { addService } from "./wsServer";
import { encodeData } from "../common/lib";

const dockerEvents = spawn("docker-compose events", ["--json"], { shell: true, cwd: '/home/alberto/DKR/projects/game' });

addService('dockerEvents', (ws) => {
	dockerEvents.stdout.on("data", data => {
		try {
			const event: DockerEvent = JSON.parse(data);
			console.log("---- stdout: ", event.action, event.service);
			ws.send(encodeData('dockerEvent', JSON.stringify({
				action: event.action,
				service: event.service,
			})));
		} catch (error) {
			console.error("log: error", error);
			ws.send(encodeData('error', `${error}`));
		}
	});
});

dockerEvents.stderr.on("data", data => {
	console.error(`stderr: ${data}`);
});

dockerEvents.on('error', (error) => {
	console.log(`error: ${error.message}`);
});

dockerEvents.on("close", code => {
	console.log(`child process exited with code ${code}`);
});
