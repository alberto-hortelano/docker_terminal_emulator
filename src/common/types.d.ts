
type DataTypes = 'processData' | 'pid' | 'error' | 'connected';

// interface TypedData {
// 	type: DataTypes,
// 	data: string
// }

interface Connection {
	send: (data: string) => void;
	close: () => void;
}

interface KeyData {
	altKey: boolean;
	ctrlKey: boolean;
	shiftKey: boolean;
	key: string;
	keyCode: number;
	text: string;
}
