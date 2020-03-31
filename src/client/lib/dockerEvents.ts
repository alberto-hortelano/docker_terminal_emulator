import { WSConnection } from "./WSConnection";

const triggeredEvents = {};

export const listenDockerEvents = () => {
	const wsConnection = new WSConnection('dockerEvents');
	wsConnection.on('dockerEvent', (data) => {
		console.log("log: listenDockerEvents -> data", data);
		try {
			const { service, action }: DockerEvent = JSON.parse(data);
			triggeredEvents[service] = {
				...triggeredEvents[service],
				[action]: true
			}
		} catch (error) {
			console.error("log: listenDockerEvents -> error", error);
		}
	});
}
