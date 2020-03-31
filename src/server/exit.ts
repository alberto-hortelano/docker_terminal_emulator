
import { spawn, IPty } from "node-pty";
import { exec } from "child_process";
import { getPtys } from "./ptys";
import { Logger } from "../common/Logger";
import { server } from "..";

const console = new Logger(__filename, true);

/**
 * For some reason if I use the first created process id as an argument for pkill
 * It fails, so I create a dumb process just to be the first one and not to be used
 * 
 *            ¯\_(ツ)_/¯
 */
let dumbProcess = spawn('sh', [], {
	name: 'xterm-256color',
	cols: 80,
	rows: 30,
	useConpty: true,
	cwd: './',
	env: process.env,
});

interface KillResponse {
	fail: [number, any][],
	success: number[]
}
/**
 * Kill child processes of a given session Id
 * @param childId 
 */
export const killChildProcesses = async (childId: number) => new Promise<KillResponse>((resolve, reject) => {
	console.log(`pgrep -s ${childId};`);
	exec(`pgrep -s ${childId};`, async (error, stdout) => {
		if (error) {
			reject(error);
		} else {
			console.log("log: killChildProcesses -> stdout", stdout);
			const ids = stdout.split('\n')
				.map(id => parseInt(id))
				.filter(id => (!isNaN(id) && childId !== id))
				.sort((a, b) => b - a);

			const response: KillResponse = {
				fail: [],
				success: []
			};

			for (let index = 0; index < ids.length; index++) {
				const id = ids[index];
				try {
					await new Promise<number>((res, rej) => {
						exec(`kill -9 ${id};`, (error) => {
							console.log(`kill -9 ${id};`, error);
							if (error) {
								response.fail.push([id, error]);
								rej(error);
							} else {
								response.success.push(id);
								res(id)
							}
						});
					});
				} catch (error) {
					console.warn("log: killChildProcesses", `kill -9 ${id};`, error);
				}
			}
			resolve(response);
		}
	});
});

const killPty = async (pty: IPty) => new Promise((resolve, reject) => {
	pty.onExit(() => {
		console.warn("log: killPty -> pty", pty.pid);
		resolve()
	});
	pty.kill();
});

let cleanChildProcesses = async (event: string, exitStatus?: number | Error) => {
	// ps -o pid,ppid,pgid,sid,stat,args
	console.log("log: cleanChildProcesses -> event,    exitStatus", event, exitStatus);
	// Ensure process is killed
	setTimeout(() => {
		process.kill(process.pid);
	}, 10000);
	const ptys = getPtys();
	const childIds = Object.keys(ptys);
	dumbProcess.kill();
	console.log("log: cleanChildProcesses -> dumbProcess", dumbProcess.pid);

	for (let index = 0; index < childIds.length; index++) {
		const childId = parseInt(childIds[index]);
		try {
			await killChildProcesses(childId);
			await killPty(ptys[childId]);
			console.log("log: cleanChildProcesses  -> killChildProcesses childId", childId);
		} catch (error) {
			console.warn("cleanChildProcesses", childId, error);
		}
	}
	cleanChildProcesses = async () => { }; // Only called once
	process.kill(process.pid);
};

// catches when app is closing
process.on('exit', (exitCode) => { cleanChildProcesses('exit', exitCode) });

// catches ctrl+c event
process.on('SIGINT', (signal) => { cleanChildProcesses(signal) });

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', (signal) => { cleanChildProcesses(signal) });
process.on('SIGUSR2', (signal) => { cleanChildProcesses(signal) });

// catches uncaught exceptions
process.on('uncaughtException', (error) => { cleanChildProcesses('uncaughtException', error) });
