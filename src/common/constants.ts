// Websocket services
const wsServices = <const>['pty', 'dockerEvents'];

export type WSServices = typeof wsServices[number];

// Terminals config, common for server pty and client Xterm
export const terminalConfig = {
	cols: 66,
	rows: 24
}
