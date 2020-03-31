export const incrementalId = (n = 0) => () => n++;

export const setDeepProperty = (obj: object, path: (string | number)[], value: any) => {
	const propName = path.shift();
	if (path.length === 0) {
		obj[propName] = value;
	} else {
		if (!obj.hasOwnProperty(propName)) {
			obj[propName] = typeof path[0] === 'number' ? [] : {};
		}
		setDeepProperty(obj[propName], path, value);
	}
}

export const encodeData = (type: DataTypes, data: string) => JSON.stringify([type, data]);

export const decodeData = (message: string): [DataTypes, string] => {
	try {
		const [type, data] = JSON.parse(message);
		return [type, data];
	} catch (error) {
		console.error("log: decodeData -> error", error);
	}
}

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
