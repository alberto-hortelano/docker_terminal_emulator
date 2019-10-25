// import { projects } from "./api/projects";
// import { PathLike } from "fs";

// export const router = {
// 	'ws': 
// }

// type Msg = {
// 	path: PathLike,
// 	args?: []
// }
// const endPoints = [projects];
// const api = endPoints.reduce((api, endPoint) => {
// 	api[endPoint.path] = endPoint.actions
// }, {});

// export const route = async (data: string, send: (response: any) => void) => {
// 	try {
// 		const msg: Msg = JSON.parse(data);
// 		const { path, args } = msg;
// 		if (api[path]) {

// 		} else {

// 		}
// 		switch (path) {
// 			case 'projects':
// 				const response = await projects(args);
// 				if (response !== void 0) {
// 					send(response);
// 				}
// 			default:
// 				break;
// 		}
// 	} catch (error) {
// 		console.log("log: route -> error", error);
// 		return;
// 	}
// }
