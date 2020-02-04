export const incrementalId = (n = 0) => () => n++;

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