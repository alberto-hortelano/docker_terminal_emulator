import { Router, json, Response } from 'express';
import { getPtys, getPty } from './wss';
import { killChildProcesses } from './exit';
import { Logger } from "../common/Logger";
import { paths } from "../common/paths";
import { createProject, getProject, getProjects, editProject } from './API/project';

const console = new Logger(__filename, true);

export const router = Router();

const handleError = (res: Response, error) => {
	console.error("log: error", error);
	if (!error.statusCode) error.statusCode = 500;
	res.status(error.statusCode).send(error.message);
}

router.use(json());

router.get(paths.ptys, (req, res) => {
	const ptys = Object.keys(getPtys());
	console.warn("log: ptys", ptys);
	if (ptys.length) {
		res.status(200).send(ptys);
	} else {
		res.status(404).send();
	}
});

router.delete(`${paths.ptys}/:id`, async (req, res) => {
	console.log("log: ptys:id");
	const id = parseInt(req.params.id);
	try {
		const killResponse = await killChildProcesses(id);
		const pty = getPty(id);
		pty.kill();
		console.log("log: killResponse", killResponse);
		res.status(200).send(killResponse);
	} catch (error) {
		handleError(res, error);
	}
});

/* Projects */

router.post(paths.projects, async (req, res) => {
	try {
		const project = await createProject(req.body);
		res.status(201).location(`${paths.projects}/${project.name}`).send(project);
	} catch (error) {
		handleError(res, error);
	}
});
router.put(`${paths.projects}/:name`, async (req, res, next) => {
	try {
		let { project, updatedFields } = await editProject(req.body);
		if (!project) { // Not found
			res.status(404).send();
		} else {
			if (!updatedFields.length) { // Not modified
				res.status(204).send();
			} else { // Modified OK
				res.status(200).send();
			}
		}
	} catch (error) {
		handleError(res, error);
	}
});
router.get(paths.projects, async (req, res) => {
	try {
		const projects = await getProjects();
		console.log("log: projects", projects);
		if (!projects.length) {
			res.status(404).send();
		} else {
			res.status(200).send(projects.map(project => project.serializableProject));
		}
	} catch (error) {
		handleError(res, error);
	}
});
router.get(`${paths.projects}/:name`, async (req, res) => {
	try {
		const project = await getProject(req.params.name);
		if (!project) {
			res.status(404).send();
		} else {
			res.status(200).send(project.serializableProject);
		}
	} catch (error) {
		handleError(res, error);
	}
});