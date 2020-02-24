export const incrementalId = (n = 0) => () => n++;

// Mixins
// type CT<T = {}> = new(...args: any[]) => T;
// // export function createMixinClass <T extends CT, B extends CT, C extends CT, D extends CT, E extends CT>(mainClass: T, ...baseClasses: [B, C, D, E])
// export function createMixinClass<T extends CT, B extends CT>(mainClass: T, ...baseClasses: [B]) {
// 	const newClass = class extends mainClass {
// 		constructor(...args: any[]) {
// 			super(...args);
// 		}
// 	};
// 	baseClasses.forEach(baseCtor => {
// 		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
// 			Object.defineProperty(newClass.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
// 		});
// 	});
// 	return newClass;
// }

// WS Message parsing

export const encodeData = (type: DataTypes, data: string) => JSON.stringify([type, data]);

export const decodeData = (message: string): [DataTypes, string] => {
	try {
		const [type, data] = JSON.parse(message);
		return [type, data];
	} catch (error) {
		console.error("log: decodeData -> error", error);
	}
}

// Terminals
export const terminalConfig = {
	cols: 66,
	rows: 24
}
