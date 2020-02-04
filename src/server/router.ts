import { Router } from 'express';
import { getPtys, getPty } from './wss';
import { killChildProcesses } from './exit';
import { Logger } from "../common/Logger";
import { paths } from "../common/paths";

const console = new Logger(__filename, true);

export const router = Router();

router.get(paths.ptys, (req, res) => {
	const ptys = Object.keys(getPtys());
	console.warn("log: ptys", ptys);
	res.send(ptys);
});

router.delete(`${paths.ptys}/:id`, async (req, res) => {
	console.log("log: ptys:id");
	const id = parseInt(req.params.id);
	try {
		const killResponse = await killChildProcesses(id);
		const pty = getPty(id);
		pty.kill();
		console.log("log:  killResponse", killResponse);
		res.status(200).send(killResponse);
	} catch (error) {
		console.error("log: error", error);
		res.status(500).send(error);
	}
});
